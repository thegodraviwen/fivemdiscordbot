const Discord = require('discord.js')

exports.run = async(client, message, args) => {

    const ip = new Discord.MessageEmbed()
    .setDescription(' Sunucu IP Adresi : XX.XX.XX.XX \n Sunucu TS3 IP : XX.XX.XX.XX')
    .setImage(``)
    .setFooter(`${message.author.username} Tarafından Kullanıldı.`)
    .setTimestamp()
    .setColor('RANDOM')
    message.channel.send(ip).then(x => x.delete({timeout: 5000}));

}

exports.conf = {enabled: true, guildOnly: true, aliases: ["ip","ıp"]};
exports.help = {name: 'ts3'};