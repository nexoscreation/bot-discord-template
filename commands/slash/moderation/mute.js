const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * Command: mute
 * Description: Mutes a member by assigning a "Muted" role.
 */
module.exports = {
  name: 'mute',
	description: 'Mutes a member by assigning a "Muted" role.',
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes a member by assigning a "Muted" role')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to mute')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the mute')
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
          content: '❌ "Muted" role not found. Please create one before using this command.',
          ephemeral: true,
        });
      }

      if (!member) {
        return await interaction.reply({
          content: `❌ Could not find the member: ${target.tag}`,
          ephemeral: true,
        });
      }

      await member.roles.add(mutedRole, reason);
      await interaction.reply(`✅ Successfully muted ${target.tag} for: ${reason}`);
    } catch (error) {
      console.error('❌ Error executing mute command:', error);
      await interaction.reply({
        content: 'An error occurred while trying to mute the member.',
        ephemeral: true,
      });
    }
  },
};
