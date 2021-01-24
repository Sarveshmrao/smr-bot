const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
  client: client,
};

//Commands section
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Events section
fs.readdir('./events', (err, files) => {
  if (err) return console.log(err);
  let jsFiles = files.filter(file => file.split('.').pop() === 'js');
  jsFiles.forEach(file => {
    const prop = require(`./events/${file}`);
    client.on(prop.help.event, prop);
  });
});

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

//c=member.guild.channels.resolve('755495364697784392');
//c.setName('Member Count: ' + member.guild.memberCount);

//c=member.guild.channels.resolve('755495394338799698');
//usercount = member.guild.memberCount - 11;
//c.setName('User Count: ' + usercount);

client.login(token);
