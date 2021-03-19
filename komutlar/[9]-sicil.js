const { MessageEmbed } = require('discord.js')
const manager = require('../Manager/manager.json')
const data = require('quick.db')
const moment = require('moment')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
exports.run = async(client, message, args) => {
if(![manager.Authorized.BanYetkilisiID,manager.Authorized.JailYetkilisiID,manager.Authorized.MuteYetkilisiID,manager.Authorized.VMuteYetkilisiID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için Yetkili rolüne ihtiyacın var.`).setColor("RED")).then(x => x.delete({timeout: 6500}));
let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if (!kullanici) return message.channel.send('\`Bir üye belirtmen veya bir id girmen gerekiyor.\`').then(x => x.delete({timeout: 10000}));
let uye = message.guild.member(kullanici);
let sicil = kdb.get(`kullanici.${uye.id}.sicil`) || [];
moment.locale("tr");
sicil = sicil.reverse();
let sicilPanel = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` [**${value.Ceza}**] \`${value.Tarih}\` tarihinde **${value.Sebep}** sebebinden dolayı \`${value.Süre}\` süresince ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} \`cezalandırıldı.\` `).join("\n\n") : "Bu Kullanıcının Sicili Temiz!";
message.react('✅')
message.channel.send(new MessageEmbed()
.setColor("RED")
.setDescription(`**<@!${uye.id}> İsimli Kullanıcının Sicili** \n\n ${sicilPanel}`))
};

exports.conf = {enabled: true, guildOnly: true, aliases: ["sicil","geçmiş"]};
exports.help = {name: 'sicil', help: "sicil @etiket Kişinin eski yediği cezaları gösterir."};