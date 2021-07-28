const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  if (db.has(`antiraidK_${message.guild.id}`) === false) {
    return message.channel.send(
      ":x: Antiraid açılmamış :x:\n :warning Açmak için **${p}anti-raid aç wa**"
    );
  }
  if (!args[1]) return message.reply("**:x: Lütfen Bir Bot İdsi Belitriniz :x:**");

  if (isNaN(args[1])) {
    return message.reply("**:warning: Sadece ID :warning:**");
  }
  if (args[0] == "ver") {
    client.users.cache.get(args[0]);
    db.set(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.reply(args[1] + "ID li bota izin verildi");
  }
  if (args[0] == "kaldır") {
    db.delete(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.reply(args[1] + " ID li botun izni kaldırıldı");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "bot-izin"
};
