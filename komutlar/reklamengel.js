const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client ,message, args) =>{
  if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`:warning: Bu Komutu Kullana Bilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısın! :warning:`)
if(args[0] === 'aç') {
    db.set(`${message.guild.id}.reklam`, true)
    message.channel.send(`Reklam Engel Başarılı Bir Şekilde Akif Edildi :warning:`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`${message.guild.id}.reklam`)
message.channel.send(`Reklam Engel Başarılı Bir Şekilde Kapatıldı :x:`)
return
}
  message.channel.send('**Lütfen aç veya kapat yazın :warning: **Örnek Kullanım:** .reklam-engel aç/kapat**')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['reklamengel'], 
 permLevel: 0
};

exports.help = {
 name: 'reklam-engel',
 description: 'reklamı engeller.',
 usage: 'reklamengel'
};