
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const manager = require('../Manager/manager.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
if(![manager.Authorized.MuteYetkilisiID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${manager.Authorized.MuteYetkilisiID}> rolüne ihtiyacın var.`).setColor("RED")).then(x => x.delete({timeout: 6500}));
let MuteLog = manager.Logger.MuteLogID


let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`${message.author}, lütfen bir kullanıcı etiketle !`));
          
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor("RED").setDescription(`${message.author}, lütfen mute atmam gereken kullanıcı belirt !`).then(x => x.delete({timeout: 6500}));;
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
              {
return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`)).then(x => x.delete({timeout: 6500}));;
} else {
let zaman = args[1]   
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
if (!zaman) { message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Lütfen Bir zaman dilimi belirtin.`)).then(x => x.delete({timeout: 6500}));;
} else {
let sebep = args[2]
if(!sebep) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Lütfen Bir sebep belirtiniz.`)).then(x => x.delete({timeout: 6500}));  
                

let timereplace = args[1];
let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2
let atılmaay = moment(Date.now()).format("MM")
let atılmagün = moment(Date.now()).format("DD")
let atılmasaat = moment(Date.now()).format("HH:mm:ss")
let bitişay = moment(tarih3).format("MM")
let bitişgün = moment(tarih3).format("DD")
let bitişsaat = moment(tarih3).format("HH:mm:ss")
let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
moment.locale("tr")

let zamandilimi = zaman
.replace("m", " Dakika")
.replace("s", " Saniye")
.replace("h", " saat")
.replace("d", " Gün");
                  
let tumaylar = {
"01": "Ocak",  
"02": "Şubat", 
"03": "Mart",  
"04": "Nisan",  
"05": "Mayıs", 
"06": "Haziran", 
"07": "Temmuz",
"08": "Ağustos", 
"09": "Eylül", 
"10": "Ekim", 
"11": "Kasım", 
"12": "Aralık", 
}
let aylar = tumaylar; 
               {
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == member.id)) {
kdb.add(`kullanici.${message.author.id}.mute`, 1);
data.add('case', 1)
const numara = await data.fetch('case')
moment.locale("tr");
kdb.push(`kullanici.${member.id}.sicil`, {
Yetkili: message.author.id,
Sebep: sebep,
Ceza: "MUTE",
Süre: zamandilimi,
Tarih: muteatılma, 
});
};
                 
data.set(`muteli_${member.guild.id + member.id}`, 'muteli')
data.set(`süre_${member.id + member.guild.id}`, zamandilimi)

message.react('✅')
client.channels.cache.get(MuteLog).send(
new MessageEmbed()
.setTitle(`Bir Üye Metin Kanallarından Engellendi !`)
.setColor("RANDOM")
.setTimestamp()
.setDescription(`
Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
Kullanıcı: <@${member.id}> (\`${member.id}\`)
Süre: \`${time}\`
Sebep: \`${sebep}\`
Mute Atılma Saati: \`${muteatılma}\`
Mute Bitiş Saati: \`${mutebitiş}\``))
mute.roles.add(manager.Role.MuteRolID)
} 
setTimeout(async function() {
mute.roles.remove(manager.Role.MuteRolID)
client.channels.cache.get(MuteLog).send(
new MessageEmbed()
.setTitle(`Bir Üye Metin Kanallarından Susturulması Kalktı.`)
.setColor("GREEN")
.setTimestamp()
.setDescription(`
Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
Kullanıcı: <@${member.id}> (\`${member.id}\`)
Süre: \`${time}\`
Mute Atılma Saati: \`${muteatılma}\`
Mute Bitiş Saati: \`${mutebitiş}\`
Tarih: \`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).add(10,"hours").format("YYYY HH:mm:ss")}\``)
);
}, ms(zaman));
        
}}}
 
  
};
exports.conf = {enabled: true, guildOnly: true, aliases: ["mute"], permLevel: 0}
  
exports.help = {name: "mute", help: "mute @etiket <süre> <sebep> Etiketlediğiniz kişiyi yazılı kanallarda susturursunuz."};
  
  