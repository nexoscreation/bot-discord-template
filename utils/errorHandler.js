/**
 * Utility: Error Handler
 * Description: Provides centralized error handling for the bot.
 */

/**
 * Handles an error by logging it and optionally replying to the interaction.
 * @param {Error} error - The error to handle.
 * @param {Object} [interaction] - The interaction to reply to (optional).
 */
const handleError = async (error, interaction = null) => {
  console.error(`[ERROR] ${error.stack || error.message}`);

  if (interaction) {
    try {
      await interaction.reply({
        content: "❌ An unexpected error occurred. Please try again later.",
        ephemeral: true,
      });
    } catch (replyError) {
      console.error(
        `[ERROR] Failed to send error response: ${
          replyError.stack || replyError.message
        }`
      );
    }
  }
};

module.exports = handleError;
