const {
    EmbedBuilder,
    PermissionsBitField
} = require("discord.js");

module.exports = {
    name: "automod",

    async execute(message, args) {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("❌ Missing Permission.");
        }

        const option = args[0]?.toLowerCase();

        if (!option) {
            return message.reply(
                "⚠️ Usage: !automod <on/off>"
            );
        }

        if (option === "on") {

            global.automodEnabled = true;

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription("✅ AutoMod enabled.");

            return message.reply({ embeds: [embed] });
        }

        if (option === "off") {

            global.automodEnabled = false;

            const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("✅ AutoMod disabled.");

            return message.reply({ embeds: [embed] });
        }

        return message.reply("❌ Invalid option.");
    }
};
