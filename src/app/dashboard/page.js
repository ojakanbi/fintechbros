'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

import StockGrid from '../component/stockgrid';
import SavedStocks from '../component/SavedStocks';

export default function Homepage() {
  const [view, setView] = useState('grid');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('✅ You have been logged out.');
      router.push('/'); // redirect to home or login
    } catch (err) {
      console.error('❌ Logout failed:', err);
      alert('Failed to log out.');
    }
  };

  return (
    <div className="bg-white text-[#A6192E] min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#A6192E] text-white px-8 py-6 shadow-sm flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">FinTechBros Dashboard</h1>

        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setView('saved')}
            className={`px-5 py-2 rounded-full font-semibold transition-colors ${
              view === 'saved'
                ? 'bg-white text-[#A6192E] border border-white'
                : 'bg-[#A6192E] text-white hover:bg-[#8E1627]'
            }`}
          >
            📥 Saved Stocks
          </button>
          <button
            onClick={() => setView('grid')}
            className={`px-5 py-2 rounded-full font-semibold transition-colors ${
              view === 'grid'
                ? 'bg-white text-[#A6192E] border border-white'
                : 'bg-[#A6192E] text-white hover:bg-[#8E1627]'
            }`}
          >
            📊 Stock Market
          </button>
          <button
            onClick={handleLogout}
            className="ml-4 bg-white text-[#A6192E] border border-white px-5 py-2 rounded-full font-semibold hover:bg-[#F5F5F5] transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-8 py-10">
        {view === 'saved' ? <SavedStocks /> : <StockGrid />}
      </main>

      {/* Footer */}
      <footer className="flex justify-center items-center px-8 py-6 bg-[#A6192E] text-white text-sm">
        &copy; 2025 FinTechBros. All rights reserved.
      </footer>
    </div>
  );
}
