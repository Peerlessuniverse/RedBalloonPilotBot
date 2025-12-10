// src/messages.js
import { PROJECT_NAME, SUPPLY_CONFIG, BURN_SCHEDULE } from './config.js';

export const welcomeMessage = () => `
🎈 Welcome to Red Balloon Pilot.

${PROJECT_NAME} starts with 99,000,000 dreams.
30,000,000 will burn through three rituals.
69,000,000 remain on-chain.
Only 9,900,000 are considered true Ascenders.

Commands:
/tokenomics - model supply & burn
/burnschedule - jadwal ritual
/price - harga terbaru
/supply - status supply
/lore - lore singkat
/help - ringkasan perintah
`;

export const helpMessage = () => `
🧭 *Red Balloon Pilot Commands*

/start - Sambutan & intro
/help - Ringkasan perintah
/tokenomics - Overview supply & burn
/burnschedule - Jadwal 3 burn ritual
/price - Harga & perkiraan marketcap
/supply - Status supply (99M → 69M → 9.9M)
/lore - Lore puitis RedBalloon
`;

export const tokenomicsMessage = () => `
📊 *Tokenomics ${PROJECT_NAME}*

• Total minted: *${SUPPLY_CONFIG.totalSupply}*
• Burn pool (3 ritual): *${SUPPLY_CONFIG.burnPool}*
• Final fixed supply: *${SUPPLY_CONFIG.finalSupply}*
• Lore: “From 99M dreams, only ${SUPPLY_CONFIG.loreAscendSupply} ascend.”

Burn bersifat *time-based*, bukan tergantung chart hijau/merah.
`;

export const burnScheduleMessage = () => {
  const lines = BURN_SCHEDULE.map((b) => {
    const date = new Date(b.date);
    return `• *${b.name}* — ${date.toLocaleString()}  
  Burn: *${b.burnAmount}* → Supply: *${b.supplyAfter}*`;
  }).join('\n\n');

  return `
🔥 *Burn Ritual Schedule*

${lines}

"We don't burn on green candles, we burn on time."
`;
};

export const supplyMessage = () => `
🪙 *Supply Status*

• Genesis supply: *${SUPPLY_CONFIG.totalSupply}*
• Planned burn pool: *${SUPPLY_CONFIG.burnPool}*
• Final fixed supply: *${SUPPLY_CONFIG.finalSupply}*
• Lore Ascenders: *${SUPPLY_CONFIG.loreAscendSupply}*

Burn TX dan proof akan diumumkan di channel resmi.
`;

export const loreMessage = () => `
📖 *Lore of the Red Balloon*

99 million dreams were minted into the Solana sky.
Every three days, some are burned — not because they failed,
but because some dreams must become fuel so the rest can float higher.

Among them, only 9,900,000 are called the Ascenders:
the balloons that actually escape gravity.

This is not a promise of riches.
It's a story about weight, fire, and the courage to float anyway. 🎈
`;

export const priceBroadcastMessage = ({ priceUsd, priceNative, fdvUsd, liquidityUsd }) => `
🎈 *${PROJECT_NAME} Price Update*

Price:
• ≈ *${priceUsd} USD*
• ≈ *${priceNative} SOL* (approx)

FDV (rough): *${fdvUsd}*
Liquidity (DEX est.): *${liquidityUsd}*

Float carefully. Gravity never sleeps.
`;

export const burnReminderMessage = (burnEvent, type = 'before24h') => {
  const date = new Date(burnEvent.date).toLocaleString();
  if (type === 'before24h') {
    return `
⏰ *Burn Ritual Reminder — 24h*

${burnEvent.name} akan dieksekusi dalam ~24 jam.

📅 Jadwal: *${date}*
🔥 Burn: *${burnEvent.burnAmount}*
🔻 Supply setelah burn: *${burnEvent.supplyAfter}*
`;
  }

  if (type === 'before1h') {
    return `
⏰ *Burn Ritual Reminder — 1h*

${burnEvent.name} dimulai dalam ~1 jam.

🔥 Burn: *${burnEvent.burnAmount}*
🔻 Supply setelah burn: *${burnEvent.supplyAfter}*
`;
  }

  // type === 'atTime'
  return `
🔥 *${burnEvent.name} Executed (Scheduled)*

Burn amount (planned): *${burnEvent.burnAmount}*
Supply after ritual (target): *${burnEvent.supplyAfter}*

TX hash & bukti burn akan diumumkan oleh dev/resmi.
"We burn to rise."
`;
};
