const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

/**
 * Delete all application (/) commands in the specified guild.
 */
async function deleteAllCommands() {
  try {
    console.log('Started deleting all application (/) commands.');

    // Fetching all commands from the guild
    const commands = await rest.get(
      Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID)
    );

    // Deleting each command
    for (const command of commands) {
      await rest.delete(
        `${Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID)}/${command.id}`
      );
    }

    console.log('Successfully deleted all application (/) commands.');
  } catch (error) {
    // Improved error handling with context
    console.error('Error occurred while deleting commands:', error);
  }
}

// Run the deletion
deleteAllCommands();
