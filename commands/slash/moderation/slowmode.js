const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { logError } = require("../../../utils/logger");
/**
 * Command: slowmode
 * Description: Sets a slowmode for a channel.
 */
module.exports = {
  name: "slowmode",
  description: "Sets a slowmode for a channel.",
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Sets a slowmode for the channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addIntegerOption(
      (option) =>
        option
          .setName("duration")
          .setDescription("Duration of slowmode in seconds")
          .setRequired(true)
          .setMinValue(0)
          .setMaxValue(21600) // 6 hours (max allowed slowmode duration)
    ),

  async execute(interaction) {
    try {
      const duration = interaction.options.getInteger("duration");

      // Apply slowmode to the channel
      await interaction.channel.setRateLimitPerUser(duration);

      await interaction.reply(
        `✅ Successfully set slowmode to ${duration} seconds.`
      );
    } catch (error) {
      logError(`❌ Error executing slowmode command: ${error}`);
      await interaction.reply({
        content: "An error occurred while trying to set slowmode.",
        ephemeral: true,
      });
    }
  },
};
