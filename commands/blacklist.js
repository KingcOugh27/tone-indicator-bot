const msgBls = require('../schemas/blschema.js');

module.exports = {
  category: 'Administrative',
  description: 'Blacklists the user from messaging.',
  slash: true,
  minArgs: 1,
  maxArgs: 2,
  expectedArgs: '<perpetrator> [reason]',
  ownerOnly: true,

  callback: async ({ interaction, args }) => {
    var perpetrator = args[0];

    const isBled = await msgBls.findOne({ userID: perpetrator });
    if(isBled){
      return `\`${perpetrator}\` is already blacklisted.`;
    }
    
    if(args[1]){
      var reason = args[1];
    } else {
      var reason = "None provided.";
    }

    var toBl = {
      userID: perpetrator,
      reason: reason
    }

    await new msgBls(toBl).save();
    console.log(`${perpetrator} has been blacklisted from messaging.`);

    return `\`${perpetrator}\` has been blacklisted.`;
  }
}
