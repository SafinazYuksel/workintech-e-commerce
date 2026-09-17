import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'CLOTHS',
    count: '5 Items',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'CLOTHS',
    count: '5 Items',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'CLOTHS',
    count: '5 Items',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'CLOTHS',
    count: '5 Items',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: 'CLOTHS',
    count: '5 Items',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80'
  }
];

export default function ShopCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to="/shop"
            className="relative h-60 rounded-xl overflow-hidden group shadow-sm border border-gray-100 flex items-center justify-center text-white text-center cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors" />

            <div className="relative z-10 space-y-1">
              <h3 className="font-extrabold text-base uppercase tracking-wider text-white">
                {cat.title}
              </h3>
              <p className="text-xs font-semibold text-white/90">
                {cat.count}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
