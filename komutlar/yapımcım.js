const  Discord = require("discord.js"); 
const { MessageButton } = require('discord-buttons');
exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(':book:  Yapımcım  :book:')
  .setDescription(`
 :writing_hand: Yapımcım : <@808799171762454530>
 (Hata Çıkarsa Destek Sunucumuza Gelerek Bana Sorularınızı Sorabilirsiniz)
  `)
  let buton = new MessageButton()
  .setStyle('green')
  .setLabel('Destek Sunucum') 
  .setID('Destek Sunucum')
  .setURL("")
  .setFooter(`${message.author.tag} istedi!`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
  
message.channel.send({embed: embed , buttons: [
  buton
]});}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım'
};