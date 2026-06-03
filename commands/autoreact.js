const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "autoreact.json");

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({}));
}

module.exports = {
    name: "autoreact",

    async execute(message, args) {

        if (!message.member.permissions.has("Administrator")) {
            return message.reply("❌ Missing Permission.");
        }

        const trigger = args[0]?.toLowerCase();
        const emoji = args[1];

        if (!trigger || !emoji) {
            return message.reply(
                "⚠️ Usage: !autoreact <text> <emoji>"
            );
        }

        const data = JSON.parse(fs.readFileSync(dataPath));

        data[message.guild.id] ??= {};
        data[message.guild.id][trigger] = emoji;

        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        message.reply(
            `✅ AutoReact set: \`${trigger}\` → ${emoji}`
        );
    }
};
