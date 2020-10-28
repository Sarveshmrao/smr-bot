const Discord = require('discord.js');
const os = require('os');

module.exports = {
            name: 'stats',
            aliases: ["s"],
            group: 'moderation',
            description: 'Just a kick command If it replies nothing then you do not have enough permission to kick that person',
            guildOnly: true,
    execute(message) {
    let servercount = message.client.guilds.cache.size;
    let usercount = message.client.users.cache.size;
    let channelscount = message.client.channels.cache.size;
    let arch = os.arch();
    let platform = os.platform();
    let shard = message.client.ws.shards.size;
    let NodeVersion = process.version;
    let cores = os.cpus().length;

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
    .setTimestamp()
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(stats);
}}