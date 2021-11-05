const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

const afkTag = '[AFK]'

module.exports = class AFKNicknameCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'afk',
      usage: 'afk',
      description: 'Adds a [AFK] tag to your nick name.',
      type: client.types.MISC,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_NICKNAMES'],
      userPermissions: ['CHANGE_NICKNAME'],
      examples: ['afk']
    });
  }
  async run(message, args) {

    const oldNickname = message.member.nickname || message.member.displayName;

    let nicknameStatus;

    let nickname;

    if(!oldNickname.indexOf(afkTag)) {

      nickname = oldNickname.split(afkTag).splice(-1).toString();
      nicknameStatus = `${oldNickname} ➔ ${nickname}`;
    } else {

      nickname = afkTag + oldNickname
      nicknameStatus = `${oldNickname} ➔ ${nickname}`;
    }
    
    if (oldNickname.length > 27) {
      return this.sendErrorMessage(message, 0, 'Your nickname is longer than 27 characters. Please change your nickname to be shorter.');
    } else if (message.member === message.guild.owner) {
      return this.sendErrorMessage(message, 1, 'Unable to change the nickname of server owner');
    } else {
      try {

        // Change nickname
        await message.member.setNickname(nickname);
        const embed = new MessageEmbed()
          .setTitle('Change AFK status.')
          .setDescription(`${message.member}'s AFK status was successfully updated.`)
          .addField('Member', message.member, true)
          .addField('Nickname', nicknameStatus, true)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);

      } catch (err) {
        message.client.logger.error(err.stack);
        this.sendErrorMessage(message, 1, 'Please check the role hierarchy', err.message);
      }
    }  
  }
};