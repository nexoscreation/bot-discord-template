const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const { REPORT_LOG_ID } = require("../../config/guilds.json");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Report Message")
    .setType(ApplicationCommandType.Message),
  async execute(interaction) {
    const message = await interaction.targetMessage.fetch();

    const logChannel = interaction.guild.channels.cache.get(REPORT_LOG_ID);

    // Build the report embed
    const { EmbedBuilder } = require("discord.js");
    const reportEmbed = new EmbedBuilder()
      .setTitle("🚨 Message Reported")
      .setColor(0xff0000)
      .addFields(
        {
          name: "Reporter",
          value: `${interaction.user.tag} (${interaction.user.id})`,
          inline: false,
        },
        {
          name: "Author",
          value: `${message.author.tag} (${message.author.id})`,
          inline: false,
        },
        { name: "Channel", value: `<#${message.channel.id}>`, inline: true },
        {
          name: "Message Link",
          value: `[Jump to Message](${message.url})`,
          inline: true,
        },
        {
          name: "Content",
          value: message.content
            ? message.content.slice(0, 1024)
            : "*No content*",
          inline: false,
        }
      )
      .setTimestamp();

    if (logChannel && logChannel.isTextBased()) {
      await logChannel.send({ embeds: [reportEmbed] });
    }

    await interaction.reply({
      content: `🚨 Message by ${message.author.username} reported!`,
      ephemeral: true,
    });
  },
};
