const Discord = require('discord.js')
const manager = require('../Manager/manager.json')

exports.run = async(client, message, args) => {

    const aktif = new Discord.MessageEmbed()
    .setDescription('SUNUCU AKTİF YAZISI')
    .setImage(``)
    .setFooter(`${message.author.username} Tarafından Kullanıldı.`)
    .setTimestamp()
    .setColor('RANDOM')
    message.channel.send(aktif)
    message.channel.send(`@everyone`).then(x => x.delete({timeout: 1500}));


}

exports.conf = {enabled: true, guildOnly: true, aliases: ["aktif"]};
exports.help = {name: 'aktif'};