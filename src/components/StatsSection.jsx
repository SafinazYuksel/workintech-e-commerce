import React from 'react';

const stats = [
  {
    id: 1,
    value: '1M+',
    label: 'Things on a very small that you have any direct'
  },
  {
    id: 2,
    value: '98%',
    label: 'Things on a very small that you have any direct'
  },
  {
    id: 3,
    value: '4.9',
    label: 'Things on a very small that you have any direct'
  }
];

export default function StatsSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 w-full font-sans border-t border-b border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center justify-between text-left">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center space-x-4">
            <span className="text-4xl sm:text-5xl font-black text-[#252B42] tracking-tight flex-shrink-0">
              {stat.value}
            </span>
            <p className="text-xs sm:text-sm text-[#737373] leading-snug font-medium max-w-[180px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
