/**
 * Prefix Command: ping
 * Description: Checks bot responsiveness and API latency.
 */
const { logError } = require("../../utils/logger");

module.exports = {
  name: "ping",
  description: "Checks bot responsiveness and API latency.",

  async execute(message) {
    try {
      const start = Date.now(); // Start timing

      // Send the initial response
      const sentMessage = await message.reply("🏓 Pinging...");

      const latency = Date.now() - start; // Calculate latency
      const apiLatency = Math.round(message.client.ws.ping); // API latency

      // Edit the reply with the latency values
      await sentMessage.edit(
        `🏓 Pong! Latency: ${latency}ms | API Latency: ${apiLatency}ms`
      );
    } catch (error) {
      logError(`❌ Error executing ping command: ${error}`);
      await message.reply({
        content: "An error occurred while trying to calculate latency.",
        ephemeral: true,
      });
    }
  },
};
