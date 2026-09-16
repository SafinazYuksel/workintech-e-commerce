import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Share2, ExternalLink, ChevronRight } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Gökhan Özdemir',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-indigo-600'
  },
  {
    id: 2,
    name: 'Safinaz Yüksel',
    role: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-purple-600'
  },
  {
    id: 3,
    name: 'Ahmet Yılmaz',
    role: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-orange-500'
  },
  {
    id: 4,
    name: 'Elif Kaya',
    role: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-emerald-600'
  },
  {
    id: 5,
    name: 'Zeynep Demir',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-pink-500'
  },
  {
    id: 6,
    name: 'Can Arslan',
    role: 'QA Automation Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-sky-600'
  },
  {
    id: 7,
    name: 'Burak Çelik',
    role: 'DevOps Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-slate-700'
  },
  {
    id: 8,
    name: 'Selin Yıldız',
    role: 'Product Owner',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    bgColor: 'bg-amber-500'
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

      {/* 3. Core Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col items-center p-5 group"
            >
              <div className="w-full h-64 rounded-xl overflow-hidden mb-4 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <h3 className="text-lg font-black text-slate-900">{member.name}</h3>
              <p className="text-xs font-bold text-indigo-600 mt-1">{member.role}</p>

              {/* Social Links */}
              <div className="flex space-x-3 mt-4 text-slate-400">
                <a href="#globe" className="hover:text-indigo-600 transition" title="Website">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#mail" className="hover:text-indigo-600 transition" title="Mail">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#share" className="hover:text-indigo-600 transition" title="Share">
                  <Share2 className="w-4 h-4" />
                </a>
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
