import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export default function VideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full h-[450px] sm:h-[550px] overflow-hidden font-sans my-8">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80"
        alt="Video Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark & Gradient Overlay matching desktop-video-1 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-pink-900/40 flex flex-col items-center justify-center text-center p-6 text-white">
        {/* Blue Play Button */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#23A6F0] hover:bg-sky-400 text-white flex items-center justify-center mb-6 shadow-2xl hover:scale-110 transition duration-300 focus:outline-none"
          title="Play Video"
        >
          <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
        </button>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 max-w-xl leading-tight text-white drop-shadow-md">
          Designing Better Experience
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-white/90 max-w-md leading-relaxed font-medium drop-shadow">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
