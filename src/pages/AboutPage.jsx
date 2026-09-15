import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Globe, Award, ShoppingBag, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Username',
      role: 'Profession',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Username',
      role: 'Profession',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80'
    },
    {
      name: 'Username',
      role: 'Profession',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const partners = ['hooli', 'lyft', 'piper-hat', 'stripe', 'aws', 'reddit'];

  return (
    <div className="bg-white text-slate-800 font-sans">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest hidden sm:inline-block">
            ABOUT COMPANY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            ABOUT US
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale just do not act that way.
          </p>
          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition duration-300"
            >
              Get Quote Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-72 sm:w-96 h-72 sm:h-96 bg-indigo-50 rounded-full absolute -z-10 animate-pulse"></div>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
            alt="About Us Hero"
            className="w-full max-w-md h-auto object-cover rounded-3xl shadow-2xl border-4 border-white"
          />
        </div>
      </section>

      {/* 2. Problems & Strategy Section */}
      <section className="bg-slate-50 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-2">
              Problems trying
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              Metropolis helps you build and scale your brand with precision and care.
            </h2>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics and Quantum physics.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Key Stats / Numbers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 block">15K</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">Happy Customers</span>
          </div>
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 block">150K</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">Monthly Visitors</span>
          </div>
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 block">15</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">Countries Worldwide</span>
          </div>
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 block">100+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">Top Partners</span>
          </div>
        </div>
      </section>

      {/* 4. Video Spotlight Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 h-80 sm:h-96 flex items-center justify-center border border-gray-100">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Video Cover"
            className="w-full h-full object-cover opacity-60"
          />
          <button className="absolute w-16 sm:w-20 h-16 sm:h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition duration-300">
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
        </div>
      </section>

      {/* 5. Meet Our Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Meet Our Team</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
              <div className="h-64 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Work With Us Banner Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
          <div className="space-y-4">
            <span className="text-xs font-black tracking-widest uppercase text-indigo-200">WORK WITH US</span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">Now Let's grow your business together</h2>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-md mx-auto md:mx-0">
              Join thousands of satisfied clients who trust Bandage for their modern e-commerce requirements.
            </p>
            <div>
              <Link
                to="/signup"
                className="inline-block px-8 py-3.5 border-2 border-white hover:bg-white hover:text-indigo-600 font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300"
              >
                Button
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
              alt="Work with us"
              className="w-full h-80 object-cover rounded-2xl border-4 border-white/20 shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
