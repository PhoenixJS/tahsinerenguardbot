const Discord = require('discord.js');
const data = require('croxydb');

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(nn.setImage('https://media.giphy.com/media/Y41ynggo39awUmeg70/giphy.gif').setTitle(`:hata: Bir hata oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setColor("BLACK").setDescription(`**•** \`!küfür-engel aç / kapat\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`)).then(a => a.delete({timeout: 10000}));

if(!args[0]) return message.channel.send(nn.setColor('RANDOM').setTitle(':x: Bir hata oldu!').setDescription(`Küfür kısıtmak istersen **.küfür-engel aç** yazmalısın.`).setColor("RANDOM"))
if(args[0] === 'aç') {
data.set(`küfürs.${message.guild.id}`, true);
return message.channel.send(nn.setTitle(`<:basari:847090248596586516> İşte bu kadar!`).setDescription('Küfür kısıtlaması başarıyla açıldı.').setColor("BLACK")).then(a => a.delete({timeout: 10000}));
let kufur = data.fetch(`küfürs.${message.guild.id}`);
 if(kufur)return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle(':x: Bir hata oldu!').setDescription(`Bu sunucuda zaten küfür koruması açık.`).setColor("RED")).then(a => a.delete({timeout: 10000}));
} else if(args[0] === 'kapat') {
data.delete(`küfürs.${message.guild.id}`);
return message.channel.send(nn.setTitle(':tik: İşte bu kadar!').setDescription('Küfür kısıtlaması başarıyla kapatıldı.').setColor("RANDOM")).then(a => a.delete({timeout: 10000}));
}
}

exports.config = {
  name: "küfür",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["küfür-engel"],  //komutu farklı isimde çalıştırmak için 
};