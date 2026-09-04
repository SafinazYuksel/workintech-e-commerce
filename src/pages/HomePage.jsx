import React from 'react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';

const sampleProducts = [
  {
    id: 322,
    name: 'Gri Regular Astar Blazer Ceket',
    description: 'Gri Regular Astar Detaylı Dokuma Blazer Ceket TWOAW20CE0316',
    price: 461.99,
    discount: 15,
    rating: 4.8,
    category_id: 3,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80' }]
  },
  {
    id: 323,
    name: 'Siyah Deri Ceket',
    description: 'Şık ve modern kesim hakiki deri ceket.',
    price: 899.90,
    discount: 20,
    rating: 4.9,
    category_id: 3,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80' }]
  },
  {
    id: 324,
    name: 'Mavi Denim Kot Ceket',
    description: 'Klasik tasarım rahat kalıp vintage denim ceket.',
    price: 349.50,
    rating: 4.6,
    category_id: 3,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80' }]
  },
  {
    id: 325,
    name: 'Krem Yün Palto',
    description: 'Sıcak tutan zarif ve uzun kesim yün palto.',
    price: 1250.00,
    discount: 10,
    rating: 4.7,
    category_id: 3,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80' }]
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Slider */}
      <Slider />

      {/* Editors Pick / Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
          EDITOR'S PICK
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-8">
          Problems trying to resolve the conflict between
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden group cursor-pointer border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
              alt="MEN"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <button className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-sm px-6 py-2.5 rounded shadow group-hover:bg-white transition">
              MEN
            </button>
          </div>

          <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden group cursor-pointer border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
              alt="WOMEN"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <button className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-sm px-6 py-2.5 rounded shadow group-hover:bg-white transition">
              WOMEN
            </button>
          </div>

          <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden group cursor-pointer border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
              alt="ACCESSORIES"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <button className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-sm px-6 py-2.5 rounded shadow group-hover:bg-white transition">
              ACCESSORIES
            </button>
          </div>

          <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden group cursor-pointer border border-gray-200">
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
              alt="KIDS"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <button className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-sm px-6 py-2.5 rounded shadow group-hover:bg-white transition">
              KIDS
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center w-full">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
          Featured Products
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
          BESTSELLER PRODUCTS
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-10">
          Problems trying to resolve the conflict between
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sampleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
