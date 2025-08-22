const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Get User Info')
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    const user = await interaction.targetUser.fetch();
    const member = interaction.guild.members.cache.get(user.id);
    const { EmbedBuilder } = require('discord.js');

    const embed = new EmbedBuilder()
      .setTitle('User Info')
      .setColor(0x5865f2)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Tag', value: `${user.tag}`, inline: true },
        { name: 'Mention', value: `<@${user.id}>`, inline: true },
        { name: 'User ID', value: user.id, inline: false },
        { name: 'Account Created', value: `<t:${Math.floor(user.createdTimestamp/1000)}:F>`, inline: false },
        ...(member ? [{ name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp/1000)}:F>`, inline: false }] : [])
      );

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
