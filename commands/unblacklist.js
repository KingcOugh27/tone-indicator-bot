const msgBls = require('../schemas/blschema.js');

module.exports = {
  category: 'Administrative',
  description: 'Unblacklists the user from the database',
  slash: true,
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<perpetrator>',
  ownerOnly: true,

  callback: async ({ interaction, args }) => {
    var perpetrator = args[0];

    const isBled = await msgBls.findOne({ userID: perpetrator });
    if(!isBled){
      return `\`${perpetrator}\` is not blacklisted.`;
    } else {
      
      await msgBls.deleteOne({ userID: perpetrator });
      console.log(`${perpetrator} has been unblacklisted from messaging.`);
      
      return `\`${perpetrator}\` has been unblacklisted.`;
    }
  }
}