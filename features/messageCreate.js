const guildSettings = require('../schemas/setupschema.js');
const tiSelect = require('../tiselect.js');

module.exports = async (client, instance) => {
  client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    
    const config = await guildSettings.findOne({ serverID: message.guild.id });

    if(!config) return;
    if(message.channel.id != config.channelID) return;
    
    if(!tiSelect.some(tiSelect => message.content.includes(tiSelect))){
      let m = await message.reply("Message does not contain a tone indicator!\nYou can find a list of tone indicators in my \`About Me\`.");
      setTimeout(() => {
        m.delete();
      }, 8000);
    };
  });
}
