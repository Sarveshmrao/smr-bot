const Discord = require('discord.js');
require('dotenv').config();
const index = require('../index');
const client = index.client;
module.exports = async (member) => {
    if (process.env.ADD_MEMBER == "true") {
        var mentionsmember = "<@" + member + ">"
        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor(3447003)
            .setTitle('Welcome ' + member.user.username)
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(process.env.ADD_MEMBER_MSG.replace("{{user}}", mentionsmember).replace("{{usercount}}", member.guild.memberCount))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
        client.channels.cache.get(process.env.GUILD_WELCOME).send(welcomeEmbed)

        if (process.env.WELCOME_DM == "true") {
            member.send(process.env.WELCOME_DM_MSG.replace("{{user}}", mentionsmember).replace("{{usercount}}", member.guild.memberCount))
        }
    }
};

module.exports.help = {
    event: 'guildMemberAdd',
};