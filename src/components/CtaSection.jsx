import React from 'react';
import { CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 w-full font-sans text-center border-t border-b border-gray-100">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Red Circle Icon */}
        <div className="w-16 h-16 rounded-full bg-[#E74040] text-white flex items-center justify-center mb-6 shadow-md">
          <CreditCard className="w-7 h-7" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-black text-[#252B42] tracking-tight mb-8 leading-tight">
          Designing Better Experience
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Link
            to="/shop"
            className="w-full sm:w-auto bg-[#23A6F0] hover:bg-sky-600 text-white font-bold py-3.5 px-9 rounded-md transition shadow-md text-sm"
          >
            Try Now
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto border border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white font-bold py-3.5 px-9 rounded-md transition text-sm"
          >
            Learn More
          </Link>
        </div>

        {/* Bottom Description */}
        <p className="text-xs sm:text-sm text-[#737373] max-w-md leading-relaxed font-medium">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </p>
      </div>
    </section>
  );
}
