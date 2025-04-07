'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';

export default function SavedStocks() {
  const [savedStocks, setSavedStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedStocks = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          alert("You must be logged in to view saved stocks.");
          return;
        }

        const idToken = await user.getIdToken();

        const res = await fetch(`/api/saved-stocks?userId=${user.uid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const data = await res.json();
        setSavedStocks(data || []);
      } catch (err) {
        console.error('❌ Error fetching saved stocks:', err);
        alert('Failed to load saved stocks.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedStocks();
  }, []);

  if (loading) {
    return <p className="text-center mt-6 text-gray-500">Loading saved stocks...</p>;
  }

  if (savedStocks.length === 0) {
    return <p className="text-center mt-6 text-[#A6192E] font-semibold">No saved stocks found.</p>;
  }

  return (
    <div className="mt-6 px-4">
      <h2 className="text-3xl font-bold text-[#A6192E] text-center mb-8">📥 Your Saved Stocks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {savedStocks.map((stock) => (
          <div
            key={stock._id}
            className="bg-white border border-[#A6192E] rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-[#A6192E]">{stock.symbol}</h3>
              <span className="text-sm bg-[#A6192E] text-white px-2 py-1 rounded-md">
                ${stock.latestPrice.toFixed(2)}
              </span>
            </div>

            <p className="text-gray-700 text-base mb-2">{stock.companyName}</p>

            <p className="text-sm text-gray-500">
              Saved on: {new Date(stock.createdAt).toLocaleDateString()} @{" "}
              {new Date(stock.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
