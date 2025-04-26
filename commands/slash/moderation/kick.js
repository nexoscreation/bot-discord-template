const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * Command: kick
 * Description: Kicks a member from the server.
 */
module.exports = {
  name: 'kick',
	description: 'Kicks a member from the server.',
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member from the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the kick')
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

      await member.kick(reason);
      await interaction.reply(`✅ Successfully kicked ${target.tag} for: ${reason}`);
    } catch (error) {
      console.error('❌ Error executing kick command:', error);
      await interaction.reply({
        content: 'An error occurred while trying to kick the member.',
        ephemeral: true,
      });
    }
  },
};
