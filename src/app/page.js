'use client';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white text-[#A6192E] min-h-screen flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-center items-center px-8 py-6 bg-[#A6192E] text-white shadow-sm">
        <h1 className="text-4xl font-bold tracking-wide">FinTechBros</h1>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-8 py-16 text-center">
        
        {/* Hero Text */}
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
          Invest Smarter with <span className="text-[#A6192E]">FinTechBros</span>
        </h2>

        <p className="text-lg text-[#333] max-w-xl mb-12">
          Simplify your investments with a clean, modern platform inspired by Vanguard's legacy of trust.
        </p>

        {/* Call to Action */}
        <a
          href="/homepage"
          className="bg-[#A6192E] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#8E1627] transition-colors"
        >
          Get Started
        </a>

        {/* Optional Image */}
        <div className="mt-16">
          <Image
            src="/stocks-chart.svg"  // Replace this with your actual asset or graphic
            alt="Stock Trading Illustration"
            width={500}
            height={500}
            className="rounded-md"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-center items-center px-8 py-6 bg-[#A6192E] text-white text-sm">
        &copy; 2025 . All rights reserved.
      </footer>
    </div>
  );
}
