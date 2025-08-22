/**
 * Utility: Logger
 * Description: Provides centralized logging functionality for the bot with different log levels.
 */

const chalk = require("chalk");

const levels = {
  info: chalk.blue("INFO"),
  warn: chalk.yellow("WARN"),
  error: chalk.red("ERROR"),
};

/**
 * Logs a message to the console with a specific level.
 * @param {string} level - The log level (info, warn, error).
 * @param {string} message - The message to log.
 */
const log = (level, message) => {
  if (!levels[level]) {
    console.log(
      `${chalk.gray("LOG")} [${new Date().toLocaleString()}] ${message}`
    );
    return;
  }
  console.log(`${levels[level]} [${new Date().toLocaleString()}] ${message}`);
};

module.exports = {
  logInfo: (message) => log("info", message),
  logWarn: (message) => log("warn", message),
  logError: (message) => log("error", message),
};
