
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
if (!member) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`${message.author}, lütfen bir kullanıcı etiketle !`)).then(x => x.delete({timeout: 6500}));
  
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor("RED").setDescription(`${message.author}, lütfen mute atmam gereken kullanıcı belirt !`).then(x => x.delete({timeout: 6500}));
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
{
        return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`)).then(x => x.delete({timeout: 6500}));
} else {
let sebep = args[1]
if(!sebep) return message.channel.send(new MessageEmbed().setColor("RED").setDescription(`Lütfen Bir sebep belirtiniz.`)).then(x => x.delete({timeout: 6500})); 
  
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
message.react('✅')
client.channels.cache.get(MuteLog).send(new MessageEmbed().setTitle(`Bir Üye Metin Kanallarından Susturulması Kalktı.`).setColor("GREEN").setTimestamp().setDescription(`  \n\n Yetkili: ${message.author} (\`${message.author.id}\`) \n Kullanıcı: ${kullanici.user} (\`${kullanici.user.id}\`)\nTarih: \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\``));
mute.roles.remove(manager.Role.MuteRolID)
}}}}

exports.conf = {enabled: true, guildOnly: true, aliases: ["unmute"], permLevel: 0}

exports.help = {name: "unmute", help: "unmute @etiket <Sebep> Etiketlediğiniz kişinin mutesini kaldırır."};

