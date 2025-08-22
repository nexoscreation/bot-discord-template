const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const { logInfo, logWarn, logError } = require("./utils/logger");

// Load environment variables
dotenv.config();

// Initialize Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Access guild-related events
    GatewayIntentBits.GuildVoiceStates, // Monitor voice state changes
    GatewayIntentBits.GuildMembers, // Privileged: Requires "Server Members Intent"
    GatewayIntentBits.GuildMessages, // Access messages in guild channels
    GatewayIntentBits.MessageContent, // Privileged: Access message content
  ],
});

// Collection to store bot commands
client.commands = new Collection();

/**
 * Load Prefix Commands
 * Commands stored in the `prefix/` directory
 */
const PrefixCommandFiles = fs
  .readdirSync("./commands/prefix")
  .filter((file) => file.endsWith(".js"));
for (const file of PrefixCommandFiles) {
  const command = require(`./commands/prefix/${file}`);
  client.commands.set(command.name, command);
}

/**
 * Load Context Menu Commands
 * Commands stored in the `context/` directory
 */
const contextCommandsPath = path.join(__dirname, 'commands/context');
if (fs.existsSync(contextCommandsPath)) {
  const contextCommandFiles = fs.readdirSync(contextCommandsPath).filter(file => file.endsWith('.js'));
  for (const file of contextCommandFiles) {
    const command = require(path.join(contextCommandsPath, file));
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      logWarn(`The context command at ${file} is missing "data" or "execute".`);
    }
  }
}

/**
 * Load Slash Commands
 * Commands categorized into folders under `slash/`
 */
const commandsPath = path.join(__dirname, "commands/slash");
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  const commandFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      logWarn(`The command at ${filePath} is missing "data" or "execute".`);
    }
  }
}

/**
 * Load Event Listeners
 * Events stored in the `events/` directory
 */
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  // Dynamically register events
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

/**
 * Error Handling
 * Logs errors gracefully to prevent bot crashes
 */

// Error handling for client events
client.on("error", (error) => {
  logError(`❌ Discord.js client encountered an error: ${error}`);
});

client.on("shardError", (error) => {
  logError(`❌ WebSocket encountered an error: ${error}`);
});

// Listen for rate limit warnings
client.on("rateLimit", (info) => {
  logWarn(`⚠️ Rate limit hit: ${info}`);
});

// Handle missing permissions or configuration issues
client.on("guildCreate", (guild) => {
  const botMember = guild.members.me;
  const missingPermissions = botMember.permissions.missing([
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "EMBED_LINKS",
  ]);

  if (missingPermissions.length > 0) {
    logError(
      `⚠️ Missing permissions in guild "${guild.name}": ${missingPermissions}`
    );
  }
});

// General uncaught errors
process.on("uncaughtException", (error) => {
  logError(`❌ Uncaught exception: ${error}`);
  // Optionally exit the process if critical
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logError(`❌ Unhandled promise rejection at: ${promise}, reason: ${reason}`);
});

/**
 * Message Listener for Prefix Commands
 */
// event/messageCreate.js

/**
 * Bot Login
 * Authenticates the bot using the token from `.env`
 */
client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then(() => logInfo("✅ Bot started successfully!"))
  .catch(console.error); // Log authentication errors
