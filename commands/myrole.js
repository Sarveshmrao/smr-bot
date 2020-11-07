module.exports = {
	name: 'myrole',
	description: 'Know your role on the bot!',
  eligible: 1,
	execute(message) {

		if(message.author.id == process.env.BOT_OWNER) {
      message.reply("You are the Bot Owner (5)");
    } else if(message.author.id == message.guild.ownerID) {

      message.reply("You are server owner (4)");
    } else if(message.member.hasPermission('ADMINISTRATOR')) {
      message.reply("You are Server Admin (3)");
    } else if(message.member.hasPermission('KICK_MEMBERS') && message.member.hasPermission('BAN_MEMBERS') && message.member.hasPermission('MANAGE_CHANNELS')) {
      message.reply("You are Server Mod (2)");
    } else {
      message.reply("You are User (1)");
    }
    message.delete;
	},
};