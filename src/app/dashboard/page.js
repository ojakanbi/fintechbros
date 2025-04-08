'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

import StockGrid from '../component/stockgrid';
import SavedStocks from '../component/SavedStocks';

export default function Homepage() {
  const [view, setView] = useState('grid');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        router.push('/'); // redirect to homepage/login if logged out
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('✅ You have been logged out.');
      router.push('/');
    } catch (err) {
      console.error('❌ Logout failed:', err);
      alert('Failed to log out.');
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <p className="text-[#A6192E] font-semibold text-xl">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#A6192E] min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#A6192E] text-white px-4 py-5 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-center sm:text-left">
          FinTechBros Dashboard
        </h1>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setView('saved')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              view === 'saved'
                ? 'bg-white text-[#A6192E] border border-white'
                : 'bg-[#A6192E] text-white hover:bg-[#8E1627]'
            }`}
          >
            📥 Saved Stocks
          </button>
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              view === 'grid'
                ? 'bg-white text-[#A6192E] border border-white'
                : 'bg-[#A6192E] text-white hover:bg-[#8E1627]'
            }`}
          >
            📊 Stock Market
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-[#A6192E] border border-white px-4 py-2 rounded-full font-medium hover:bg-[#F5F5F5] transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </header>


      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
        {view === 'saved' ? <SavedStocks /> : <StockGrid />}
      </main>

      {/* Footer */}
      <footer className="flex justify-center items-center px-4 py-6 bg-[#A6192E] text-white text-sm">
        &copy; 2025 FinTechBros. All rights reserved.
      </footer>
    </div>
  );
}
