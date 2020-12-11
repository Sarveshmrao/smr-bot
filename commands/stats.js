const Discord = require('discord.js');
const os = require('os');

module.exports = {
            name: 'stats',
            aliases: ["s"],
            group: 'moderation',
            description: 'Get some awesome stats about the bot.',
            guildOnly: true,
            eligible: 1,
    execute(message) {
    let servercount = message.client.guilds.cache.size;
    let usercount = message.client.users.cache.size;
    let channelscount = message.client.channels.cache.size;
    let arch = os.arch();
    let platform = os.platform();
    let shard = message.client.ws.shards.size;
    let NodeVersion = process.version;
    let cores = os.cpus().length;
    let totalSeconds = (message.client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} day(s), ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;
  
    let stats = new Discord.MessageEmbed()
    .setAuthor('Sarvesh M Rao')
    .setTitle(`Statistics of ${message.client.user.username}`)
    .setColor('BLUE')
    .addField("Server Count", `${servercount}`, true)
    .addField("Users Count", `${usercount}`, true)
    .addField("Channel's Count", `${channelscount}`, true)
    .addField('Architecture', `${arch}`, true)
    .addField('Platform', `${platform}`, true)
    .addField('Node-Version', `${NodeVersion}`, true)
    .addField('Shards', `${shard}`, true)
    .addField('Cores', `${cores}`, true)
    .addField('Uptime', `${uptime}`)
    .setTimestamp();
    message.channel.send(stats);
}}