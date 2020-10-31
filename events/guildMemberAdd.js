
  var mentionsmember = "<@" + member + ">"
  client.channels.cache.get(process.env.GUILD_WELCOME).send({
    embed: {
      color: 3447003,
      title: process.env.BOT_NAME,
      url: process.env.URL,
      description: ":wave: Welcome *" + mentionsmember + "* to the" + process.env.NAME + "!. \nCurrently our server has " + member.guild.memberCount + " awesome members!",
      thumbnail: client.user.avatarURL,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© " + process.env.BOT_NAME + " | " + process.env.AUTHOR_NAME
      }
    }
  })