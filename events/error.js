/**
 * Event: error
 * Handles unexpected errors at the global level.
 */
module.exports = {
  name: 'error',
  execute(error) {
    console.error('❌ A global error occurred:', error);
  },
};
