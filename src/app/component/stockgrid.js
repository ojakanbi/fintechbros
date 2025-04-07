'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';

export default function StockGrid() {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState({}); // Tracks adding state for each stock

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch('/api/stocks');
        const data = await res.json();
        setStocks(data || {});
      } catch (err) {
        console.error('❌ Error fetching stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleAddStock = async (symbol, companyName, latestPrice) => {
    setAdding((prev) => ({ ...prev, [symbol]: true }));
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("🔒 You must be logged in to save a stock.");
        return;
      }

      const idToken = await user.getIdToken();

      const res = await fetch('/api/save-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          symbol,
          companyName,
          latestPrice,
          idToken,
        }),
      });

      if (res.ok) {
        alert(`✅ Stock ${symbol} added to your saved list!`);
      } else {
        const error = await res.json();
        console.error('❌ Failed to save:', error);
        alert(`Failed to save stock: ${error?.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('❌ Error during save:', err);
      alert('Error saving stock.');
    } finally {
      setAdding((prev) => ({ ...prev, [symbol]: false }));
    }
  };

  if (loading) {
    return <p className="text-center mt-6 text-gray-500">Loading stocks...</p>;
  }

  return (
    <div className="mt-6 px-4">
      <h2 className="text-3xl font-bold text-[#A6192E] text-center mb-8">📊 Live Stock Feed</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(stocks).map(([symbol, stock]) => {
          const dailyBar = stock.dailyBar;
          const latestQuote = stock.latestQuote;
          const latestTrade = stock.latestTrade;

          return (
            <div
              key={symbol}
              className="bg-white border border-[#A6192E] rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-[#A6192E]">{symbol}</h2>
                <p className="text-sm text-gray-500">
                  {latestTrade?.t
                    ? new Date(latestTrade.t).toLocaleTimeString()
                    : '—'}
                </p>
              </div>

              <div className="space-y-1 text-sm text-gray-800">
                <p>Open: ${dailyBar?.o?.toFixed(2) ?? 'N/A'}</p>
                <p>High: ${dailyBar?.h?.toFixed(2) ?? 'N/A'}</p>
                <p>Low: ${dailyBar?.l?.toFixed(2) ?? 'N/A'}</p>
                <p>Close: ${dailyBar?.c?.toFixed(2) ?? 'N/A'}</p>
                <p>Volume: {dailyBar?.n?.toLocaleString() ?? 'N/A'}</p>
                <p>Bid: ${latestQuote?.bp?.toFixed(2) ?? 'N/A'}</p>
                <p>Ask: ${latestQuote?.ap?.toFixed(2) ?? 'N/A'}</p>
                <p>Last Trade Price: ${latestTrade?.p?.toFixed(2) ?? 'N/A'}</p>
                <p>Size: {latestTrade?.s ?? 'N/A'}</p>
              </div>

              <button
                onClick={() =>
                  handleAddStock(symbol, symbol, latestTrade?.p || dailyBar?.c)
                }
                className="mt-4 w-full bg-[#A6192E] text-white py-2 rounded-md font-semibold hover:bg-[#8E1627] transition disabled:opacity-50"
                disabled={adding[symbol]}
              >
                {adding[symbol] ? 'Adding...' : 'Add to Portfolio'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
