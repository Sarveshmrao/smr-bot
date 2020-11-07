const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
            name: 'info',
            aliases: ["i"],
	description: "Get your rank on the server.",
  eligible: 5,
    execute(message) {
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
        let userInfo = db[message.author.id];
        let embed = new Discord.MessageEmbed()
	.setTitle('TechCrawler Bot!')
	.setURL('https://discord.gg/n7TmN6t')
	.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setColor(0x4286f4)
	.addField("UserName", message.author.username)
	.addField("User ID", message.author.id)
        .addField("Level", userInfo.level)
        .addField("XP", userInfo.xp+"/100")
	.setTimestamp()
	.setFooter('© TechCrawler Bot 2020 | By Sarvesh M Rao', 'https://cdn.discordapp.com/avatars/755410424480006287/83543921dc0be8bd22f79787b6f0534e.webp');
        return message.channel.send(embed)
}}
