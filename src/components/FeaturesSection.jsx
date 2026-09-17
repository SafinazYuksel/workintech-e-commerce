import React from 'react';
import { CreditCard } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Easy to use',
    description: 'Things on a very small scale behave like nothing that you have any direct experience about.'
  },
  {
    id: 2,
    title: 'Easy to use',
    description: 'Things on a very small scale behave like nothing that you have any direct experience about.'
  },
  {
    id: 3,
    title: 'Easy to use',
    description: 'Things on a very small scale behave like nothing that you have any direct experience about.'
  },
  {
    id: 4,
    title: 'Easy to use',
    description: 'Things on a very small scale behave like nothing that you have any direct experience about.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full font-sans text-center">
      {/* Header */}
      <div className="mb-16 max-w-xl mx-auto">
        <span className="text-xs sm:text-sm font-bold text-[#23A6F0] uppercase tracking-wider block mb-2">
          Practice Advice
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#252B42] tracking-tight mb-3">
          Featured Products
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] leading-relaxed font-medium">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* 2x2 Grid on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto text-left">
        {features.map((item) => (
          <div key={item.id} className="flex items-start space-x-5 p-2">
            <div className="w-16 h-16 rounded-2xl bg-[#E74040] text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <CreditCard className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#252B42] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
