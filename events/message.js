const Discord = require('discord.js');
require('dotenv').config();
const prefix = process.env.PREFIX;
const index = require('../index');
const client = index.client;
const cooldowns = new Discord.Collection();
let userlevel;
module.exports = async message => {
    /*if (message.guild) {
          let prefix;
      
          if (message.content.startsWith(globalPrefix)) {
            prefix = globalPrefix;
          } else {
            // check the guild-level prefix
            const guildPrefix = prefixes.get(message.guild.id);
            if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
          }
      
          // if we found a prefix, setup args; otherwise, this isn't a command
          if (!prefix) return;
      */

    if (message.author.bot) return;

    if (message.channel.type === 'dm') {
        userlevel = 1;
    } else if (message.author.id == process.env.BOT_OWNER) {
        userlevel = 5;
    } else if (message.author.id == message.guild.ownerID) {

        userlevel = 4;
    } else if (message.member.hasPermission('ADMINISTRATOR')) {
        userlevel = 3;
    } else if (message.member.hasPermission('KICK_MEMBERS') && message.member.hasPermission('BAN_MEMBERS') && message.member.hasPermission('MANAGE_CHANNELS')) {
        userlevel = 2;
    } else {
        userlevel = 1;
    }




    //invite link blocker

    if (message.content.toLowerCase().includes("discord.gg") || message.content.toLowerCase().includes("discord.com/invite")) {
        if (process.env.INVITE_BLOCKER == "true") {
            if (userlevel < 3) {
                message.delete({ timeout: 10 });
                message.reply("Only Admins are authorized to send invite links").then(msg => msg.delete({ timeout: 10000 }));
                message.author.send("Only admins are authorized to send invite links!!");
            };
        }
    };


    if (!message.content.startsWith(prefix)) return;
    /*
      } else {
        // handle DMs
        const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
        args = message.content.slice(prefix.length).trim().split(/ +/)
      }
    */
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (userlevel < command.eligible) {
        let usermessage;
        let commandusermessage;
        if (userlevel == 5) { usermessage = "5 (Bot Owner)" } else if (userlevel == 4) { usermessage = "4 (Server Owner)" } else if (userlevel == 3) { usermessage = "3 (Server Admin)" } else if (userlevel == 2) { usermessage = "2 (Server Mod)" } else if (userlevel == 1) { usermessage = "1 (User)" }

        if (command.eligible == 5) { commandusermessage = "5 (Bot Owner)" } else if (command.eligible == 4) { commandusermessage = "4 (Server Owner)" } else if (command.eligible == 3) { commandusermessage = "3 (Server Admin)" } else if (command.eligible == 2) { commandusermessage = "2 (Server Mod)" } else if (command.eligible == 1) { commandusermessage = "1 (User)" }

        var NotEligibleEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("You don't have permission to use this command")
            .setURL(process.env.URL)
            .addField("Your Role", usermessage, true)
            .addField("Required Role", commandusermessage, true)
            .setDescription('You can use \`' + prefix + 'myrole\` to check your role.')
            .setTimestamp()
            .setFooter('© ' + process.env.BOT_NAME + ' | ' + process.env.AUTHOR_NAME, message.client.user.avatarURL);
        return message.reply(NotEligibleEmbed)

    }
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
};
module.exports.help = {
    event: 'message'
};