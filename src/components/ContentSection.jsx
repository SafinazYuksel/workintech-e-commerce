import React from 'react';

export default function ContentSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#252B42] text-white py-20 sm:py-28 font-sans shadow-xl my-8">
      {/* Background Image Overlay with dark slate filter matching desktop-content-1 & mobile-content-1 */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80"
          alt="Desk Background"
          className="w-full h-full object-cover opacity-15 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#252B42]/90 via-[#252B42]/95 to-[#252B42]" />
      </div>

      {/* Decorative Radial Accent Curve */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white max-w-xl mx-auto drop-shadow-md">
          Designing Better Experience
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-medium text-slate-300 mt-4 leading-relaxed max-w-md mx-auto">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>

        {/* Gold Headphone Product Image matching desktop-content-1 & mobile-content-1 */}
        <div className="mt-10 relative flex justify-center items-center group">
          <div className="absolute w-64 h-64 bg-[#F3CD03]/10 rounded-full blur-2xl animate-pulse" />
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
            alt="Gold Premium Headphones"
            className="w-64 sm:w-80 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
