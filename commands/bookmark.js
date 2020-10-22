module.exports = {
		name: 'bookmark',
		aliases: ['b'],
		description: 'Sends whatever you put in double quotes to your DM',
		guildOnly: true,
		usage: "bookmark <\"Your Message Here\"> (\"Personal Note\")",
		args: true,
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
  .setURL('https://discord.gg/n7TmN6t')
  .setColor(0x4286f4)
  .setDescription(msg[0])
  .setTimestamp()
  .setFooter('© TechCrawler Bot | Sarvesh M Rao', 'https://cdn.discordapp.com/avatars/755372132036378625/d78bb20a07e8819d86b2da6321d7ad5d.webp');

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