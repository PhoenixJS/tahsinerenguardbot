const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`**:warning: Bu Komutu Kullana Bilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısın! :warning:**`)
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if(args[0] === 'aç') {
    db.set(`capslock_${message.guild.id}`, true)
    message.channel.send(`**Capslock Engel Sistemi Aktif! :white_check_mark: **`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`capslock_${message.guild.id}`)
message.channel.send(`**Capslock Engel Sistemi Deaktif! :x:**`)
return
}
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0
};
exports.help = {
  name: 'capslock',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-engelleme'
};