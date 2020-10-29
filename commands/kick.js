module.exports = {
            name: 'kick',
            aliases: ["k"],
            group: 'moderation',
            memberName: 'kick',
            description: 'Just a kick command If it replies nothing then you do not have enough permission to kick that person',
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            guildOnly: true,
            eligible: 2,

    execute(message) {
        if (message.author.bot) return;
if (!message.mentions.users.size) {
	return message.reply('you need to tag a user in order to kick them!');
}
try { 
       var member = message.mentions.members.first();
        var author = message.author;
  member
	.kick('Kicked by <@' + author + '>.')
	.then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        
        })

} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \n\`${error.message}\``);
		}


}}