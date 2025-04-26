const { SlashCommandBuilder } = require('discord.js');
// const fetch = require('node-fetch');

/**
 * Command: joke
 * Description: Fetches a random joke from an API.
 */
module.exports = {
  name: 'joke',
	description: 'Fetches a random joke from an API',
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Fetches a random joke'),

  async execute(interaction) {
    try {
      // const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      // const joke = await response.json();

      await interaction.reply(`😂 **${joke.setup}**\n\n*${joke.punchline}*`);
    } catch (error) {
      console.error('❌ Error fetching a joke:', error);
      await interaction.reply({
        content: 'Failed to fetch a joke. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
