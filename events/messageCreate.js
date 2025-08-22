/**
 * Event: messageCreate
 * Triggered whenever a new message is created.
 */

const { logError } = require("../utils/logger");
const PREFIX = process.env.DISCORD_BOT_PREFIX;

module.exports = {
  name: "messageCreate",
  execute(message) {
    // Ignore bot messages or messages without the bot prefix
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Fetch the command from the bot's command collection
    const command = message.client.commands.get(commandName);

    if (!command) return;

    // Execute the command
    try {
      command.execute(message, args);
    } catch (error) {
      logError(`❌ Error executing ${commandName} command: ${error}`);
      message.reply("There was an error while executing this command.");
    }
  },
};
