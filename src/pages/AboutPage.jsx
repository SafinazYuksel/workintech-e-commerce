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

      {/* 5. Meet Our Team Section (desktop-team-4 & mobile-team-4 layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Meet Our Team</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col items-center">
              <div className="w-full h-72 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6 text-center w-full">
                <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">{member.role}</p>
                
                {/* Social Media Icons matching desktop-team-4 */}
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <a href="#facebook" className="text-sky-500 hover:text-sky-600 transition" title="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#instagram" className="text-sky-500 hover:text-sky-600 transition" title="Instagram">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#twitter" className="text-sky-500 hover:text-sky-600 transition" title="Twitter">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                </div>
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
