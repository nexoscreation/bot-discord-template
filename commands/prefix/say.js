/**
 * Command: say
 * Description: Makes the bot repeat a message.
 */
const { logError } = require('../../utils/logger')

module.exports = {
  name: 'say',
  description: 'Make the bot repeat a message.',

  async execute(message, args) {
    // Check if the user has the 'Manage Messages' permission
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('❌ You do not have permission to use this command.');
    }

    // Ensure that the user provided a message to repeat
    const sayMessage = args.join(' ');
    if (!sayMessage) {
      return message.reply('❌ Please provide a message for me to repeat.');
    }

    try {
      // Delete the original command message
      await message.delete();

      // Send the repeated message
      await message.channel.send(sayMessage);
    } catch (error) {
        logError(`❌ Error executing say command: ${error}`);
      message.channel.send('An error occurred while trying to repeat your message.');
    }
  },
};
