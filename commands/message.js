const { MessageEmbed } = require('discord.js');
const msgBls = require('../schemas/blschema.js');
const cooldownSchema = require('../schemas/cooldownschema.js');

module.exports = {
  category: 'General',
  description: 'Sends a message to the dev (1 day cooldown).',
  slash: true,
  minArgs: 0,
  maxArgs: 1,
  expectedArgs: '<message>',

  callback: async ({ interaction, client, args }) => {
    var userID = interaction.member.user.id;
    
    const isBled = await msgBls.findOne({ userID: userID });
      
    if(isBled){
      return `You are blacklisted from messaging.`;
    }

    const onCooldown = await cooldownSchema.findOne({ userID: userID });

    if(onCooldown){
      var relativeDate = Math.round(onCooldown.timestamp / 1000);
      return `You are on a cooldown! It will be removed <t:${relativeDate}:R>.`
    }
    
    if(args[0].length < 10){
      interaction.reply("Message too short, please give more information.");
      return;
    } else if(args[0].length > 4050){
      interaction.reply("Message too long!");
      return;
    }
    
    await interaction.reply("Sending...");
    
    var newTimestamp = (Date.now() + 86400000);
    var uploadCooldown = {
      userID: userID,
      timestamp: newTimestamp,
      control: true
    }
    
    await new cooldownSchema(uploadCooldown).save();

    const messageEmbed = new MessageEmbed()
    .setTitle("You've got mail!")
    .setDescription(`Sent from ${interaciton.channel.id}\n-----${args[0]}`)
    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/High-contrast-mail-mark-unread.svg/480px-High-contrast-mail-mark-unread.svg.png")
    .setColor("RANDOM")
    .setFooter({ text: `From: ${userID}` })
    .setTimestamp();
    client.guilds.cache.get('930338844354678805').channels.cache.get('991704001525588028').send({ embeds: [messageEmbed] });

    console.log(`${userID} has sent a message!`);
    
    await interaction.editReply("Sent!");
    return;
  }
}