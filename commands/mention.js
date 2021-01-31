const mentions = require('../mentions.json');
module.exports = {
	name: 'mention',
	aliases: ['men'],
	description: 'Mention a role',
	guildOnly: true,
	args: true,
	execute(message) {
		const Discord = require('discord.js');
		const args = message.content.trim().split(/ +/g);

		let reason = " ";
		for (var i = 2; i < args.length; i++) {
			reason += args[i] + " ";
		}
		reason.trim();

		if (args[1] == "help") {
			const embed = new Discord.MessageEmbed()
				.setTitle("Mention Roles")
				.setColor("BLUE")
				.setDescription(`This command can be used by **EXPERTS** to ping their **TRIBES**\n\nFormat: \`&mention <role name> <reason>\``)
				.addField("Role Names", "`tech`\n`code`\n`design`\n`creator`\n`science`");
			return message.channel.send(embed);
		}

		if (args.length < 3) return message.reply("One or more of your arguments are missing!\nUse: `&mention help` to know the format!");

		if (args[1] == "tech") {
			if (!message.member.roles.cache.find(r => r.id === mentions.experts.techexp)) return message.reply("You do not have permissions to do that!");
			message.channel.send(`<@&${mentions.tribes.techtr}> - ${reason} - ${message.author.tag}`);
		}
		else if (args[1] == "code") {
			if (!message.member.roles.cache.find(r => r.id === mentions.experts.codeexp)) return message.reply("You do not have permissions to do that!");
			message.channel.send(`<@&${mentions.tribes.codetr}> - ${reason} - ${message.author.tag}`);
		}
		else if (args[1] == "design" || args[1] == "des") {
			if (!message.member.roles.cache.find(r => r.id === mentions.experts.desexp)) return message.reply("You do not have permissions to do that!");
			message.channel.send(`<@&${mentions.tribes.destr}> - ${reason} - ${message.author.tag}`);
		}
		else if (args[1] == "creator" || args[1] == "creators") {
			if (!message.member.roles.cache.find(r => r.id === mentions.experts.desexp)) return message.reply("You do not have permissions to do that!");
			message.channel.send(`<@&${mentions.tribes.cretr}> - ${reason} - ${message.author.tag}`);
		}
		else if (args[1] == "science" || args[1] == "sci") {
			if (!message.member.roles.cache.find(r => r.id === mentions.experts.sciexp)) return message.reply("You do not have permissions to do that!");
			message.channel.send(`<@&${mentions.tribes.scitr}>\n\n - ${reason} - ${message.author.tag}`);
		}
		message.delete();
	}
}