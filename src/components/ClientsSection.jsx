import React from 'react';

export default function ClientsSection() {
  return (
    <section className="bg-[#FAFAFA] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 text-[#737373]">
          {/* 1. Hooli Logo */}
          <div className="flex justify-center items-center group cursor-pointer transition duration-300 hover:text-slate-900">
            <svg className="h-9 w-auto fill-current" viewBox="0 0 104 34">
              <g transform="translate(0, 2)">
                <ellipse cx="14" cy="12" rx="13" ry="5.5" fill="none" stroke="currentColor" strokeWidth="2.5" transform="rotate(-30 14 12)" />
                <text x="0" y="24" fontSize="24" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">hooli</text>
              </g>
            </svg>
          </div>

          {/* 2. Lyft Logo */}
          <div className="flex justify-center items-center group cursor-pointer transition duration-300 hover:text-slate-900">
            <svg className="h-10 w-auto fill-current" viewBox="0 0 80 40">
              <text x="0" y="32" fontSize="36" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-2px">lyft</text>
            </svg>
          </div>

          {/* 3. Robinhood / Piper-hat Logo */}
          <div className="flex justify-center items-center group cursor-pointer transition duration-300 hover:text-slate-900">
            <svg className="h-12 w-auto fill-current" viewBox="0 0 90 50">
              <path d="M10 40 C 25 45, 45 40, 60 30 C 50 28, 40 28, 25 35 Z" />
              <path d="M25 35 C 30 20, 50 15, 75 10 C 60 25, 45 30, 25 35 Z" />
            </svg>
          </div>

          {/* 4. Stripe Logo */}
          <div className="flex justify-center items-center group cursor-pointer transition duration-300 hover:text-slate-900">
            <svg className="h-9 w-auto fill-current" viewBox="0 0 100 34">
              <text x="0" y="27" fontSize="28" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">stripe</text>
            </svg>
          </div>

          {/* 5. AWS Logo */}
          <div className="flex justify-center items-center group cursor-pointer transition duration-300 hover:text-slate-900">
            <svg className="h-11 w-auto fill-current" viewBox="0 0 100 45">
              <text x="5" y="24" fontSize="26" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0">aws</text>
              <path d="M 5 33 Q 45 45 85 33 L 80 30 M 85 33 L 78 37" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* 6. Reddit Logo */}
          <div className="flex justify-center items-center group cursor-pointer transition duration-300 hover:text-slate-900">
            <svg className="h-12 w-auto fill-current" viewBox="0 0 50 45">
              <circle cx="25" cy="28" r="14" />
              <circle cx="10" cy="22" r="4.5" />
              <circle cx="40" cy="22" r="4.5" />
              <circle cx="19" cy="25" fill="#FAFAFA" r="2.5" />
              <circle cx="31" cy="25" fill="#FAFAFA" r="2.5" />
              <path d="M 19 32 Q 25 36 31 32" fill="none" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="14" x2="30" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="32" cy="5" r="3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
