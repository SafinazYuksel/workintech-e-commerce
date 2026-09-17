import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import ClientsSection from '../components/ClientsSection';

export default function AboutPage() {
  const teamMembers = [
    {
      username: 'Username',
      profession: 'Profession',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      bgColor: 'bg-[#E5C158]'
    },
    {
      username: 'Username',
      profession: 'Profession',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      bgColor: 'bg-[#D1D5DB]'
    },
    {
      username: 'Username',
      profession: 'Profession',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
      bgColor: 'bg-[#2A7CC7]'
    }
  ];

  return (
    <div className="bg-white text-[#252B42] font-sans">
      {/* 1. Hero Section matching desktop-about-1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <span className="text-xs font-bold text-[#252B42] uppercase tracking-widest block">
            ABOUT COMPANY
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#252B42] tracking-tight">
            ABOUT US
          </h1>
          <p className="text-[#737373] text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale
          </p>
          <div>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-bold text-sm rounded-md shadow-md transition duration-300"
            >
              Get Quote Now
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          {/* Background pastel pink circle shape */}
          <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-[#FFEBEB] rounded-full absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          {/* Decorative floating dots */}
          <div className="w-3 h-3 bg-[#9747FF] rounded-full absolute top-4 right-12 hidden sm:block"></div>
          <div className="w-3 h-3 bg-[#9747FF] rounded-full absolute bottom-12 left-8 hidden sm:block"></div>
          <div className="w-4 h-4 bg-[#FFEBEB] rounded-full absolute top-1/3 right-4 hidden sm:block"></div>

          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
            alt="About Us Hero"
            className="w-full max-w-md h-auto object-cover z-10"
          />
        </div>
      </section>

      {/* 2. Problems Trying Text Block matching desktop-about-1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-xs font-bold text-[#E74040] uppercase mb-4">
          Problems trying
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <h2 className="text-xl sm:text-2xl font-bold text-[#252B42] leading-snug">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </section>

      {/* 3. 4 Key Stats matching desktop-about-1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-bold text-[#252B42] block">15K</span>
            <span className="text-xs font-bold text-[#737373] mt-2 block">Happy Customers</span>
          </div>
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-bold text-[#252B42] block">150K</span>
            <span className="text-xs font-bold text-[#737373] mt-2 block">Monthly Visitors</span>
          </div>
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-bold text-[#252B42] block">15</span>
            <span className="text-xs font-bold text-[#737373] mt-2 block">Countries Worldwide</span>
          </div>
          <div className="p-4">
            <span className="text-4xl sm:text-5xl font-bold text-[#252B42] block">100+</span>
            <span className="text-xs font-bold text-[#737373] mt-2 block">Top Partners</span>
          </div>
        </div>
      </section>

      {/* 4. Video Spotlight Card matching desktop-about-2 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-[20px] overflow-hidden shadow-lg h-[320px] sm:h-[480px] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
            alt="Video Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
          <button
            aria-label="Play video"
            className="absolute w-14 sm:w-16 h-14 sm:h-16 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition duration-300 z-10"
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </button>
        </div>
      </section>

      {/* 5. Meet Our Team Section matching desktop-about-3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#252B42]">Meet Our Team</h2>
          <p className="text-xs text-[#737373] leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white rounded-none overflow-hidden flex flex-col items-center">
              <div className={`w-full h-72 overflow-hidden ${member.bgColor}`}>
                <img
                  src={member.image}
                  alt={member.username}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 text-center w-full">
                <h3 className="font-bold text-[#252B42] text-base">{member.username}</h3>
                <p className="text-xs font-semibold text-[#737373] mt-1">{member.profession}</p>

                {/* Social Media Blue Icons matching Figma */}
                <div className="flex justify-center items-center space-x-4 mt-4 text-[#23A6F0]">
                  <a href="#facebook" className="hover:opacity-80 transition" title="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#instagram" className="hover:opacity-80 transition" title="Instagram">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#twitter" className="hover:opacity-80 transition" title="Twitter">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Big Companies Are Here Section matching desktop-about-3 */}
      <section className="bg-[#FAFAFA] py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#252B42] mb-3">
              Big Companies Are Here
            </h2>
            <p className="text-xs text-[#737373] leading-relaxed">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <ClientsSection />
        </div>
      </section>

      {/* 7. Work With Us Banner Section matching desktop-about-4 */}
      <section className="bg-[#2A7CC7] text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px] items-center">
          {/* Left Text Content (7 cols) */}
          <div className="md:col-span-7 p-8 sm:p-16 lg:p-24 flex flex-col justify-center items-start text-left">
            <span className="text-xs font-bold tracking-widest uppercase text-white mb-4 block">
              WORK WITH US
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Now Let's grow Yours
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md mb-8">
              The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
            </p>
            <div>
              <Link
                to="/signup"
                className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-[#2A7CC7] font-bold text-xs uppercase tracking-wider rounded transition duration-300"
              >
                Button
              </Link>
            </div>
          </div>

          {/* Right Image Content (5 cols) */}
          <div className="md:col-span-5 h-full min-h-[350px] relative">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
              alt="Work with us model"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

