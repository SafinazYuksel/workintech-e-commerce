import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

export default function SubscriptionSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }
    toast.success('Bültenimize başarıyla abone oldunuz!');
    setEmail('');
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 w-full font-sans text-center border-t border-b border-gray-100">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Red Circle Icon */}
        <div className="w-16 h-16 rounded-full bg-[#E74040] text-white flex items-center justify-center mb-6 shadow-md">
          <CreditCard className="w-7 h-7" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-black text-[#252B42] tracking-tight mb-4 leading-tight">
          Designing Better Experience
        </h2>

        {/* Top Description */}
        <p className="text-xs sm:text-sm text-[#737373] max-w-md leading-relaxed font-medium mb-8">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </p>

        {/* Subscription Form (desktop-subscription-1 & mobile-subscription-1) */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
          <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full sm:flex-1 bg-[#F9F9F9] border border-gray-200 rounded-md sm:rounded-r-none px-4 py-3.5 text-sm text-[#252B42] placeholder-[#737373] focus:outline-none focus:border-[#23A6F0] transition"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#23A6F0] hover:bg-sky-600 text-white font-bold px-7 py-3.5 rounded-md sm:rounded-l-none text-sm transition shadow-sm"
            >
              Subscribe
            </button>
          </div>
        </form>

        {/* Bottom Description */}
        <p className="text-xs sm:text-sm text-[#737373] max-w-md leading-relaxed font-medium">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </p>
      </div>
    </section>
  );
}
