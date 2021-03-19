
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const manager = require('../Manager/manager.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
if(![manager.Authorized.VMuteYetkilisiID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${manager.Authorized.VMuteYetkilisiID}> rolüne ihtiyacın var. `).setColor("RED")).then(x => x.delete({timeout: 6500}));
let VMuteLog = manager.Logger.VMuteLogID

let kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, bir kullanıcı etiketle.`).setTimestamp()).then(x => x.delete({timeout: 6500}));
if (!args[1]) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Lütfen Bir zaman dilimi belirtin.`)).then(x => x.delete({timeout: 6500}));;
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setColor('RED').setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan mute atılamaz.`).setColor("RED")
.setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan mute atılamaz.`).setColor("RED")
.setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan mute atılamaz.`).setColor("RED")
.setTimestamp()).then(x => x.delete({timeout: 6500}));
let muteler = jdb.get(`voicemute`) || [];
let sure = args[1];
let sebep = args.splice(2).join(" ");
if(!sure) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir zaman belirtmelisin.`).setColor("RED")
.setTimestamp()).then(x => x.delete({timeout: 6500}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setColor("RED")
.setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.voice.channel) kullanici.voice.setMute(true).catch();

let timereplace = args[1];
let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
let reason;
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2
let atılmaay = moment(Date.now()).format("MM")
let atılmagün = moment(Date.now()).format("DD")
let atılmasaat = moment(Date.now()).format("HH:mm:ss")
let bitişay = moment(tarih3).format("MM")
let bitişgün = moment(tarih3).format("DD")
let bitişsaat = moment(tarih3).format("HH:mm:ss")
let voiceatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
let voicebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
moment.locale("tr")

let aylartoplam = {
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
"12": "Aralık"};
let aylar = aylartoplam;

let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");
//
var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");    
data.set(`seslide2.${kullanici.user.id}.${message.guild.id}`, vakit)
if (!muteler.some(j => j.id == kullanici.id)) {
kdb.add(`kullanici.${message.author.id}.vmute`, 1);
moment.locale("tr");
kdb.push(`kullanici.${kullanici.id}.sicil`, {
Yetkili: message.author.id,
Sebep: sebep,
Ceza: "VMUTE",
Süre: sure,
Tarih: voiceatılma,
});

client.channels.cache.get(VMuteLog).send(
    new MessageEmbed()
.setTitle(`Bir Üye Sesli Kanallarından Engellendi !`)
.setColor("RANDOM")
.setTimestamp()
.setDescription(`
Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
Kullanıcı: <@${kullanici.id}> (\`${kullanici.id}\`)
Süre: \`${time}\`
Sebep: \`${sebep}\`
Mute Atılma Saati: \`${voiceatılma}\`
Mute Bitiş Saati: \`${voicebitiş}\``))
setTimeout(async function() {
kullanici.voice.setMute(false);  
client.channels.cache.get(VMuteLog).send(new MessageEmbed()
.setTitle(`Bir Üye Sesli Kanallarından Susturulması Kalktı.`)
.setColor("GREEN")
.setTimestamp()
.setDescription(`
Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
Kullanıcı: <@${kullanici.id}> (\`${kullanici.id}\`)
Süre: \`${time}\`
Mute Atılma Saati: \`${voiceatılma}\`
Mute Bitiş Saati: \`${voicebitiş}\`
`));}, ms(zaman1));}
           
}; 
exports.conf = {enabled: true, guildOnly: true, aliases: ["vmute", "seslisustur"], permLevel: 0,}

exports.help = {name: "vmute", help: "vmute @etiket <süre> <sebep> Etiketlediğiniz kişiyi sesli kanallarda susturursunuz."};

