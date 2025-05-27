/**
 * Event: error
 * Handles unexpected errors at the global level.
 */
const { logError } = require('../utils/logger')

module.exports = {
  name: 'error',
  execute(error) {
      logError(`❌ A global error occurred: ${error}`);
  },
};
