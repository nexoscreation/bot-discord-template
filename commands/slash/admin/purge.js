const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * Command: purge
 * Description: Purges a specified number of messages from a channel.
 */
const { logError } = require('../../../utils/logger')

module.exports = {
  name: 'purge',
  description: 'Purges a specified number of messages from a channel.',
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purges a specified number of messages from the channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to purge')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),

  async execute(interaction) {
    try {
      const amount = interaction.options.getInteger('amount');

      if (amount < 1 || amount > 100) {
        return await interaction.reply({
          content: '❌ Please specify a number between 1 and 100.',
          ephemeral: true,
        });
      }

      // Fetch and delete messages
      const messages = await interaction.channel.messages.fetch({ limit: amount });
      const filteredMessages = messages.filter(msg => {
        const messageAge = Date.now() - msg.createdTimestamp; // Calculate message age
        return messageAge < 1209600000; // 14 days in milliseconds (1209600000ms)
      });

      // If no messages are deletable, notify the user
      if (filteredMessages.size === 0) {
        return await interaction.reply({
          content: '❌ No messages are deletable, as all messages are older than 14 days.',
          ephemeral: true,
        });
      }
      
      // Delete the filtered messages
      await interaction.channel.bulkDelete(filteredMessages);

      await interaction.reply(`✅ Successfully deleted ${filteredMessages} message(s).`);
    } catch (error) {
        logError(`❌ Error executing purge command: ${error}`);
      await interaction.reply({
        content: 'An error occurred while trying to purge the messages.',
        ephemeral: true,
      });
    }
  },
};
