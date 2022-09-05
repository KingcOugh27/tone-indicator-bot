const { MessageEmbed } = require('discord.js');

module.exports = {
  category: 'General',
  description: 'Shows basic information and commands.',
  slash: true,
  maxArgs: 1,

  callback: ({ interaction }) => {

    const helpEmbed = new MessageEmbed()
    .setColor('YELLOW')
    .setTitle('Information')
    .setThumbnail("https://cdn.discordapp.com/attachments/932872072210841632/991361572222029884/tone_indicator.png")
    .setDescription(`Hello there, I'm \`/Tone Indicator\`.\n---\n\n**My Commands:**`)
    .addFields(
      { name: 'General:', value: '\`help\` - Shows basic information and commands.\n\`list\` - Shows a list of tone indicators.\n\`changelog\` - Shows the changes made in the bot over time.\n\`message\` - Sends a message to me through the bot, can be used for suggestions, bug reports, etc.'},
      { name: 'Staff', value: '\`quicksetup\` - Automatically sets up the bot.\n\`setup\` - Instructions to set up the bot manually.'}
    )
    .setFooter({ text: `Tom27#3897, Whee23#0587 | v1.3` })
    .setTimestamp();

    return helpEmbed;
  }
}
