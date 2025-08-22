const { SlashCommandBuilder } = require("discord.js");
const { logError } = require("../../../utils/logger");
/**
 * Command: roll
 * Description: Rolls a random number between 1 and 100.
 */
module.exports = {
  name: "roll",
  description: "Rolls a random number between 1 and 100.",
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a random number between 1 and 100"),

  async execute(interaction) {
    try {
      const number = Math.floor(Math.random() * 100) + 1;
      await interaction.reply(`🎲 You rolled: **${number}**`);
    } catch (error) {
      logError(`❌ Error executing roll command: ${error}`);
      await interaction.reply({
        content: "An error occurred while rolling the number.",
        ephemeral: true,
      });
    }
  },
};
