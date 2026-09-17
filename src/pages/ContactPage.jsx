import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-white text-[#252B42] font-sans">
      {/* 1. Hero Section matching desktop-contact-1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <span className="text-xs font-bold text-[#252B42] uppercase tracking-widest block">
            CONTACT US
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#252B42] tracking-tight leading-tight">
            Get in touch today!
          </h1>
          <p className="text-[#737373] text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale
          </p>

          <div className="space-y-2 text-[#252B42] font-bold text-lg pt-2">
            <p>Phone : +451 215 215</p>
            <p>Fax : +451 215 215</p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start items-center space-x-6 pt-4 text-[#252B42]">
            <a href="#twitter" className="hover:text-[#23A6F0] transition" title="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#facebook" className="hover:text-[#23A6F0] transition" title="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#instagram" className="hover:text-[#23A6F0] transition" title="Instagram">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#linkedin" className="hover:text-[#23A6F0] transition" title="LinkedIn">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Family Shopping Girl Image & Pink Shape */}
        <div className="relative flex justify-center items-center">
          <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-[#FFEBEB] rounded-full absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-3 h-3 bg-[#9747FF] rounded-full absolute top-4 right-12 hidden sm:block"></div>
          <div className="w-3 h-3 bg-[#9747FF] rounded-full absolute bottom-12 left-8 hidden sm:block"></div>
          <div className="w-4 h-4 bg-[#FFEBEB] rounded-full absolute top-1/3 right-4 hidden sm:block"></div>

          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
            alt="Contact Hero Family Shopping"
            className="w-full max-w-md h-auto object-cover z-10"
          />
        </div>
      </section>

      {/* 2. Visit Our Office Cards Section matching desktop-contact-2 */}
      <section className="bg-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-[#252B42] uppercase tracking-widest block">
              VISIT OUR OFFICE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252B42] leading-tight">
              We help small businesses with big ideas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Phone Card */}
            <div className="bg-white p-10 rounded-xl flex flex-col items-center text-center space-y-4 border border-gray-100 shadow-sm hover:shadow-md transition">
              <Phone className="w-12 h-12 text-[#23A6F0]" />
              <div className="text-xs font-bold text-[#252B42] space-y-1">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <h3 className="font-bold text-[#252B42] text-sm pt-2">Get Support</h3>
              <button className="px-6 py-3 border-2 border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white rounded-full text-xs font-bold transition duration-300">
                Submit Request
              </button>
            </div>

            {/* Location Card (Dark Navy Featured Card) */}
            <div className="bg-[#252B42] text-white p-10 py-16 rounded-xl flex flex-col items-center text-center space-y-4 shadow-xl md:-translate-y-2">
              <MapPin className="w-12 h-12 text-[#23A6F0]" />
              <div className="text-xs font-bold text-white space-y-1">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <h3 className="font-bold text-white text-sm pt-2">Get Support</h3>
              <button className="px-6 py-3 border-2 border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white rounded-full text-xs font-bold transition duration-300">
                Submit Request
              </button>
            </div>

            {/* Mail Card */}
            <div className="bg-white p-10 rounded-xl flex flex-col items-center text-center space-y-4 border border-gray-100 shadow-sm hover:shadow-md transition">
              <Mail className="w-12 h-12 text-[#23A6F0]" />
              <div className="text-xs font-bold text-[#252B42] space-y-1">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <h3 className="font-bold text-[#252B42] text-sm pt-2">Get Support</h3>
              <button className="px-6 py-3 border-2 border-[#23A6F0] text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white rounded-full text-xs font-bold transition duration-300">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Let's Talk Section matching desktop-contact-2 */}
      <section className="bg-white py-20 text-center">
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center">
          <svg className="w-10 h-10 text-[#23A6F0] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
          </svg>
          <span className="text-xs font-extrabold text-[#252B42] uppercase tracking-widest mb-3 block">
            WE Can't WAIT TO MEET YOU
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#252B42] tracking-tight mb-6">
            Let's Talk
          </h2>
          <button className="bg-[#23A6F0] hover:bg-[#1b8bc9] text-white font-bold text-xs px-8 py-4 rounded-md transition duration-300 shadow-md">
            Try it free now
          </button>
        </div>
      </section>
    </div>
  );
}

