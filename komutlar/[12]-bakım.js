const Discord = require('discord.js')
const manager = require('../Manager/manager.json')

exports.run = async(client, message, args) => {



const bakım = new Discord.MessageEmbed()
.setDescription('SUNUCU BAKIM YAZISI')
.setImage(``)
.setFooter(`${message.author.username} Tarafından Kullanıldı.`)
.setTimestamp()
.setColor('RANDOM')
 message.channel.send(bakım)
 message.channel.send(`@everyone`).then(x => x.delete({timeout: 1500}));


}
exports.conf = {enabled: true, guildOnly: true, aliases: ["bakım"]};
exports.help = {name: 'bakım'};