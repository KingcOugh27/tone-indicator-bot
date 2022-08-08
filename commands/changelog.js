const { MessageEmbed } = require('discord.js');

module.exports = {
  category: 'General',
  description: 'Shows the changes made in the bot over time.',
  slash: true,
  maxArgs: 1,

  callback: ({ message, interaction}) => {
    const changelogEmbed = new MessageEmbed()
    .setTitle("/Tone Indicator | Changelog")
    .setThumbnail("https://cdn.discordapp.com/attachments/932872072210841632/991361572222029884/tone_indicator.png")
    .setColor("GREEN")
    .setDescription("Current version: v1\n-----")
    .addFields(
      { name: 'v0 | 06/27/2022', value: 'Bot created. (On my birthday!)' },
      { name: 'v0.1 | 06/27/2022', value: 'Finished tone indicator-only chat function.'},
      { name: 'v0.1.1 | 06/27/2022', value: 'Connected to a database, created manual setup.'},
      { name: 'v1 | 06/28/2022', value: 'Added auto-setup command and list of TI\'s.'},
      { name: 'v1.1 | 06/29/2022', value: 'Added the message command.'},
    )
    .setFooter({ text: "- Tom27#3897 -"})
    .setTimestamp();

    return changelogEmbed;
  }
}