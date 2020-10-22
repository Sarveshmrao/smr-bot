const fs = require('fs');
const Discord = require('discord.js');
const prefix= process.env.PREFIX;
const token = process.env.TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
client.user.setStatus('available')
client.channels.cache.get(process.env.GUILD_INIT).send(process.env.GUILD_INIT_MSG)
    client.user.setPresence({
        activity: {
            name: process.env.NAME,
            url: process.env.URL
        }
    });
});

client.on('guildMemberAdd', member => {
var mentionsmember = "<@" + member + ">"
    client.channels.cache.get(process.env.GUILD_WELCOME).send({embed: {
color: 3447003,
title: process.env.BOT_NAME,
url: process.env.URL,
description: ":wave: Welcome *" + mentionsmember + "* to the" + process.env.NAME + "!. \nCurrently our server has " + member.guild.memberCount + " awesome members!",
thumbnail: client.user.avatarURL,
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: "© " + process.env.BOT_NAME + " | " + process.env.AUTHOR_NAME
}
}})
//c=member.guild.channels.resolve('755495364697784392');
//c.setName('Member Count: ' + member.guild.memberCount);

//c=member.guild.channels.resolve('755495394338799698');
//usercount = member.guild.memberCount - 11;
//c.setName('User Count: ' + usercount);
});


client.on('guildMemberRemove', member => {
var mentionsmember = "<@" + member + ">"

client.channels.cache.get(process.env.GUILD_WELCOME).send({embed: {
color: 3447003,
title: "TechCrawler Bot!",
url: process.env.URL,
description: ":wave: Bye *" + mentionsmember + "* We hope you\'ll be back soon! \nCurrently our server has " + member.guild.memberCount + " awesome members!",
thumbnail: client.user.avatarURL,
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: "© " + process.env.BOT_NAME + " | " + process.env.AUTHOR_NAME
}
}})
//c=member.guild.channels.resolve('755495364697784392');
//c.setName('Member Count: ' + member.guild.memberCount);


//c=member.guild.channels.resolve('755495394338799698');
//usercount = member.guild.memberCount - 11;
//c.setName('User Count: ' + usercount);

});



client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);