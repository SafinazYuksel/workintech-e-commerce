import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Download, Clock, BookOpen, TrendingUp, ChevronRight } from 'lucide-react';

const featuredItems = [
  {
    id: 'f1',
    category: 'English Department',
    rating: '4.9',
    title: 'Graphic Design',
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    sales: '15 Sales',
    oldPrice: '$16.48',
    price: '$6.48',
    duration: '22hr 30min',
    lessons: '64 Lessons',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'f2',
    category: 'English Department',
    rating: '4.9',
    title: 'Graphic Design',
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    sales: '15 Sales',
    oldPrice: '$16.48',
    price: '$6.48',
    duration: '22hr 30min',
    lessons: '64 Lessons',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
  }
];

export default function FeaturedProductSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Large Banner Image */}
        <div className="lg:col-span-5 h-[400px] sm:h-[550px] rounded-2xl overflow-hidden shadow-sm relative group border border-gray-100">
          <img
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
            alt="Featured Interior Decor"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        </div>

        {/* Right Side: Header + Featured Product Cards */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Header text matching desktop-product-cards-1 */}
          <div className="mb-8">
            <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block mb-1">
              Featured Products
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#252B42] uppercase tracking-tight mb-2">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col text-left"
              >
                {/* Image Container with Sale Badge & Hover Actions */}
                <div className="relative h-56 overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#E74040] text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                    Sale
                  </span>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition">
                    <button className="w-9 h-9 rounded-full bg-white text-[#252B42] hover:text-[#23A6F0] flex items-center justify-center shadow-md transition">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white text-[#252B42] hover:text-[#23A6F0] flex items-center justify-center shadow-md transition">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white text-[#252B42] hover:text-[#23A6F0] flex items-center justify-center shadow-md transition">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#23A6F0]">{item.category}</span>
                    <span className="bg-[#252B42] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      ★ {item.rating}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#252B42] leading-tight">{item.title}</h4>
                  <p className="text-xs text-[#737373] line-clamp-2 leading-relaxed">{item.description}</p>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#737373]">
                    <Download className="w-3.5 h-3.5" />
                    <span>{item.sales}</span>
                  </div>

                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-xs text-[#BDBDBD] line-through">{item.oldPrice}</span>
                    <span className="text-sm text-[#23856D]">{item.price}</span>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="w-3 h-3 rounded-full bg-[#23A6F0] inline-block cursor-pointer"></span>
                    <span className="w-3 h-3 rounded-full bg-[#23856D] inline-block cursor-pointer"></span>
                    <span className="w-3 h-3 rounded-full bg-[#E77C40] inline-block cursor-pointer"></span>
                    <span className="w-3 h-3 rounded-full bg-[#252B42] inline-block cursor-pointer"></span>
                  </div>

                  {/* Specs Info */}
                  <div className="flex items-center justify-between text-[11px] text-[#737373] pt-3 border-t border-gray-100 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#23A6F0]" /> {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#E77C40]" /> {item.lessons}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#23856D]" /> Progress
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    to="/shop"
                    className="mt-2 w-full py-2 px-4 border border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white rounded-full text-xs font-bold flex items-center justify-center gap-1 transition shadow-sm"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
