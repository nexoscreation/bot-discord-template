const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * Command: unmute
 * Description: Unmutes a member by removing the "Muted" role.
 */
module.exports = {
  name: 'unmute',
	description: 'Unmutes a member by removing the "Muted" role.',
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmutes a member by removing the "Muted" role')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to unmute')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the unmute')
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const target = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || 'No reason provided.';
      const member = interaction.guild.members.cache.get(target.id);
      const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

      if (!mutedRole) {
        return await interaction.reply({
          content: '❌ "Muted" role not found. Please ensure that the "Muted" role exists before using this command.',
          ephemeral: true,
        });
      }

      if (!member) {
        return await interaction.reply({
          content: `❌ Could not find the member: ${target.tag}`,
          ephemeral: true,
        });
      }

      if (!member.roles.cache.has(mutedRole.id)) {
        return await interaction.reply({
          content: `❌ ${target.tag} is not muted.`,
          ephemeral: true,
        });
      }

      await member.roles.remove(mutedRole, reason);
      await interaction.reply(`✅ Successfully unmuted ${target.tag} for: ${reason}`);
    } catch (error) {
      console.error('❌ Error executing unmute command:', error);
      await interaction.reply({
        content: 'An error occurred while trying to unmute the member.',
        ephemeral: true,
      });
    }
  },
};
