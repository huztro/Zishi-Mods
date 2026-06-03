const {
    Client,
    GatewayIntentBits,
    ActivityType,
    Collection
} = require('discord.js');

const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const PREFIX = "!";
client.commands = new Collection();

// Load Commands
const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        console.log(`✓ Loaded ${command.name}`);
    }
}

// Ready Event
client.once('ready', () => {
    console.log(`${client.user.tag} is online!`);

    const statuses = [
        "Made By @ItzHuztro",
        "Ensuring Uptime Stability",
        "Executing System Diagnostics",
        "/help | For Support"
    ];

    let i = 0;

    setInterval(() => {
        client.user.setActivity(statuses[i], {
            type: ActivityType.Watching
        });

        i++;
        if (i >= statuses.length) i = 0;
    }, 10000);
});

// Prefix Commands
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        command.execute(message, args, client);
    } catch (err) {
        console.error(err);
        message.reply('❌ An error occurred.');
    }
});

client.login(process.env.TOKEN || "YOUR_BOT_TOKEN");
