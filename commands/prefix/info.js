/**
 * Prefix Command: info
 * Description: Provides bot information.
 */
const { logError } = require('../../utils/logger')

module.exports = {
  name: 'info',
  description: 'Displays bot information.',
  
  async execute(message) {
    try {
      const { client } = message;
      const uptime = (client.uptime / 1000).toFixed(2); // Convert uptime to seconds

      const infoMessage = `🤖 **Bot Information**:
- Name: ${client.user.tag}
- Servers: ${client.guilds.cache.size}
- Users: ${client.users.cache.size}
- Created: ${client.user.createdAt.toDateString()}
- Uptime: ${uptime} seconds
      `;

      await message.reply(infoMessage);
    } catch (error) {
        logError(`❌ Error executing info command: ${error}`);
      await message.reply({
        content: 'An error occurred while fetching bot information.',
      });
    }
  },
};
