module.exports = {
		name: 'announce',
		aliases: ['a'],
		description: 'Create a embed',
		usage: '<title with quotes> <description with quotes> (message with quotes) (image URL with quotes)',
		guildOnly: true,
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

  .setTitle(msg[0])
  .setURL(process.env.URL)
  .setColor(0x4286f4)
  .setDescription(msg[1])
  .setFooter('© ' + process.env.BOT_NAME + ' | ' + process.env.AUTHOR_NAME, message.client.user.avatarURL);

if (msg[3] !== undefined) {
  embed.setImage(msg[3])
}
if (msg[2] !== undefined) {
	message.channel.send(embed)
	message.channel.send(msg[2])
} else {
	message.channel.send(embed)
}
message.delete();
}
}