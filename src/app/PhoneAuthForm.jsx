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
      alert(`Welcome, ${user.phoneNumber}`);
      // You can get user.getIdToken() here if needed!
    } catch (err) {
      setError(err.message || "Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Phone Number Authentication</h2>

      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <input
            type="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
