// src/app/api/stocks/route.js

import axios from 'axios';

export async function GET() {
  try {
    // Step 1: Get available assets
    const assetsRes = await axios.get('https://paper-api.alpaca.markets/v2/assets', {
      headers: {
        'Apca-Api-Key-Id': process.env.ALPACA_API_KEY,
        'Apca-Api-Secret-Key': process.env.ALPACA_SECRET_KEY,
      },
    });

    // Step 2: Filter active & tradable stocks, take first 25
    const symbols = assetsRes.data
      .filter(asset => asset.status === 'active' && asset.tradable)
      .slice(0, 25) // Limit to first 25 due to API constraints
      .map(asset => asset.symbol)
      .join(',');

    // Step 3: Fetch stock snapshots
    const snapshotsRes = await axios.get('https://data.alpaca.markets/v2/stocks/snapshots', {
      headers: {
        'Apca-Api-Key-Id': process.env.ALPACA_API_KEY,
        'Apca-Api-Secret-Key': process.env.ALPACA_SECRET_KEY,
      },
      params: {
        symbols,
      },
    });

    return new Response(JSON.stringify(snapshotsRes.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching stock data:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to load stock data' }), {
      status: 500,
    });
  }
}
