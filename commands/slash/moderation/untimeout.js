const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * Command: untimeout
 * Description: Removes the timeout (or "silence") from a member.
 */
module.exports = {
  name: 'untimeout',
	description: 'Removes the timeout (or "silence") from a member.',
  data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('Removes a timeout from a member')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to remove timeout from')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the untimeout')
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

      if (!member.communicationDisabledUntil) {
        return await interaction.reply({
          content: `❌ ${target.tag} is not currently in a timeout.`,
          ephemeral: true,
        });
      }

      await member.timeout(null, reason);
      await interaction.reply(`✅ Successfully removed the timeout from ${target.tag}. Reason: ${reason}`);
    } catch (error) {
      console.error('❌ Error executing untimeout command:', error);
      await interaction.reply({
        content: 'An error occurred while trying to remove the timeout.',
        ephemeral: true,
      });
    }
  },
};
