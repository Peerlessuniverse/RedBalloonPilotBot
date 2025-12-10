// src/config.js

export const PROJECT_NAME = '$REDBALLOON';
export const TOKEN_SYMBOL = 'RBLN';

// Model 99M → 69M → 9.9M (lore)
export const SUPPLY_CONFIG = {
  totalSupply: '99,000,000 RBLN',
  burnPool: '30,000,000 RBLN',
  finalSupply: '69,000,000 RBLN',
  loreAscendSupply: '9,900,000 RBLN'
};

// EDIT tanggal sesuai rencana burn kamu (zona waktu +07:00 kalau mau WIB)
export const BURN_SCHEDULE = [
  {
    name: 'Ritual I',
    date: '2025-12-15T12:00:00+07:00',
    burnAmount: '10,000,000 RBLN',
    supplyAfter: '89,000,000 RBLN'
  },
  {
    name: 'Ritual II',
    date: '2025-12-18T12:00:00+07:00',
    burnAmount: '10,000,000 RBLN',
    supplyAfter: '79,000,000 RBLN'
  },
  {
    name: 'Ritual III',
    date: '2025-12-21T12:00:00+07:00',
    burnAmount: '10,000,000 RBLN',
    supplyAfter: '69,000,000 RBLN (final)'
  }
];

// Cron untuk broadcast harga (tiap jam, menit ke-0)
export const PRICE_BROADCAST_CRON = '0 * * * *';

// Cron untuk daily lore (jam 09:00 waktu server)
export const DAILY_LORE_CRON = '0 9 * * *';
