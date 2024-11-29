const { SlashCommandBuilder } = require('discord.js');

/**
 * Command: roll
 * Description: Rolls a random number between 1 and 100.
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls a random number between 1 and 100'),

  async execute(interaction) {
    try {
      const number = Math.floor(Math.random() * 100) + 1;
      await interaction.reply(`🎲 You rolled: **${number}**`);
    } catch (error) {
      console.error('❌ Error executing roll command:', error);
      await interaction.reply({
        content: 'An error occurred while rolling the number.',
        ephemeral: true,
      });
    }
  },
};
