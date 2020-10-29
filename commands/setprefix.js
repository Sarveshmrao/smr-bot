const Keyv = require('keyv');
const mysqldetails = "mysql://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME;
const prefixes = new Keyv('sqlite://db/prefix.sqlite');
const globalPrefix = process.env.PREFIX;


module.exports = {
            name: 'setprefix',
            aliases: ["setpre"],
            description: 'Just a kick command If it replies nothing then you do not have enough permission to kick that person',
            eligible: 3,


    execute(message) {
      prefixes.set(message.guild.id, args[0]);
		return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
    return message.channel.send(`Prefix is \`${prefixes.get(message.guild.id) || globalPrefix}\``);

    }};