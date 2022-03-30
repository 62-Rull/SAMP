const { Message, Client, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    aliases: ['hp'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let categories = [];
        readdirSync("./commands/").forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
              file.endsWith(".js")
            );

            const cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`);
      
                if (!file.name) return "No command name.";
      
                let name = file.name.replace(".js", "");
      
                return `\`${name}\``;
            });

            let data = new Object();

            data = {
            name: dir,
            value: cmds.length === 0 ? "In progress." : cmds.join(" "),
            };

            categories.push(data);
        })

        const embed = new MessageEmbed()
        .setTitle(`Commands list of ${client.user.username}`)
        .setDescription(`My prefix is \`\`${client.config.prefix}\`\`, example to use command \`\`${client.config.prefix}samp\`\``)
        .addFields(categories)

        message.channel.send({ embeds: [embed] })
    },
};
