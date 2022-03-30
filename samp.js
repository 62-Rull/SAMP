const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "samp",
    aliases: ['samp-list'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(`**USAGE:** \`\` ${client.config.prefix}samp <ip:port>\`\`\n**EXAMPLE:** ${client.config.prefix}samp 127.0.0.1:7777\`\``);

        const split = args.join(" ").split(":");
        const ip = split[0];
        const port = split[1];
  
        const json = await fetch(`http://anabellebot.online/API/sampquery?ip=${ip}&port=${port}`).then(r => r.json())
        if (json.response === "Something Went Wrong Please Check ip And port correcly or Please Try Again Later") return message.channel.send(`Can't connect to \`\`${split[0]}:${split[1]}\`\``)
  
        if (json.response.isPlayersIngame > 10) return;
          
        const embed = new MessageEmbed()
        .setTitle(`${json.response.hostname}`)
        .setThumbnail("https://media.discordapp.net/attachments/899281914500878346/900969660873334805/samp-logo-png-6.png")
        .addField("Gamemode", `\`\`\`${json.response.gamemode}\`\`\``)
        .addField("Server Ip And Port" , `\`\`\`${json.response.serverip}\`\`\``)
        .addField("Language", `\`\`\`${json.response.language}\`\`\``)
        .addField("Players Info", `\`\`\`${json.response.maxplayers}/${json.response.isPlayerOnline}\`\`\``)
        .addField("Map Name", `\`\`\`${json.response.rule.mapname}\`\`\``)
        .addField("Version", `\`\`\`${json.response.rule.version}\`\`\``)
        .addField("Website", `\`\`\`${json.response.rule.weburl}\`\`\``)
        .addField(`${json.response.isPlayerOnline} • Players Online`, `\`\`\`[ID] | Name | Score | Ping |\n${json.response.isPlayersIngame || "Too Many Players!"}\`\`\``)
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    },
};
