module.exports = {
	name: 'message',
	aliases: ['m'],
	description: 'Send message as the bot!',
	usage: '\"Your Message in quotes\"',
	guildOnly: true,
	args: true,
	eligible: 3,
	execute(message) {

		const Discord = require('discord.js');

		const args = message.content.trim().split(/ +/g);

		// Defining the message...
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