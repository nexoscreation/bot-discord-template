const { ChannelType } = require("discord.js");

/**
 * Command: server
 * Description: Displays server details.
 */
const { logError } = require("../../utils/logger");

module.exports = {
  name: "server",
  description: "Displays server information.",

  async execute(message) {
    const { guild } = message;
    if (!guild) {
      return message.reply("This command can only be used in a server.");
    }

    try {
      const owner = await guild.fetchOwner();
      const textChannels = guild.channels.cache.filter(
        (c) => c.type === ChannelType.GuildText
      ).size;
      const voiceChannels = guild.channels.cache.filter(
        (c) => c.type === ChannelType.GuildVoice
      ).size;

      const serverInfo = `🏠 **Server Information**:
- Name: ${guild.name}
- Members: ${guild.memberCount}
- Created: ${guild.createdAt.toDateString()}
- Owner: ${owner.user.tag}
- Region: ${guild.preferredLocale || "Unknown"}
- Text Channels: ${textChannels}
- Voice Channels: ${voiceChannels}
- Server Icon: [Click here to view avatar](${
        guild.iconURL() ? guild.iconURL() : "No icon available"
      })
    `;

      message.reply(serverInfo);
    } catch (error) {
      logError(`❌ Error executing server command: ${error}`);
      message.reply("An error occurred while fetching server information.");
    }
  },
};
