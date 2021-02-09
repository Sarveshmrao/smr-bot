module.exports = {
  name: 'poll',
  aliases: ['p'],
  description: 'Create a poll',
  usage: '<question without quotes> <option 1 or y/n for yes or no with double quotes> (option 2 with quotes) and so on.',
  guildOnly: true,
  args: true,
  eligible: 1,
  execute(message) {
    const options = [
      '🇦',
      '🇧',
      '🇨',
      '🇩',
      '🇪',
      '🇫',
      '🇬',
      '🇭',
      '🇮',
      '🇯',
      '🇰',
      '🇱',
      '🇲',
      '🇳',
      '🇴',
      '🇵',
      '🇶',
      '🇷',
      '🇸',
      '🇹',
      '🇺',
      '🇻',
      '🇼',
      '🇽',
      '🇾',
      '🇿',
    ];

    const Discord = require('discord.js');

    const args = message.content.trim().split(/ +/g);

    // Defining the question...
    let question = [];

    for (let i = 1; i < args.length; i++) {
      if (args[i].startsWith('"')) break;
      else question.push(args[i]);
    }
    question = question.join(' ');

    const choices = [];

    const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;


    let match;


    if (args.length == 1) { // yes no unsure question
      const question = args[0];
      pollLog[message.author.id] = {
        lastPoll: Date.now()
      };
      return message
        .channel
        .send(`${message.author} asks: ${question}`)
        .then(async (pollMessage) => {
          await pollMessage.react('👍');
          await pollMessage.react('👎');
        });
    } else {

      // Defining the choices...
      const choices = [];

      const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;


      let match;
      while (match = regex.exec(args.join(' '))) choices.push(match[2]);

      // Creating and sending embed...
      let content = [];

      //First checking for number of choices
      if (choices.length > 20) {
        message.delete();
        return message.reply("20 options are only permitted per poll!");
      }

      for (let i = 0; i < choices.length; i++) content.push(`${options[i]} ${choices[i]}`);
      content = content.join('\n');
      let i = 0;
      if (choices[i] == "y/n") {
        content = "";
      }
      var embed = new Discord.MessageEmbed()
        .setColor('#8CD7FF')
        .setTitle(`**${question}**`)
        .setURL(process.env.URL)
        .setColor(0x4286f4)
        .setDescription(content);

      message.channel.send(`:bar_chart: ${message.author} started a poll.`, embed)
        .then(async m => {
          let i = 0;
          if (choices[i] == "y/n") {
            await m.react('👍');
            await m.react('👎');
          } else {
            for (let i = 0; i < choices.length; i++) await m.react(options[i]);
          }
        });
    }
    message.delete();
  }
}