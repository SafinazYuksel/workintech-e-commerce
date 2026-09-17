import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    season: 'SUMMER 2020',
    title: 'NEW COLLECTION',
    description: 'We know how large objects will act, but things on a small scale.',
    buttonText: 'SHOP NOW',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'bg-[#02B4E8]',
    buttonBg: 'bg-[#2DC071] hover:bg-[#28b268]'
  },
  {
    id: 2,
    season: 'SUMMER 2020',
    title: "IT'S A SPECIAL GIFT",
    description: 'We know how large objects will act, but things on a small scale.',
    buttonText: 'SHOP NOW',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'bg-[#E74040]',
    buttonBg: 'bg-[#2DC071] hover:bg-[#28b268]'
  }
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className={`relative w-full h-[500px] sm:h-[600px] text-white transition-colors duration-700 overflow-hidden ${slide.bgColor}`}>
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-12 flex flex-col justify-center items-start text-left">
        <span className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 text-white">
          {slide.season}
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 max-w-xl leading-none">
          {slide.title}
        </h1>
        <p className="text-sm sm:text-lg text-slate-100 mb-8 max-w-md leading-relaxed font-medium">
          {slide.description}
        </p>
        <button
          onClick={() => navigate('/shop')}
          className={`${slide.buttonBg} text-white font-bold py-3.5 px-8 rounded-md transition duration-200 shadow-lg text-sm tracking-wider uppercase`}
        >
          {slide.buttonText}
        </button>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
