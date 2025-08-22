/**
 * Utility: Time Formatter
 * Description: Provides functions to format durations and timestamps.
 */

/**
 * Converts milliseconds to a human-readable duration.
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} - A formatted string (e.g., "2h 30m").
 */
const formatDuration = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return [
    days > 0 ? `${days}d` : null,
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    seconds > 0 ? `${seconds}s` : null,
  ]
    .filter(Boolean)
    .join(" ");
};

/**
 * Formats a timestamp into a readable date string.
 * @param {Date} date - The date to format.
 * @returns {string} - A formatted date string.
 */
const formatTimestamp = (date) => {
  return date.toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "long",
    timeStyle: "short",
  });
};

module.exports = {
  formatDuration,
  formatTimestamp,
};
