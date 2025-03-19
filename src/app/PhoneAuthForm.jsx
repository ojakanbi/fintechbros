'use client';
import React, { useState, useEffect } from 'react';
import { setupRecaptcha, sendOTP, verifyOTP } from './firebase/firebaseAuth';

export default function PhoneAuthForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await sendOTP(phone);
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await verifyOTP(otp);
      // alert(`Welcome, ${user.phoneNumber}`);
      // You can get user.getIdToken() here if needed!
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center p-5 bg-white px-4">
    <div className="w-full max-w-md bg-[#F5F5F5] p-8 rounded-lg shadow-md border border-[#E0E0E0]">
      <h2 className="text-3xl font-bold text-center text-[#A6192E] mb-8">
        Phone Number Authentication
      </h2>

      {/* STEP 1: Enter Phone Number */}
      {step === 1 && (
        <form onSubmit={handleSendOTP} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-[#A6192E]"
            >
              Enter your phone number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="px-4 py-3 rounded-md border border-[#A6192E] focus:outline-none focus:ring-2 focus:ring-[#A6192E] bg-white text-[#333]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#A6192E] text-white py-3 rounded-md font-semibold hover:bg-[#8E1627] transition-colors"
          >
            Send OTP
          </button>
        </form>
      )}

      {/* STEP 2: Enter OTP */}
      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="otp"
              className="text-sm font-medium text-[#A6192E]"
            >
              Enter the OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="px-4 py-3 rounded-md border border-[#A6192E] focus:outline-none focus:ring-2 focus:ring-[#A6192E] bg-white text-[#333]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#A6192E] text-white py-3 rounded-md font-semibold hover:bg-[#8E1627] transition-colors"
          >
            Verify OTP
          </button>
        </form>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-center text-red-600 mt-4">{error}</p>
      )}

      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container" className="mt-4" />
    </div>
  </div>
  );
}
