const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { success } = require('../../utils/emojis.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class SetMemberLogCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setlog',
      aliases: ['sl'],
      usage: 'setlog <channel mention/ID>',
      description: oneLine`
        Sets all log text channels for your server. 
        Provide no channel to clear the current \`log\` channel.
      `,
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setlog #logs']
    });
  }
  run(message, args) {
    const memberLogId = message.client.db.settings.selectMemberLogId.pluck().get(message.guild.id);
    const oldMemberLog = message.guild.channels.cache.get(memberLogId) || '`None`';
    const messageDeleteLogId = message.client.db.settings.selectMessageDeleteLogId.pluck().get(message.guild.id);
    const oldMessageDeleteLog = message.guild.channels.cache.get(messageDeleteLogId) || '`None`';
    const messageEditLogId = message.client.db.settings.selectMessageEditLogId.pluck().get(message.guild.id);
    const oldMessageEditLog = message.guild.channels.cache.get(messageEditLogId) || '`None`';
    const modLogId = message.client.db.settings.selectModLogId.pluck().get(message.guild.id);
    const oldModLog = message.guild.channels.cache.get(modLogId) || '`None`';
    const nicknameLogId = message.client.db.settings.selectNicknameLogId.pluck().get(message.guild.id);
    const oldNicknameLog = message.guild.channels.cache.get(nicknameLogId) || '`None`';
    const roleLogId = message.client.db.settings.selectRoleLogId.pluck().get(message.guild.id);
    const oldRoleLog = message.guild.channels.cache.get(roleLogId) || '`None`';
    const embed = new MessageEmbed()
      .setTitle('Settings: `Logging`')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`The \`log channel\` was successfully updated. ${success}`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    // Clear if no args provided
    if (args.length === 0) {-
      message.client.db.settings.updateMemberLogId.run(null, message.guild.id);
      message.client.db.settings.updateRoleLogId.run(null, message.guild.id);
      message.client.db.settings.updateMessageDeleteLogId.run(null, message.guild.id);
      message.client.db.settings.updateMessageEditLogId.run(null, message.guild.id);
      message.client.db.settings.updateModLogId.run(null, message.guild.id);
      message.client.db.settings.updateNicknameLogId.run(null, message.guild.id);
      return  message.channel.send(embed.addField('Member Log', `All log channels ➔ \`None\``)) 
    
}

    const log = this.getChannelFromMention(message, args[0]) || message.guild.channels.cache.get(args[0]);
    if (log.type != 'text' || !log.viewable) 
      return this.sendErrorMessage(message, 0, stripIndent`
        Please mention an accessible text channel or provide a valid text channel ID
      `);
    message.client.db.settings.updateMemberLogId.run(log.id, message.guild.id);
    message.client.db.settings.updateRoleLogId.run(log.id, message.guild.id);
    message.client.db.settings.updateMessageDeleteLogId.run(log.id, message.guild.id);
    message.client.db.settings.updateMessageEditLogId.run(log.id, message.guild.id);
    message.client.db.settings.updateModLogId.run(log.id, message.guild.id);
    message.client.db.settings.updateNicknameLogId.run(log.id, message.guild.id);
    message.channel.send(embed.addField('Member Log', `All log channels ➔ ${log}`))
  }
};
