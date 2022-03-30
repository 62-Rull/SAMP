const { Message, Client, MessageEmbed } = require("discord.js");
const register = require("../../model/register.js");

module.exports = {
    name: "setregister",
    aliases: ['sg'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        //Arguments
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        const tag = args.slice(2).join(" ");

        //Checking arguments
        if(!channel && !role && !tag) return message.channel.send(`**USAGE:** \`\`${client.config.prefix}setregister <channel> <role> <tag>\`\`\n**EXAMPLE:** \`\`${client.config.prefix}setregister #channel @role [MEM]\`\``)
        
        try {
            register.findOne({ Guild: message.guild.id }, async (err, data) => {
                if(data) data.delete();
                new register({
                    Guild: message.guild.id,
                    Channel: channel.id,
                    Role: role.id,
                    Tag: tag,
                }).save();
                //Chechking arguments tags
                if(tag === '') {
                    return message.channel.send(`Successful setup! channel to register in <#${channel.id}> and the role that will be added is a <@&${role.id}> without a tag`)
                  } else {
                   await message.channel.send(`Successful setup! channel to register in <#${channel.id}> and the role that will be added is a <@&${role.id}> with the tag \`\`${tag}\`\``)
                }
            })
        } catch (error) {
            const embed = new MessageEmbed()
            .setTitle(`Failed to execute command`)
            .setDescription(`\`\`\`javascript\n${error}\n\`\`\``)

            message.channel.send({ embeds: [embed] })
        }
    },
};
