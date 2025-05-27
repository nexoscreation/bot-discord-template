const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { logError } = require('../../../utils/logger');
/**
 * Command: ban
 * Description: Bans a member from the server.
 */
module.exports = {
  name: 'ban',
	description: 'Bans a member from the server.',
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member from the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const target = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || 'No reason provided.';
      const member = interaction.guild.members.cache.get(target.id);

      if (!member) {
        return await interaction.reply({
          content: `❌ Could not find the member: ${target.tag}`,
          ephemeral: true,
        });
      }

      await member.ban({ reason });
      await interaction.reply(`✅ Successfully banned ${target.tag} for: ${reason}`);
    } catch (error) {
        logError(`❌ Error executing ban command: ${error}`);
      await interaction.reply({
        content: 'An error occurred while trying to ban the member.',
        ephemeral: true,
      });
    }
  },
};
