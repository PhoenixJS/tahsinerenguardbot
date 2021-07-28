const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
 client.user.setStatus("idle");
var randomMesajlar = ["discord.gg/tahsineren","Tahsin Eren Tarafından Kodlandı","Gelişmiş Guard Botu"]
setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);}, 3 * 30000);
  
      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
client.login(process.env.TOKEN);


//-----------------------KOMUTLAR-----------------------\\
//Packages to install
const disbut = require("discord-buttons");
const disbutpages = require("discord-embeds-pages-buttons")
disbut(client);
//Main embed
client.on("message", async message=>{
if(message.author.bot || message.channel.type == "dm")return;
if(message.content == ".yardım"){
  //embed 1
  const embed1 = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setThumbnail(client.user.avatarURL())
  .setTitle("Tahsin Eren Guard Botu")
  .addField("Sayfa 1", ".ban\n.bansay\n.kick\n.bot-izin\n.capslock\n.emoji-ekle\n.antiraid")
  .setFooter(`${message.author.tag} istedi!`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
  //embed 2
  const embed2 = new Discord.MessageEmbed()
  .setColor("RED")
  .setThumbnail(client.user.avatarURL())
  .setTitle("Tahsin Eren Guard Botu")
  .addField("Sayfa 2", ".yavaşmod\n.sil\n.rol-koruma")
  .setFooter(`${message.author.tag} istedi!`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
  //embed 3
  const embed3 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setThumbnail(client.user.avatarURL())
  .setTitle("Tahsin Eren Guard Botu")
  .addField("Sayfa 3", "[Invite Bot!](https://google.com/)%22")
  .setFooter(`${message.author.tag} istedi!`, message.author.displayAvatarURL({dynamic: true, format: "png"}))
var pages = [embed1, embed2, embed3]

disbutpages.pages(client, message, pages, 100000, disbut, "grey", "⏩", "⏪", "❌")
  }
})
////yeni hesap ban//
client.on("guildMemberAdd", async member => {
let erenskullanici = client.users.cache.get(member.id)
  const erensyhesapkurulus = new Date().getTime()-erenskullanici.createdAt.getTime();
/*---------------------------*/
    if(erensyhesapkurulus < 1296000000) {
      member.send(`:warning: Hey Sen 2 Haftayı Aşmamış Yeni Hesap Sunucudan Banladın Bro :warning:`)
member.guild.members.cache.get(member.id).ban({reason: `yeni hesap olma`})
} else return;//2 haftadan kısa süre önce kurulmuş hesaba ban atar
 
member.guild.owner.send(`${moment.utc(erenskullanici .createdAt).format('DD/MM/YYYY')} tarihinde yeni kurulmuş ${member.user.tag} isimli bir hesabı banladım.`)
});
/////yeni hessp ban//
//-------------------- Caps Engel Sistemi --------------------//
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(`${msg.member}, Capslock Kapat Lütfen!`).then(nordx => nordx.delete({timeout: 5000}))
              
          }
        }
      }
    }
  }
});
//-------------------- Caps Engel Sistemi --------------------//

//////////////rolkoruma///////////////////
client.on("roleDelete", async role => {
  let rolko = await db.fetch(`rolk_${role.guild.id}`);
  if (rolko) { 
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: '**__:warning: Silinen Roller Tekrar Açıldı :warning:__**'})
  }
})

//

client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk) { 
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.delete()
  }
}) 
/////reklamengel//////////
//REKLAM ENGEL

client.on("message", msg => {
 const veri = db.fetch(`${msg.guild.id}.reklam`)
 if (veri) {
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg", "youtube.com"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.permissions.has("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('**__Yakaladım Seni! Reklam Yasak :warning:__**').then(nordx => nordx.delete({timeout: 5000}))                          
            
            }              
          } catch(err) {
            console.log(err);
          }
        }
 }
       if(!veri) return;
    });

//REKLAM ENGEL SON

////kanalkoruma////
client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})

//

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`)
  if (emojik) {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == emoji.guild.owner.id) return;
  if (!emoji.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {
    
  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);

  
  }
  }
});

//EVERYONE-HERE ENGEL

client.on("message", async msg => {
  
let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`)
 if (hereengelle == 'acik') {
   
      const here = ["@here", "@everyone"];
  if (here.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) {
      msg.delete()
       return msg.reply('**__Yakaladım Seni! :warning: Everyone ve Here Etiketlemek Yasak :x:__**').then(nordx => nordx.delete({timeout: 5000}))
        }
    }
 } else if (hereengelle == 'kapali') {
 
}
});
    
//EVERYONE-HERE ENGEL SON

