const { MessageEmbed } = require('discord.js');
const guildSettings = require('../schemas/setupschema.js');

module.exports = {
  category: 'Staff',
  description: 'Instructions to set up the bot manually.',
  permissions: ['ADMINISTRATOR'],
  slash: true,
  minArgs: 0,
  maxArgs: 3,
  expectedArgs: '[type] [value]',

  callback: async ({ interaction, args, guild }) => {
    if(!args[0]){
      const setupEmbed = new MessageEmbed()
      .setTitle("How to set up the bot manually:")
      .setDescription("BTW, you can run the command \`/quicksetup\` for the bot to set up automatically.")
      .setColor("ORANGE")
      .addFields(
        { name: 'Step 1:', value: 'Make sure the bot has ADMINISTRATOR permissions.'},
        { name: 'Step 2:', value: 'Run the command \`/setup type:channel value:channel-name\`. You put the name of the channel you want to be the ti-only channel in \`value\`.'},
        { name: 'Step 3 (Recommended):', value: 'Set the slowmode of the ti-only channel to at least 5 seconds.'}
      )
      .setTimestamp();

      return setupEmbed;
    }
    
    if(args[0] != "channel") return "The only type available is \`channel\`.";
    
    if(args[0] == "channel"){
      if(!isNaN(args[1])){
        return "You must provide the channel's name!";
      } else{
        const tiChannel = guild.channels.cache
        .find(channel => channel.name == args[1]);

        if(!tiChannel) return `\`#${args[1]}\` cannot be found on the server.`;
        if(tiChannel){
          const config = await guildSettings.findOne({ serverID: guild.id });

          if(!config){
            let toSave = {
              serverID: guild.id,
              channelID: tiChannel.id
            }
            
            await new guildSettings(toSave).save();
            return `<#${tiChannel.id}> has been set as the tone indicator chat.\n\`It is recommended to have at least a 5 second slowmode.\``;
          } else {
            await guildSettings.updateOne({ serverID: guild.id }, {
              channelID: tiChannel.id
            });
            return `<#${tiChannel.id}> has been set as the tone indicator chat.\n\`It is recommended to have at least a 5 second slowmode.\``;
          }
        }
      }
    }
  }
}