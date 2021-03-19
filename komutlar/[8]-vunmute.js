
const { MessageEmbed, Discord } = require("discord.js");
const data = require("quick.db");
const manager = require('../Manager/manager.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
module.exports.run = async (client, message, args) => {
if(![manager.Authorized.VMuteYetkilisiID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${manager.Authorized.VMuteYetkilisiID}> rolüne ihtiyacın var. `).setColor("RED")).then(x => x.delete({timeout: 6500}));
let VMuteLog = manager.Logger.VMuteLogID

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

let kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, bir kullanıcı etiketle.`).setColor("RED").setTimestamp()).then(x => x.delete({timeout: 6500}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setColor("RED").setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini sunucudan mute atılamaz.`).setColor("RED").setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botu sunucudan mute atılamaz.`).setColor("RED").setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini sunucudan mute atılamaz.`).setColor("RED").setTimestamp()).then(x => x.delete({timeout: 6500}));
let muteler = jdb.get(`voicemute`) || [];
let sebep = args.splice(1).join(" ");
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin.`).setColor("RED").setTimestamp()).then(x => x.delete({timeout: 6500}));

message.react('✅')
client.channels.cache.get(VMuteLog).send(new MessageEmbed().setTitle(`Bir Üye Sesli Kanallarından Susturulması Kalktı.`).setColor("GREEN").setTimestamp().setDescription(` \n\n Yetkili: ${message.author} (\`${message.author.id}\`) \n Kullanıcı: ${kullanici.user} (\`${kullanici.user.id}\`) `))
kullanici.voice.setMute(false);  

}
exports.conf = {enabled: true, guildOnly: true, aliases: ["vmute", "sesli-sustur-kaldır"], permLevel: 0,}

exports.help = {name: "unvmute", help: "unvmute @etiket <Sebep> Etiketlediğiniz kişinin mutesini kaldırır."};
