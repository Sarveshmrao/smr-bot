module.exports = {
	name: 'beep',
	description: 'Beep!',
	eligible: 1,
	execute(message) {
		message.channel.send('Boop.');
	},
};