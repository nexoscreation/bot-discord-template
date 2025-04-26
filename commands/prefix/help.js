/**
 * Command: help
 * Description: Lists all available commands.
 */
module.exports = {
  name: 'help', // Command name
  description: 'Lists all available commands.',

  execute(message, args) {
    try {
      // Collect commands with valid name and description properties
      const commands = message.client.commands
        .filter(cmd => cmd.name && cmd.description) // Ensure both properties exist
        .map(cmd => `\`${cmd.name}\`: ${cmd.description}`); // Map to a string format

      if (!commands.length) {
        // Handle case where no commands are available
        return message.reply('No commands are currently available.');
      }

      const helpMessage = `📜 **Available Commands**:\n\n${commands.join('\n')}`;
      message.reply(helpMessage);
    } catch (error) {
      console.error('❌ Error executing help command:', error);
      message.reply('An error occurred while fetching the help list.');
    }
  },
};
