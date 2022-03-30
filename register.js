const { Message, Client, MessageEmbed } = require("discord.js");
const register = require("../../model/register.js");

module.exports = {
    name: "register",
    aliases: ['rg'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        //Arguments of nickname changed
        const nickname = args.join(" ");

        //Checking arguments
        if(!nickname) return message.channel.send(`**USAGE:** \`\`${client.config.prefix}register <nickname>\`\`\n**EXAMPLE:** \`\`${client.config.prefix}register Firstname_Lastname\`\``)

        //Getting model
        const data = await register.findOne({ Guild: message.guild.id });

        //Checking setup
        if(!data) return message.channel.send(`This feature has not been added on the server! type \`\`${client.config.prefix}setregister\`\``)

        //Checking use command only channel settins
        if(message.channel.id != `${data.Channel}`) return message.channel.send(`You can only use this command in <#${data.Channel}>`)

        //Checking admin roles
        if (message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`You cannot use this command, because you are part of the administrator`)

        //Checking length of nickname
        const nick = `${data.Tag} ` + nickname;
        if(nick.length > 32) return message.channel.send(`Nickname is too long, please provide a shorter one`)

        //Try to add role and change nickname user commands
        try {
            message.member.roles.add(data.Role);
            message.member.setNickname(nick);
            message.channel.send(`Successfully registered! your name has been changed and you get a role to access other channels`)
        } catch (error) {
            const embed = new MessageEmbed()
            .setTitle(`Failed to execute command`)
            .setDescription(`\`\`\`javascript\n${error}\n\`\`\``)

            message.channel.send({ embeds: [embed] })
        }
    },
};
