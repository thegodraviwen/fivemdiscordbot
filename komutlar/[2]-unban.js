const  Discord = require('discord.js')
const data = require('quick.db')
const manager = require('../Manager/manager.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
exports.run = async(client, message, args) => {
if(![manager.Authorized.BanYetkilisiID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${manager.Authorized.BanYetkilisiID}> rolüne ihtiyacın var.`).setColor("RED")).then(x => x.delete({timeout: 6500}));
let BanLog = manager.Logger.BanLogID


let kullanici = args[0]
let reason = args.slice(1).join(' ');
if(!kullanici) return message.reply("Banını kaldırmak istediğin kişiyi etiketle veya ıd yaz.")
if (reason.length < 1) return message.channel.send('**Lütfen Sebep Giriniz**');


const yasaklandı = new Discord.MessageEmbed()
.setTitle('Üyenin yasağı kaldırıldı.')
.setDescription(`
Yetkili: ${message.author} \`${message.author.id}\`
Kullanıcı: \`${kullanici}\`
Sebep: \`${reason}\``)
.setColor("GREEN")
.setTimestamp()
client.channels.cache.get(BanLog).send(yasaklandı)
message.guild.members.unban(kullanici)

}



exports.conf = {aliases: ["unban", "yasak-kaldır"], permLevel: 0} 
exports.help = {name: "yasak-aç", help: "ban ID <sebep> Belirterek banınını kaldırabilirsiniz."}
