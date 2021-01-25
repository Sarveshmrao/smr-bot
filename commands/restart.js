const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

module.exports = {
    name: 'restart',
    aliases: ['rs'],
    description: 'Restarts the bot!',
    guildOnly: true,
    eligible: 5,
    execute(message) {

        const Discord = require('discord.js');
        message.delete();
        resetBot(message.channel);

        function resetBot(channel) {
            // send channel a message that you're resetting bot [optional]
            channel.send('Restarting...')
                .then(msg => message.client.destroy())
                .then(process.exit(0))
                .then(() => message.client.login(token));

        }
    }
}