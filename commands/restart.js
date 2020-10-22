const prefix= process.env.PREFIX;
const token = process.env.TOKEN;

module.exports = {
		name: 'restart',
		aliases: ['rs'],
		description: 'Create a poll (Use &p or &poll question without quotes \"option 1 or y/n for yes or no type question\" \"option 2 optional and so on\)"',
		guildOnly: true,
execute(message){

const Discord = require('discord.js');
message.delete();
resetBot(message.channel);

function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Restarting...')
    .then(msg => message.client.destroy())
    .then(() => message.client.login(token));

}
}
}