const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { logError } = require("../../../utils/logger");
/**
 * Command: unban
 * Description: Unbans a previously banned member from the server.
 */
module.exports = {
  name: "unban",
  description: "Unbans a previously banned member from the server.",
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans a member from the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("user_id")
        .setDescription("The ID of the member to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the unban")
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const userId = interaction.options.getString("user_id");
      const reason =
        interaction.options.getString("reason") || "No reason provided.";

      const bannedMembers = await interaction.guild.bans.fetch();
      const target = bannedMembers.get(userId);

      if (!target) {
        return await interaction.reply({
          content: `❌ No ban found for user with ID: ${userId}`,
          ephemeral: true,
        });
      }

      await interaction.guild.members.unban(userId, reason);
      await interaction.reply(
        `✅ Successfully unbanned <@${userId}> for: ${reason}`
      );
    } catch (error) {
      logError(`❌ Error executing unban command: ${error}`);
      await interaction.reply({
        content: "An error occurred while trying to unban the member.",
        ephemeral: true,
      });
    }
  },
};
