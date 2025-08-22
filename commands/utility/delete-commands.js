const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { logInfo,logError } = require('../../utils/logger')

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

/**
 * Delete all application (/) commands globally or in the specified guild.
 * Pass 'global' as a command-line argument to delete global commands.
 */
async function deleteAllCommands() {
  try {
    if (!process.env.DISCORD_BOT_CLIENT_ID || !process.env.DISCORD_BOT_TOKEN) {
      logError('Missing required environment variables. Check your .env file.')
      process.exit(1);
    }

    const isGlobal = process.argv.includes('--global');

    if (isGlobal) {
      logInfo(`Started deleting all global application (/) commands.`);
      const commands = await rest.get(
        Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID)
      );
      for (const command of commands) {
        await rest.delete(
          `${Routes.applicationCommand(process.env.DISCORD_BOT_CLIENT_ID, command.id)}`
        );
      }
      logInfo(`Successfully deleted all global application (/) commands.`);
    } else {
      if (!process.env.DISCORD_GUILD_ID) {
        logError('Missing DISCORD_GUILD_ID for guild deletion.');
        process.exit(1);
      }
      logInfo(`Started deleting all guild application (/) commands.`);
      const commands = await rest.get(
        Routes.applicationGuildCommands(process.env.DISCORD_BOT_CLIENT_ID, process.env.DISCORD_GUILD_ID)
      );
      for (const command of commands) {
        await rest.delete(
          `${Routes.applicationGuildCommand(process.env.DISCORD_BOT_CLIENT_ID, process.env.DISCORD_GUILD_ID, command.id)}`
        );
      }
      logInfo(`Successfully deleted all guild application (/) commands.`);
    }
  } catch (error) {
    logError(`Error occurred while deleting commands: ${error}`);
  }
}

// Run the deletion
deleteAllCommands();
