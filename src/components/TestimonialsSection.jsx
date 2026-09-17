import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Regina Miles",
    role: "Designer",
    comment: "Slate helps you see how many more days you need to work to reach your financial goal.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Michelle Rivera",
    role: "Product Manager",
    comment: "Metropolis helped our team scale e-commerce operations seamlessly with unmatched performance.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Floyd Miles",
    role: "Software Engineer",
    comment: "The component system and user experience design are top tier. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative w-full overflow-hidden font-sans my-12 shadow-2xl">
      {/* Background Image with Dark Purple Overlay matching desktop-testimonials-1 & mobile-testimonials-1 */}
      <div className="absolute inset-0 bg-[#252B42]">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80"
          alt="Testimonial Background"
          className="w-full h-full object-cover opacity-35 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252B42]/95 via-[#252B42]/85 to-[#252B42]/95" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center text-white flex flex-col items-center justify-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-widest leading-tight text-white mb-8 sm:mb-10 drop-shadow-md">
          CUSTOMERS REVIEWS
        </h2>

        {/* Avatar Container with Yellow Background Circle matching Figma */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F3CD03] p-1 flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
          <img
            src={current.avatar}
            alt={current.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Rating Stars (4 filled yellow, 1 empty outline star matching Figma) */}
        <div className="flex items-center space-x-1.5 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                star <= current.rating
                  ? 'text-[#F3CD03] fill-[#F3CD03]'
                  : 'text-[#F3CD03] stroke-[#F3CD03] fill-transparent'
              }`}
            />
          ))}
        </div>

        {/* Review Quote Text */}
        <p className="text-sm sm:text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed text-slate-100 mb-6 px-4">
          "{current.comment}"
        </p>

        {/* Reviewer Name & Role */}
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
            {current.name}
          </h3>
          <p className="text-xs font-semibold text-slate-300 mt-1">
            {current.role}
          </p>
        </div>

        {/* Interactive Navigation Controls */}
        <div className="flex items-center space-x-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition duration-300 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-[#F3CD03]' : 'w-2.5 bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition duration-300 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
