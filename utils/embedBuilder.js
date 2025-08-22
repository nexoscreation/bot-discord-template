const { EmbedBuilder } = require("discord.js");

/**
 * Utility: Embed Builder
 * Description: Provides helper functions to create rich embeds for consistent messaging.
 */

/**
 * Creates a simple embed.
 * @param {string} title - The title of the embed.
 * @param {string} description - The description of the embed.
 * @param {string} [color] - The color of the embed (default: blue).
 * @returns {EmbedBuilder} - The constructed embed.
 */
const createEmbed = (title, description, color = "#3498db") => {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();
};

/**
 * Creates an error embed.
 * @param {string} description - The error message.
 * @returns {EmbedBuilder} - The constructed error embed.
 */
const createErrorEmbed = (description) => {
  return createEmbed("❌ Error", description, "#e74c3c");
};

module.exports = {
  createEmbed,
  createErrorEmbed,
};
