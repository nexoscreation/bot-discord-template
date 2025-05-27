const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const { logInfo, logWarn, logError } = require('../../utils/logger')

const commands = [];

/**
 * Loads all the command data from the commands directory.
 */
function loadCommands() {
  const foldersPath = path.join(__dirname, './../slash');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Add command data to the array
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
      } else {
          logWarn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
}

/**
 * Deploy the loaded commands to the guild.
 */
async function deployCommands() {
    if (!process.env.DISCORD_BOT_CLIENT_ID || !process.env.DISCORD_GUILD_ID || !process.env.DISCORD_BOT_TOKEN) {
        logError('Missing required environment variables.Check your.env file.')
    process.exit(1);
  }

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

    try {
        logInfo(`Started refreshing ${commands.length} application (/) commands.`);

    // Refreshing the commands in the guild
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORD_BOT_CLIENT_ID, process.env.DISCORD_GUILD_ID),
      { body: commands }
    );

        logInfo(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        logError(`Error occurred while deploying commands: ${error}`);
  }
}

// Load commands and deploy them
loadCommands();
deployCommands();
