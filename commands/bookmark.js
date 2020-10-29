module.exports = {
		name: 'bookmark',
		aliases: ['b'],
		description: 'Sends whatever you put in double quotes to your DM',
		guildOnly: true,
		usage: "bookmark <\"Your Message Here\"> (\"Personal Note\")",
		args: true,
    eligible: 1,
execute(message){

const Discord = require('discord.js');

const args = message.content.trim().split(/ +/g);

const msg = [];



const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;


let match;
while (match = regex.exec(args.join(' '))) msg.push(match[2]);


// Creating and sending embed...
let content = [];

var embed = new Discord.MessageEmbed()
  .setColor(0x4286f4)
  .setTitle("Your Bookmark")
  .setURL(process.env.URL)
  .setColor(0x4286f4)
  .setDescription(msg[0])
  .setTimestamp()
  .setFooter('© ' + process.env.BOT_NAME + ' | ' + process.env.AUTHOR_NAME, message.client.user.avatarURL);

if (msg[2] !== undefined) {
  embed.setImage(msg[2])
}
if (msg[1] !== undefined) {
	message.author.send(embed)
	message.author.send(msg[1])
} else {
	message.author.send(embed)
}
message.delete();
}
}