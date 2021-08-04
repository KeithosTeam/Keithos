const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class docs extends Command {
    constructor(client) {
      super(client, {
        name: 'docs',
        aliases: ['documentation',],
        usage: 'website',
        description: 'Gives you Keithos Official website link',
        type: client.types.INFO
      });
    }
    run(message) {
      const embed = new MessageEmbed()
        .setTitle('Official Documentation Link')
        .setThumbnail('https://raw.githubusercontent.com/MCorange99/keithos/blob/main/data/images/Calypso.png')
        .setDescription(oneLine`
          Click [here](http://docs.mcorange.tk) to to visit my Official documentation website!
        `)
        .addField('Other Links',
          '**[Invite Me](https://discord.com/oauth2/authorize?client_id=837371090783174696&permissions=261993005047&scope=bot%20applications.commands) | ' +
          '[Support Server](https://discord.gg/M7nDZxKk24) | ' + 
          '[Repository](https://github.com/KeithosTeam/Keithos)**'
        )
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
  };
  