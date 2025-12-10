// src/priceFeed.js
import fetch from 'node-fetch';

const pairUrl = process.env.DEXSCREENER_PAIR_URL;

/**
 * Ambil info harga dari DexScreener.
 * Return: { priceUsd, priceNative, fdvUsd, liquidityUsd }
 */
export async function fetchPriceInfo() {
  if (!pairUrl) {
    throw new Error('DEXSCREENER_PAIR_URL is not set in .env or Railway variables');
  }

  const res = await fetch(pairUrl);
  if (!res.ok) {
    throw new Error(`DexScreener error: ${res.status}`);
  }

  const data = await res.json();
  const pair = data.pairs?.[0];

  if (!pair) {
    throw new Error('No pair data returned from DexScreener');
  }

  const priceUsd = pair.priceUsd ? Number(pair.priceUsd).toFixed(6) : 'N/A';
  const priceNative = pair.priceNative ? Number(pair.priceNative).toFixed(8) : 'N/A';
  const fdvUsd = pair.fdv ? `$${Number(pair.fdv).toLocaleString()}` : 'N/A';
  const liquidityUsd = pair.liquidity?.usd
    ? `$${Number(pair.liquidity.usd).toLocaleString()}`
    : 'N/A';

  return { priceUsd, priceNative, fdvUsd, liquidityUsd };
}
