import fetch from "node-fetch";

export async function getPriceData(url) {
    try {
        const res = await fetch(url);
        const json = await res.json();

        const pair = json.pairs?.[0];
        if (!pair) return null;

        return {
            priceUsd: pair.priceUsd,
            liquidityUsd: pair.liquidity?.usd,
            fdv: pair.fdv
        };

    } catch (err) {
        console.error("Price feed failed:", err);
        return null;
    }
}
