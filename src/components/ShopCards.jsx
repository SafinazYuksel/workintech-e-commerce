import React from 'react';
import { Link } from 'react-router-dom';

export default function ShopCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Elements Of Style */}
        <div className="bg-[#FAF9F5] rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between overflow-hidden shadow-sm relative group cursor-pointer border border-gray-100">
          <div className="flex flex-col items-start text-left z-10 max-w-xs space-y-3">
            <span className="text-xs font-bold text-[#E77C40] tracking-wider uppercase">
              Ends Today
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#252B42] leading-tight">
              Elements Of Style
            </h3>
            <p className="text-xs sm:text-sm text-[#737373] font-medium">
              Top Ten Products of the Week
            </p>
            <Link
              to="/shop"
              className="pt-2 text-xs sm:text-sm font-bold text-[#252B42] hover:text-[#23A6F0] underline underline-offset-4 transition"
            >
              Explore Items
            </Link>
          </div>
          <div className="mt-6 sm:mt-0 z-0 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80"
              alt="Elements Of Style - Smartwatch"
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Card 2: Unique Life */}
        <div className="bg-[#23A6F0] text-white rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between overflow-hidden shadow-sm relative group cursor-pointer">
          <div className="flex flex-col items-start text-left z-10 max-w-xs space-y-3">
            <span className="text-xs font-bold text-white tracking-wider uppercase">
              Your Space
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Unique Life
            </h3>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Top Ten Products of the Week
            </p>
            <Link
              to="/shop"
              className="pt-2 text-xs sm:text-sm font-bold text-white hover:text-slate-100 underline underline-offset-4 transition"
            >
              Explore Items
            </Link>
          </div>
          <div className="mt-6 sm:mt-0 z-0 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
              alt="Unique Life - Smartphone"
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
