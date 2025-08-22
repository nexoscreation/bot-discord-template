const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { logError } = require("../../../utils/logger");
/**
 * Command: timeout
 * Description: Temporarily mutes a member for a specific duration.
 */
module.exports = {
  name: "timeout",
  description: "RTemporarily mutes a member for a specific duration.",
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Temporarily mutes a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Duration in minutes")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the timeout")
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const target = interaction.options.getUser("target");
      const duration = interaction.options.getInteger("duration") || 10; // Default to 10 minutes
      const reason =
        interaction.options.getString("reason") || "No reason provided.";
      const member = interaction.guild.members.cache.get(target.id);

      if (!member) {
        return await interaction.reply({
          content: `❌ Could not find the member: ${target.tag}`,
          ephemeral: true,
        });
      }

      const timeoutMs = duration * 60 * 1000; // Convert minutes to milliseconds
      await member.timeout(timeoutMs, reason);
      await interaction.reply(
        `✅ ${target.tag} has been timed out for ${duration} minutes. Reason: ${reason}`
      );
    } catch (error) {
      logError(`❌ Error executing timeout command: ${error}`);
      await interaction.reply({
        content: "An error occurred while trying to timeout the member.",
        ephemeral: true,
      });
    }
  },
};
