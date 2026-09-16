import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Share2, ExternalLink, ChevronRight } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Jerome Bell',
    role: 'IBM',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Brooklyn Simmons',
    role: 'eBay',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Ronald Richards',
    role: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Floyd Miles',
    role: 'Facebook',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Jane Cooper',
    role: 'Mitsubishi',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Robert Fox',
    role: 'IBM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    name: 'Leslie Alexander',
    role: 'The Walt Disney Company',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'Jacob Jones',
    role: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
  }
];

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

      {/* 3. Core Team Grid (4x2 layout matching desktop-team-1 and mobile-team-1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col items-center group"
            >
              <div className="w-full h-80 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 text-center w-full">
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">{member.role}</p>

                {/* Social Media Icons matching Figma desktop-team-4 & mobile-team-4 */}
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <a href="#facebook" className="text-[#335BF5] hover:opacity-80 transition" title="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#instagram" className="text-[#E4405F] hover:opacity-80 transition" title="Instagram">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="#twitter" className="text-[#23A6F0] hover:opacity-80 transition" title="Twitter">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Free Trial / CTA Section */}
      <section className="bg-slate-50 py-16 border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Start your 14 days free trial
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Metropolis helps you scale your online shop with ease. Try it free today.
          </p>
          <div>
            <Link
              to="/signup"
              className="inline-block px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-100 transition duration-300"
            >
              Try it free now
            </Link>
          </div>

          <div className="flex justify-center space-x-6 pt-4 text-slate-400">
            <Globe className="w-6 h-6 hover:text-indigo-600 cursor-pointer transition" />
            <Mail className="w-6 h-6 hover:text-indigo-600 cursor-pointer transition" />
            <Share2 className="w-6 h-6 hover:text-indigo-600 cursor-pointer transition" />
            <ExternalLink className="w-6 h-6 hover:text-indigo-600 cursor-pointer transition" />
          </div>
        </div>
      </section>
    </div>
  );
}
