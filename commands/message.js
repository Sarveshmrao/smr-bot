module.exports = {
		name: 'message',
		aliases: ['m'],
		description: 'Create a poll (Use &p or &poll question without quotes \"option 1 or y/n for yes or no type question\" \"option 2 optional and so on\")',
		usage: 'question without quotes \"option 1 or y/n for yes or no type question\" \"option 2 optional and so on\"',
		guildOnly: true,
		args: true,
execute(message){

const Discord = require('discord.js');

const args = message.content.trim().split(/ +/g);

// Defining the question...
let question = [];

for (let i = 1; i < args.length; i++) {
  if (args[i].startsWith('"')) break;
  else question.push(args[i]);
}
question = question.join(' ');


const choices = [];



const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;


let match;
while (match = regex.exec(args.join(' '))) choices.push(match[2]);


// Creating and sending embed...
let content = [];

message.channel.send(choices[0]);
message.delete();
}
}