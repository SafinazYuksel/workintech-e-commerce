import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, List, ChevronRight, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const categories = [
  {
    id: 1,
    title: 'CLOTHS',
    itemCount: '5 Items',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    title: 'SHOES',
    itemCount: '5 Items',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    title: 'ACCESSORIES',
    itemCount: '5 Items',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    title: 'JACKETS',
    itemCount: '5 Items',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 5,
    title: 'DRESSES',
    itemCount: '5 Items',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=500&q=80'
  }
];

const shopProducts = [
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
  },
  {
    id: 326,
    name: 'Klasik Beyaz Gömlek',
    description: 'Zamansız şıklık ve nefes alabilir kumaş dokusu.',
    price: 299.90,
    rating: 4.5,
    category_id: 1,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80' }]
  },
  {
    id: 327,
    name: 'Spor Koşu Ayakkabısı',
    description: 'Hafif tabanlı yüksek performanslı spor ayakkabı.',
    price: 649.00,
    discount: 12,
    rating: 4.8,
    category_id: 2,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' }]
  },
  {
    id: 328,
    name: 'Güneş Gözlüğü Premium',
    description: 'UV400 korumalı stil sahibi unisex güneş gözlüğü.',
    price: 199.99,
    rating: 4.4,
    category_id: 3,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80' }]
  },
  {
    id: 329,
    name: 'Deri Kol Çantası',
    description: 'Geniş iç hacimli şık kadın omuz çantası.',
    price: 499.00,
    discount: 15,
    rating: 4.7,
    category_id: 3,
    category_name: 'English Department',
    images: [{ url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80' }]
  }
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterText, setFilterText] = useState('');

  const filteredProducts = shopProducts.filter((p) =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Shop</h1>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="text-slate-900 hover:text-indigo-600 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Shop</span>
          </div>
        </div>
      </div>

      {/* Categories Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative h-48 rounded-xl overflow-hidden group cursor-pointer border border-gray-200 shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex flex-col items-center justify-center text-white">
                <h3 className="text-base font-extrabold uppercase tracking-wide">{cat.title}</h3>
                <p className="text-xs font-medium text-slate-200 mt-1">{cat.itemCount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls & Filtering Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Item Count Result */}
          <span className="text-xs font-bold text-slate-500">
            Showing all {filteredProducts.length} results
          </span>

          {/* View Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-500">Views:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition ${
                viewMode === 'grid'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : 'border-gray-200 text-slate-400 hover:border-gray-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition ${
                viewMode === 'list'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : 'border-gray-200 text-slate-400 hover:border-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filters & Sorting */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search products..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-indigo-500 text-slate-700"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
              : 'flex flex-col space-y-4'
          }
        >
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 flex justify-center">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm text-xs font-bold">
          <button className="px-4 py-2.5 text-slate-400 border-r border-gray-200 hover:bg-gray-50 transition">
            First
          </button>
          <button className="px-4 py-2.5 bg-indigo-600 text-white border-r border-gray-200">
            1
          </button>
          <button className="px-4 py-2.5 text-slate-600 hover:bg-gray-50 border-r border-gray-200 transition">
            2
          </button>
          <button className="px-4 py-2.5 text-slate-600 hover:bg-gray-50 border-r border-gray-200 transition">
            3
          </button>
          <button className="px-4 py-2.5 text-indigo-600 hover:bg-gray-50 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
