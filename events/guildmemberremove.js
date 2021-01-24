const Discord = require('discord.js');
require('dotenv').config();
const index = require('../index');
const client = index.client;
module.exports = async (member) => {
    if (process.env.REMOVE_MEMBER == "true") {
        var mentionsmember = "<@" + member + ">"

        const leaveEmbed = new Discord.MessageEmbed()
            .setColor(3447003)
            .setTitle('Bye ' + member.user.username)
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(process.env.REMOVE_MEMBER_MSG.replace("{{user}}", member.user.tag).replace("{{usercount}}", member.guild.memberCount))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
        client.channels.cache.get(process.env.GUILD_WELCOME).send(leaveEmbed)
    }
};

module.exports.help = {
    event: 'guildMemberRemove',
};