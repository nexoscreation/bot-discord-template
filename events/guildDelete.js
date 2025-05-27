/**
 * Event: guildDelete
 * Triggered when the bot is removed from a server.
 */
const { logInfo } = require('../utils/logger')

module.exports = {
  name: 'guildDelete',
    execute(guild) {
        logInfo(`➖ Removed from server: ${guild.name} (${guild.id})`);
  },
};
