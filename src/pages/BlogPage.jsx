import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import BlogSection from '../components/BlogSection';

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Page Header & Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#252B42] uppercase tracking-tight">
              Blog & News
            </h1>
            <p className="text-xs text-[#737373] mt-1">
              Latest news, articles, and practice advice from our team.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-[#737373]">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">Blog</span>
          </div>
        </div>
      </div>

      {/* Main Blog Grid */}
      <BlogSection />
    </div>
  );
}
