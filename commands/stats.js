const Discord = require("discord.js");
var osu = require('node-os-utils')
var cpu = osu.cpu
var drive = osu.drive
var mem = osu.mem
var netstat = osu.netstat

module.exports = {
            name: 'stats',
            aliases: ["s"],
            group: 'moderation',
            description: 'Just a kick command If it replies nothing then you do not have enough permission to kick that person',
            guildOnly: true,
    execute(message) {
var count = cpu.count()
cpu.usage()
  .then(cpuPercentage => {
var cpupercen = cpuPercentage;
  })
console.log("Test1")
mem.info()
  .then(minfo => {


  })
var meminfo = mem.info();
console.log("Test2")
var meminfo = osu.mem

netstat.stats()
  .then(ninfo => {

  })
console.log("Test3")
var cpuPercentage = cpu.usage()
cpu.usage()
  .then(cpuPercentage => {
    console.log(cpuPercentage) // 10.38
  })
console.log("Test4")
let totalSeconds = (message.client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
let uptime = `${days} day(s), ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;

  let systemEmbed = new Discord.MessageEmbed()
  .setColor('#8CD7FF')
  .setTitle("TechCrawler Bot System Stats")
  .addField("Servers", message.client.guilds.cache.size, true)
  .addField("Users", message.client.users.cache.size, true)
  .addField("Uptime", uptime, true)

  message.channel.send(systemEmbed)
message.channel.send(cpu.usage())

}}