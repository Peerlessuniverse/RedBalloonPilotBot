import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";
import { messages } from "./messages.js";
import { getPriceData } from "./priceFeed.js";

// Load environment variables
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const PAIR_URL = process.env.DEXSCREENER_PAIR_URL;

if (!BOT_TOKEN) {
    console.error("❌ No Telegram Bot Token found.");
    process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// --- Command Handlers ---
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.start, { parse_mode: "Markdown" });
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.help, { parse_mode: "Markdown" });
});

bot.onText(/\/lore/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.lore, { parse_mode: "Markdown" });
});

bot.onText(/\/supply/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.supply, { parse_mode: "Markdown" });
});

bot.onText(/\/burn/, (msg) => {
    bot.sendMessage(msg.chat.id, messages.burn, { parse_mode: "Markdown" });
});

// --- Price command ---
bot.onText(/\/chart/, async (msg) => {
    if (!PAIR_URL) {
        return bot.sendMessage(msg.chat.id, "The window to the market is not set.");
    }

    const data = await getPriceData(PAIR_URL);

    if (!data) {
        return bot.sendMessage(msg.chat.id, "The winds obscure the chart. Try again later.");
    }

    const { priceUsd, liquidityUsd, fdv } = data;

    const text = `
📈 *The Window to the Market*

Price: $${priceUsd}
Liquidity: $${liquidityUsd}
FDV: $${fdv}

Chart:
${PAIR_URL}

All markets are storms.
Hold your rope tightly.
`;

    bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
});

// --- Broadcast (Developer Only) ---
bot.onText(/\/broadcast (.+)/, async (msg, match) => {
    if (!CHANNEL_ID) {
        return bot.sendMessage(msg.chat.id, "No channel linked to the winds.");
    }

    const text = match[1];

    await bot.sendMessage(CHANNEL_ID, `📢 *Message from the Pilot*\n\n${text}`, {
        parse_mode: "Markdown"
    });

    bot.sendMessage(msg.chat.id, messages.broadcastConfirmation, { parse_mode: "Markdown" });
});

console.log("🎈 RedBalloonPilotBot ascends into the sky...");
