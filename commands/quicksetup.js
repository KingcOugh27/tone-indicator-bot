const { Permissions } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const guildSettings = require('../schemas/setupschema.js');

module.exports = {
  category: 'Staff',
  description: 'Automatically sets up the bot.',
  permissions: ['ADMINISTRATOR'],
  slash: true,
  maxArgs: 1,

  callback: async ({ interaction, guild, client }) => {
    console.log(`${interaction.user.id} has run the quicksetup command.`);
    let me = guild.members.cache.get(client.user.id);
    
    interaction.reply("Setting up the bot...\n🌀 Checking permissions.");

    await wait(800);
    
    if(!me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)){
      interaction.editReply("Setting up the bot...\n❌ Checking permissions.");
      interaction.followUp("Setup failed: I need the \`MANAGE_CHANNELS\` permission in order to work properly!");
      return;
    }
    
    interaction.editReply("Setting up the bot...\n✅ Checking permissions: Has \`MANAGE_CHANNELS\`.")

    await wait(800);

    interaction.editReply("Setting up the bot...\n✅ Checking permissions: Has \`MANAGE_CHANNELS\`.\n🌀 Creating TI channel.");
    let tiChat = await guild.channels.create("TI Chat", {
      type: 'text',
    });

    await wait(800);
    
    interaction.editReply("Setting up the bot...\n✅ Checking permissions: Has \`MANAGE_CHANNELS\`.\n✅ Created TI channel.\n🌀 Setting channel slowmode.");
    tiChat.setRateLimitPerUser(5);
    
    await wait(800);
    
    interaction.editReply("Setting up the bot...\n✅ Checking permissions: Has \`MANAGE_CHANNELS\`.\n✅ Created TI channel.\n✅ Set channel slowmode.\n🌀 Checking if server is in the database.");

    const config = await guildSettings.findOne({ serverID: guild.id });
    if(!config){
      interaction.editReply("Setting up the bot...\n✅ Checking permissions: Has \`MANAGE_CHANNELS\`.\n✅ Created TI channel.\n✅ Set channel slowmode.\n⭕ Server is not the database, initializing.");
      
      let toSave = {
        serverID: guild.id,
        channelID: tiChat.id
      }
      
      await new guildSettings(toSave).save();
      await wait(800);
      interaction.editReply("Setting up the bot...\n✅ Checking permissions: Has \`MANAGE_CHANNELS\`.\n✅ Created TI channel.\n✅ Set channel slowmode.\n✅ Server initialized in the database!");
      interaction.followUp("Setup complete!");
      return;
    } else {
      await guildSettings.updateOne({ serverID: guild.id }, {
        channelID: tiChat.id
      });
      await wait(800);
      interaction.editReply("Setting up the bot...\n✅ Checking permissions: Has \`MANAGE_CHANNELS\`.\n✅ Created TI channel.\n✅ Set channel slowmode.\n✅ Server is in the database! Updated TI channel.");
      interaction.followUp("Setup complete!");
      return;
    }
  }
}