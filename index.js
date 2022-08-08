console.log("NodeJS Version: " + process.version);

const DiscordJS = require('discord.js');
const { Intents, Permissions, MessageEmbed } = require('discord.js');
const keepAlive = require('./server.js');
const WOKCommands = require('wokcommands');
const path = require('path');
const mongoose = require('mongoose');
const cooldownSchema = require('./schemas/cooldownschema.js');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((m) => {
  console.log("Connected to the database!");
}).catch((err) => console.log(err));

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

let logsList = [];

let log = console.log;
console.log = (...args) => {
  logsList.push(...args);
  log(...args);
}

module.exports = logsList;

client.on("debug", ( e ) => console.log(e));

client.on("ready", async () => {
  console.log('Bot is online!');

  const wok = new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    delErrMsgCooldown: 15,
    testServers: '930338844354678805',
    botOwners: ['578935696518152193'],
  })
  .setDefaultPrefix('ti!');

  setInterval(async () => {
    if(logsList.length > 20){
      logsList.shift();
    }

    const cooldownToDelete = await cooldownSchema.findOne({ control: true });
    if(cooldownToDelete){
      if(Date.now() < cooldownToDelete.timestamp) return;
      
      console.log(`${cooldownToDelete.userID}'s cooldown is being deleted.`);
      cooldownToDelete.delete();
      console.log(`Cooldown successfully deleted.`);
      return;
    }
  }, 1000);
});


keepAlive();
client.login(process.env.TOKEN);