import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import BlogSection from '../components/BlogSection';

const bestsellerProducts = [
  {
    id: 101,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  {
    id: 102,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  {
    id: 103,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  {
    id: 104,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  {
    id: 105,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  {
    id: 106,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  {
    id: 107,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  {
    id: 108,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    images: [{ url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80' }],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 1. Hero Slider (ecommerce-desktop-1) */}
      <Slider />

      {/* 2. EDITOR'S PICK Section (ecommerce-desktop-2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full bg-[#FAFAFA] rounded-2xl my-8">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#252B42] uppercase tracking-tight">
            EDITOR'S PICK
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] mt-1.5 font-medium">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* 4-Tile Grid matching ecommerce-desktop-2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {/* Tile 1: MEN (Spans 2 columns on desktop, full height) */}
          <div className="md:col-span-2 relative h-[500px] rounded-xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
              alt="MEN"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <Link
              to="/shop"
              className="absolute bottom-6 left-6 bg-white hover:bg-slate-900 hover:text-white text-[#252B42] font-black text-sm px-8 py-3 rounded-md shadow-lg uppercase tracking-wider transition-all duration-300"
            >
              MEN
            </Link>
          </div>

          {/* Tile 2: WOMEN (Spans 1 column, full height) */}
          <div className="relative h-[500px] rounded-xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
              alt="WOMEN"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <Link
              to="/shop"
              className="absolute bottom-6 left-6 bg-white hover:bg-slate-900 hover:text-white text-[#252B42] font-black text-sm px-8 py-3 rounded-md shadow-lg uppercase tracking-wider transition-all duration-300"
            >
              WOMEN
            </Link>
          </div>

          {/* Tile 3 & 4 Right Column Stack (ACCESSORIES & KIDS) */}
          <div className="flex flex-col gap-6">
            <div className="relative h-[238px] rounded-xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
                alt="ACCESSORIES"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Link
                to="/shop"
                className="absolute bottom-4 left-4 bg-white hover:bg-slate-900 hover:text-white text-[#252B42] font-black text-xs px-6 py-2.5 rounded-md shadow-md uppercase tracking-wider transition-all duration-300"
              >
                ACCESSORIES
              </Link>
            </div>

            <div className="relative h-[238px] rounded-xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
                alt="KIDS"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Link
                to="/shop"
                className="absolute bottom-4 left-4 bg-white hover:bg-slate-900 hover:text-white text-[#252B42] font-black text-xs px-6 py-2.5 rounded-md shadow-md uppercase tracking-wider transition-all duration-300"
              >
                KIDS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BESTSELLER PRODUCTS Section (ecommerce-desktop-3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full">
        <span className="text-xs font-bold text-[#737373] uppercase tracking-widest block mb-1">
          Featured Products
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#252B42] uppercase tracking-tight">
          BESTSELLER PRODUCTS
        </h2>
        <p className="text-xs sm:text-sm text-[#737373] mt-1 mb-12 font-medium">
          Problems trying to resolve the conflict between
        </p>

        {/* 8 Bestseller Cards in 4x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {bestsellerProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group text-center"
            >
              <div className="h-80 overflow-hidden bg-gray-50">
                <img
                  src={p.images[0].url}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col items-center">
                <h3 className="font-bold text-[#252B42] text-base group-hover:text-[#23A6F0] transition">
                  {p.name}
                </h3>
                <p className="text-xs font-bold text-[#737373] mt-1">
                  {p.department}
                </p>

                {/* Price Display */}
                <div className="flex items-center space-x-2 mt-2 text-xs font-bold">
                  <span className="text-[#BDBDBD] line-through">${p.originalPrice}</span>
                  <span className="text-[#23856D]">${p.price}</span>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center space-x-1.5 mt-3">
                  {p.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full cursor-pointer hover:scale-125 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Vita Classic Product Banner (ecommerce-desktop-4 Top) */}
      <section className="bg-[#23856D] text-white py-16 md:py-24 my-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <span className="text-xs font-black tracking-widest uppercase text-white/90">
              SUMMER 2020
            </span>
            <h2 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight">
              Vita Classic Product
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
              We know how large objects will act, We know how are objects will act, We know
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 pt-2">
              <span className="text-2xl font-black text-white">$16.48</span>
              <button className="bg-[#2DC071] hover:bg-[#28ab64] active:scale-95 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-md shadow-lg transition-all duration-300">
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Vita Classic Model"
              className="w-full max-w-md h-auto object-cover drop-shadow-2xl rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* 5. Part of the Neural Universe Banner (ecommerce-desktop-4 Bottom) */}
      <section className="bg-white py-16 md:py-24 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Couple Image on Left */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
              alt="Part of the Neural Universe Couple"
              className="w-full max-w-md h-auto object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Text Content on Right */}
          <div className="space-y-6 text-center md:text-left">
            <span className="text-xs font-black tracking-widest uppercase text-[#BDBDBD]">
              SUMMER 2020
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#252B42] leading-tight tracking-tight">
              Part of the Neural Universe
            </h2>
            <p className="text-[#737373] text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <button className="bg-[#2DC071] hover:bg-[#28ab64] active:scale-95 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-md shadow-md transition-all duration-300">
                BUY NOW
              </button>
              <button className="border-2 border-[#2DC071] text-[#2DC071] hover:bg-[#2DC071] hover:text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-md transition-all duration-300">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Posts / Practice Advice Section (ecommerce-desktop-5 Top) */}
      <BlogSection limit={3} />
    </div>
  );
}
