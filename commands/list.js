const { MessageEmbed } = require('discord.js');

module.exports = {
  category: 'General',
  description: 'Shows a list of tone indicators.',
  slash: true,
  maxArgs: 1,

  callback: ({ interaction }) => {

    const listEmbed = new MessageEmbed()
    .setColor('ORANGE')
    .setTitle('Full List (Click me)')
    .setThumbnail("https://cdn.discordapp.com/attachments/932872072210841632/991361572222029884/tone_indicator.png")
    .setURL('https://toneindicators.carrd.co/#masterlist')
    .setDescription(`Here is a list of the most common tone indicators:`)
    .addFields(
      { name: '/j, /hj, /s', value: 'Joking, Half Joking, Sarcastic'},
      { name: '/gen or /g, /srs, /nsrs', value: 'Genuine, Serious, Not Serious'},
      { name: '/c, /l or /ly', value: 'Copypasta, Lyrics'},
      { name: '/lh, /nm, /lu', value: 'Light-Hearted, Not Mad, (a) Little Upset'},
      { name: '/rh or /rt, /t, /i', value: 'Rhetorical question, Teasing, Inside Joke'},
      { name: '/m, /li, /f', value: 'Metaphorically, Literally, Fake'}
    )
    .setTimestamp();

    return listEmbed;
  }
}