/**
 * Event: guildCreate
 * Triggered when the bot is added to a new server.
 */
const { logInfo } = require("../utils/logger");
const PREFIX = process.env.DISCORD_BOT_PREFIX;

module.exports = {
  name: "guildCreate",
  execute(guild) {
    logInfo(`➕ Joined new server: ${guild.name} (${guild.id})`);
    guild.systemChannel?.send(
      `👋 Hello! Thanks for inviting me to your server. Use \`${PREFIX}help\` to get started!`
    );
  },
};
