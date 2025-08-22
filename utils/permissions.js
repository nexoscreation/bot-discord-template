/**
 * Utility: Permissions
 * Description: Validates permissions for commands and interactions.
 */

/**
 * Checks if a user has the required permissions.
 * @param {GuildMember} member - The member whose permissions are being checked.
 * @param {string[]} requiredPermissions - Array of required permissions.
 * @returns {boolean} - True if the member has all required permissions, false otherwise.
 */
const hasPermissions = (member, requiredPermissions) => {
  return requiredPermissions.every((permission) =>
    member.permissions.has(permission)
  );
};

/**
 * Checks if a bot has the required permissions in a channel.
 * @param {GuildChannel} channel - The channel to check permissions in.
 * @param {string[]} requiredPermissions - Array of required permissions.
 * @returns {boolean} - True if the bot has all required permissions, false otherwise.
 */
const botHasPermissions = (channel, requiredPermissions) => {
  const botPermissions = channel.permissionsFor(channel.guild.members.me);
  return requiredPermissions.every((permission) =>
    botPermissions.has(permission)
  );
};

module.exports = {
  hasPermissions,
  botHasPermissions,
};
