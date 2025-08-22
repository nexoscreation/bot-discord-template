/**
 * Event: interactionCreate
 * Triggered when a user interacts with a slash command or button.
 */
const { logError } = require('../utils/logger')

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // Handle slash commands
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: '❌ Command not recognized!',
          ephemeral: true,
        });
      }
      try {
        await command.execute(interaction);
      } catch (error) {
        logError(`❌ Error executing ${interaction.commandName} command: ${error}`);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
      return;
    }

    // Handle context menu commands (user/message right-click)
    if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: '❌ Context command not recognized!',
          ephemeral: true,
        });
      }
      try {
        await command.execute(interaction);
      } catch (error) {
        logError(`❌ Error executing context menu command ${interaction.commandName}: ${error}`);
        await interaction.reply({
          content: 'There was an error while executing this context menu command!',
          ephemeral: true,
        });
      }
      return;
    }
  },
};
