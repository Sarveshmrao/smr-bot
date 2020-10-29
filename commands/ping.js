const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
  eligible: 1,
	execute(message) {
  const m = message.channel.send("Hold on .....")
  
  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor('BLUE')
  .setTimestamp()
  .addField("Latency", `${Date.now() - message.createdTimestamp}ms`, true)
  .addField("API Latency", `${Math.round(message.client.ws.ping)}ms`, true)
  .setFooter('© ' + process.env.BOT_NAME + ' | ' + process.env.AUTHOR_NAME, message.client.user.avatarURL);

  message.channel.send(pong);

  },
};