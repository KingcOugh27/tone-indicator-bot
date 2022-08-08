const logsList = require('../index.js');

module.exports = {
  category: 'Administrative',
  description: 'Shows recent logs',
  slash: true,
  maxArgs: 1,
  ownerOnly: true,
  
  callback: ({ interaction }) => {
      interaction.reply('```\n' + logsList.join('\n') + '\n```');
      console.log(`Ran the logs command in #${interaction.channel.name}.`);
      return;
  }
}