// src/index.js
import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
import {
  welcomeMessage,
  helpMessage,
  tokenomicsMessage,
  burnScheduleMessage,
  supplyMessage,
  loreMessage,
  priceBroadcastMessage,
  burnReminderMessage
} from './messages.js';
import {
  BURN_SCHEDULE,
  PRICE_BROADCAST_CRON,
  DAILY_LORE_CRON
} from './config.js';
import { fetchPriceInfo } from './priceFeed.js';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN not set. Check your .env / Railway variables.');
  process.exit(1);
}

if (!CHANNEL_ID) {
  console.warn('⚠️ TELEGRAM_CHANNEL_ID not set. Channel broadcasts will be disabled.');
}

// polling cocok untuk Railway: 1 service Node.js yang hidup terus.
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🎈 RedBalloonPilotBot is running...');

// ========= BASIC COMMANDS =========

bot.onText(/^\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, welcomeMessage(), { parse_mode: 'Markdown' });
});

bot.onText(/^\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, helpMessage(), { parse_mode: 'Markdown' });
});

bot.onText(/^\/tokenomics/, (msg) => {
  bot.sendMessage(msg.chat.id, tokenomicsMessage(), { parse_mode: 'Markdown' });
});

bot.onText(/^\/burnschedule/, (msg) => {
  bot.sendMessage(msg.chat.id, burnScheduleMessage(), { parse_mode: 'Markdown' });
});

bot.onText(/^\/supply/, (msg) => {
  bot.sendMessage(msg.chat.id, supplyMessage(), { parse_mode: 'Markdown' });
});

bot.onText(/^\/lore/, (msg) => {
  bot.sendMessage(msg.chat.id, loreMessage(), { parse_mode: 'Markdown' });
});

bot.onText(/^\/price/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const info = await fetchPriceInfo();
    await bot.sendMessage(chatId, priceBroadcastMessage(info), {
      parse_mode: 'Markdown'
    });
  } catch (err) {
    console.error('Error fetching price:', err);
    bot.sendMessage(chatId, '❌ Gagal mengambil harga. Coba lagi beberapa saat.');
  }
});

// ========= BROADCAST HELPER =========

async function broadcastToChannel(text) {
  if (!CHANNEL_ID) return;
  try {
    await bot.sendMessage(CHANNEL_ID, text, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    });
  } catch (err) {
    console.error('Error broadcasting to channel:', err);
  }
}

// ========= CRON: PRICE BROADCAST =========

if (CHANNEL_ID && PRICE_BROADCAST_CRON) {
  cron.schedule(PRICE_BROADCAST_CRON, async () => {
    try {
      const info = await fetchPriceInfo();
      const text = priceBroadcastMessage(info);
      await broadcastToChannel(text);
      console.log('✅ Price broadcast sent');
    } catch (err) {
      console.error('Error in price broadcast:', err);
    }
  });

  console.log('⏱️ Price broadcast cron scheduled:', PRICE_BROADCAST_CRON);
}

// ========= CRON: DAILY LORE =========

if (CHANNEL_ID && DAILY_LORE_CRON) {
  cron.schedule(DAILY_LORE_CRON, async () => {
    await broadcastToChannel(loreMessage());
    console.log('📖 Daily lore broadcast sent');
  });

  console.log('⏱️ Daily lore cron scheduled:', DAILY_LORE_CRON);
}

// ========= TIMEOUT-BASED BURN REMINDERS =========

function scheduleBurnReminders() {
  const now = Date.now();

  BURN_SCHEDULE.forEach((burnEvent) => {
    const burnTime = new Date(burnEvent.date).getTime();
    if (Number.isNaN(burnTime)) {
      console.warn('Invalid burn date:', burnEvent);
      return;
    }

    const before24h = burnTime - 24 * 60 * 60 * 1000;
    const before1h = burnTime - 60 * 60 * 1000;

    if (CHANNEL_ID && before24h > now) {
      setTimeout(() => {
        broadcastToChannel(burnReminderMessage(burnEvent, 'before24h'));
        console.log(`⏰ Sent 24h reminder for ${burnEvent.name}`);
      }, before24h - now);
    }

    if (CHANNEL_ID && before1h > now) {
      setTimeout(() => {
        broadcastToChannel(burnReminderMessage(burnEvent, 'before1h'));
        console.log(`⏰ Sent 1h reminder for ${burnEvent.name}`);
      }, before1h - now);
    }

    if (CHANNEL_ID && burnTime > now) {
      setTimeout(() => {
        broadcastToChannel(burnReminderMessage(burnEvent, 'atTime'));
        console.log(`🔥 Sent on-time announcement for ${burnEvent.name}`);
      }, burnTime - now);
    }
  });
}

scheduleBurnReminders();
