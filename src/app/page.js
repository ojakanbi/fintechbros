'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import PhoneAuthForm from './PhoneAuthForm';



export default function Home() {
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleGetStartedClick = () => {
      setShowLoginForm(true);
    };

    return (
      <div className="bg-white text-[#A6192E] min-h-screen flex flex-col font-sans">
        <header className="flex justify-center items-center px-8 py-6 bg-[#A6192E] text-white shadow-sm">
          <h1 className="text-4xl font-bold tracking-wide">FinTechBros</h1>
        </header>

        <main className="flex flex-col items-center justify-center flex-1 px-8 py-16 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
            Invest Smarter with <span className="text-[#A6192E]">FinTechBros</span>
          </h2>

          <p className="text-lg text-[#333] max-w-xl mb-12">
            Simplify your investments with a clean, modern platform inspired by Vanguard's legacy of trust.
          </p>

          <a
            onClick={handleGetStartedClick}
            className="bg-[#A6192E] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#8E1627] transition-colors"
          >
            Get Started
          </a>

          {showLoginForm && <PhoneAuthForm />}

          <div className="mt-16">
            <video
              style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', border: 'none', backgroundColor: 'transparent' }}
              width="320"
              height="240"
              autoPlay
              loop
              muted
              controls
              preload="none"
            >
              <source src="/homepageStocks.mp4" type="video/mp4" />
              <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
              Your browser does not support the video tag.
            </video>
          </div>
        </main>

        <footer className="flex justify-center items-center px-8 py-6 bg-[#A6192E] text-white text-sm">
          &copy; 2025. All rights reserved.
        </footer>
      </div>
    );
  }
