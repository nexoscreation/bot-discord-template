const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { logError, logWarn } = require('../../../utils/logger');

/**
 * Command: warn
 * Description: Warns a member and logs it (placeholder for a database).
 */

module.exports = {
  name: 'warn',
	description: ' Warns a member and logs it (placeholder for a database).',
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a member for breaking rules')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to warn')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the warning')
        .setRequired(false)
    ),

  async execute(interaction) {
    try {
      const target = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || 'No reason provided.';

      await interaction.reply(`⚠️ ${target.tag} has been warned. Reason: ${reason}`);

      // Log the warning (placeholder for a real database implementation)
      logWarn(`⚠️ ${target.tag} was warned for: ${reason}`);
    } catch (error) {
        logError(`❌ Error executing warn command: ${error}`);
      await interaction.reply({
        content: 'An error occurred while trying to warn the member.',
        ephemeral: true,
      });
    }
  },
};
