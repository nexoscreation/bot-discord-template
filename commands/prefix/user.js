/**
 * Command: user
 * Description: Displays user-specific details.
 */
module.exports = {
  name: 'user',
  description: 'Displays your user details.',

  execute(message) {
    const user = message.author;
    const member = message.guild.members.cache.get(user.id);

    const roles = member
      ? member.roles.cache
        .filter(role => role.id !== message.guild.id) // Exclude @everyone
        .map(role => role.name)
        .join(', ') || 'No roles'
      : 'No roles';

    const userInfo = `🙋 **User Information**:
- Username: ${user.tag}
- ID: ${user.id}
- Joined Server: ${member?.joinedAt?.toDateString() || 'N/A'}
- Account Created: ${user.createdAt.toDateString()}
- Roles: ${roles}
- Avatar: [Click here to view avatar](${user.displayAvatarURL()})
    `;

    try {
      message.reply(userInfo);
    } catch (error) {
      console.error('❌ Error executing user command:', error);
      message.reply('An error occurred while fetching your user information.');
    }
  },
};
