import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import TeamSection from '../components/TeamSection';

export default function TeamPage() {
  return (
    <div className="bg-white text-slate-800 font-sans">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block mb-2">
          WHAT WE DO
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">
          Innovation Has a Name: Meet Our Team
        </h1>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-500 mt-6">
          <Link to="/" className="text-slate-900 hover:text-indigo-600 transition">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Team</span>
        </div>
      </section>

      {/* 2. Gallery Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team Work 1"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <div className="h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80"
                alt="Team Work 2"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=500&q=80"
                alt="Team Work 3"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80"
                alt="Team Work 4"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="h-36 sm:h-44 rounded-2xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80"
                alt="Team Work 5"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Team Grid matching desktop-team-1 and mobile-team-1 */}
      <TeamSection />
    </div>
  );
}
