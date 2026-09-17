import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const freePrice = 0;
  const standardPrice = isYearly ? 14.25 : 19;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252B42] tracking-tight">
          Pricing
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-3 leading-relaxed font-medium">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-[#252B42]' : 'text-[#737373]'}`}>
            Monthly
          </span>

          <button
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isYearly ? 'bg-[#23A6F0]' : 'bg-gray-200'
            }`}
            role="switch"
            aria-checked={isYearly}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isYearly ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>

          <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-[#252B42]' : 'text-[#737373]'}`}>
            Yearly
          </span>

          <span className="bg-[#B2E3FF] text-[#23A6F0] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Save 25%
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid (2 columns matching desktop-pricing-1, stacked on mobile-pricing-1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {/* FREE Card */}
        <div className="bg-white border-2 border-[#23A6F0] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-300">
          <div>
            <h3 className="text-2xl font-black text-[#252B42] uppercase text-center tracking-wide">
              FREE
            </h3>
            <p className="text-xs font-bold text-[#737373] text-center mt-2.5 max-w-[200px] mx-auto leading-relaxed">
              Organize across all apps by hand
            </p>

            {/* Price display */}
            <div className="flex items-baseline justify-center mt-8 mb-8">
              <span className="text-5xl font-black text-[#23A6F0]">
                {freePrice}
              </span>
              <div className="ml-2 text-left">
                <span className="text-2xl font-bold text-[#23A6F0]">$</span>
                <span className="text-[11px] font-bold text-[#8EC2F2] block uppercase tracking-wider">
                  Per Month
                </span>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 text-xs font-bold text-[#252B42] my-8">
              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Unlimited product updates</span>
              </li>

              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Unlimited product updates</span>
              </li>

              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Unlimited product updates</span>
              </li>

              <li className="flex items-center space-x-3 text-[#BDBDBD]">
                <span className="w-8 h-8 rounded-full bg-[#BDBDBD] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>1GB Cloud storage</span>
              </li>

              <li className="flex items-center space-x-3 text-[#BDBDBD]">
                <span className="w-8 h-8 rounded-full bg-[#BDBDBD] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Email and community support</span>
              </li>
            </ul>
          </div>

          <button className="w-full bg-[#23A6F0] hover:bg-[#1b8bc9] active:scale-[0.98] text-white font-bold py-4 rounded-xl text-sm transition duration-300 shadow-md">
            Try for free
          </button>
        </div>

        {/* STANDARD Card */}
        <div className="bg-white border-2 border-[#23A6F0] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow duration-300">
          <div>
            <h3 className="text-2xl font-black text-[#252B42] uppercase text-center tracking-wide">
              STANDARD
            </h3>
            <p className="text-xs font-bold text-[#737373] text-center mt-2.5 max-w-[200px] mx-auto leading-relaxed">
              Organize across all apps by hand
            </p>

            {/* Price display */}
            <div className="flex items-baseline justify-center mt-8 mb-8">
              <span className="text-5xl font-black text-[#23A6F0]">
                {standardPrice}
              </span>
              <div className="ml-2 text-left">
                <span className="text-2xl font-bold text-[#23A6F0]">$</span>
                <span className="text-[11px] font-bold text-[#8EC2F2] block uppercase tracking-wider">
                  Per Month
                </span>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 text-xs font-bold text-[#252B42] my-8">
              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Unlimited product updates</span>
              </li>

              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Unlimited product updates</span>
              </li>

              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Unlimited product updates</span>
              </li>

              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>1GB Cloud storage</span>
              </li>

              <li className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-[#2DC071] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </span>
                <span>Email and community support</span>
              </li>
            </ul>
          </div>

          <button className="w-full bg-[#23A6F0] hover:bg-[#1b8bc9] active:scale-[0.98] text-white font-bold py-4 rounded-xl text-sm transition duration-300 shadow-md">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
