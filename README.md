# RedBalloonPilotBot 🎈

Telegram bot resmi untuk ekosistem **$REDBALLOON**:

- Menjawab command dasar: `/tokenomics`, `/burnschedule`, `/price`, `/lore`
- Broadcast harga berkala ke channel Telegram
- Daily lore
- Reminder burn ritual (H-24, H-1, dan saat eksekusi)

---

## 🚀 One-Click Deploy on Railway

Klik tombol di bawah ini untuk langsung deploy:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.app/new/template?template=https://github.com/USERNAME/RedBalloonPilotBot)

> Setelah klik, Railway akan:
> - Fork template ini ke akun GitHub kamu (kalau perlu)
> - Membuat project baru
> - Menjalankan `npm install` dan `npm start`

---

## 🔧 Environment Variables

Setelah proyek dibuat di Railway, buka tab **Variables** dan isi:

- `TELEGRAM_BOT_TOKEN` → token dari BotFather
- `TELEGRAM_CHANNEL_ID` → ID atau @username channel
- `DEXSCREENER_PAIR_URL` → URL API DexScreener pair kamu

Kamu bisa melihat contoh di `.env.example`.

---

## 📦 Run secara lokal

```bash
git clone https://github.com/USERNAME/RedBalloonPilotBot.git
cd RedBalloonPilotBot
cp .env.example .env   # lalu isi dengan data asli
npm install
npm start
