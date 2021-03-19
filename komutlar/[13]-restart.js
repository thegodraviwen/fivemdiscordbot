const Discord = require('discord.js')

exports.run = async(client, message, args) => {


    const restart = new Discord.MessageEmbed()
    .setDescription('SUNUCU AKTİF YAZISI')
    .setImage(``)
    .setFooter(`${message.author.username} Tarafından Kullanıldı.`)
    .setTimestamp()
    .setColor('RANDOM')
    message.channel.send(restart)
    message.channel.send(`@everyone`).then(x => x.delete({timeout: 1500}));


}

exports.conf = {enabled: true, guildOnly: true, aliases: ["restart"]};
exports.help = {name: 'restart'};