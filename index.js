const fs = require('fs');
const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

//const mysqldetails = "mysql://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME;
//const { Sequelize } = require('sequelize');
//let userRole;
require(`./db.js`);
//const sequelize = new Sequelize(mysqldetails);
//try {
//  sequelize.authenticate();
//  console.log('Connection has been established successfully.');
//} catch (error) {
//  console.error('Unable to connect to the database:', error);
//}
const client = new Discord.Client();
client.commands = new Discord.Collection();

let userlevel;



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
 require('http').createServer((req, res) => res.end('Bot is alive')).listen(3000)
  console.log('Ready!');
  console.log('Logged in as ' + client.user.tag)
  client.user.setStatus('available')

  client.channels.cache.get(process.env.GUILD_INIT).send(process.env.GUILD_INIT_MSG)
  client.user.setPresence({
    activity: {
      name: process.env.ACTIVITY_STATUS,
      url: process.env.URL
    }
  });
});

client.on('guildMemberAdd', member => {

  var mentionsmember = "<@" + member + ">"
  client.channels.cache.get(process.env.GUILD_WELCOME).send({
    embed: {
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
    }
  })

});

client.on('guildMemberRemove', member => {
  var mentionsmember = "<@" + member + ">"

  client.channels.cache.get(process.env.GUILD_WELCOME).send({
    embed: {
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
    }
  })


});

client.on('message', message => {
  
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

  if (!message.content.startsWith(prefix) || message.author.bot) return;
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

  const args = message.content.slice(prefix.length).trim().split(/ +/);


  /*
    } else {
      // handle DMs
      const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
      args = message.content.slice(prefix.length).trim().split(/ +/)
    }
  */
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

});

  //c=member.guild.channels.resolve('755495364697784392');
  //c.setName('Member Count: ' + member.guild.memberCount);

  //c=member.guild.channels.resolve('755495394338799698');
  //usercount = member.guild.memberCount - 11;
  //c.setName('User Count: ' + usercount);









client.login(token);