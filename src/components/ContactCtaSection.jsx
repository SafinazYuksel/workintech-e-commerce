import React from 'react';

export default function ContactCtaSection() {
  return (
    <section className="bg-white py-16 sm:py-24 font-sans text-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Title matching desktop-contact-1 & mobile-contact-1 */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#252B42] tracking-tight leading-tight">
          Get answers to all your questions.
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-medium text-[#737373] mt-4 leading-relaxed max-w-md mx-auto">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
        </p>

        {/* Button */}
        <div className="mt-8">
          <a
            href="#contact-form"
            className="inline-block bg-[#23A6F0] hover:bg-[#1b8bc9] active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-md shadow-md transition-all duration-300"
          >
            CONTACT OUR COMPANY
          </a>
        </div>

        {/* Social Media Icons (Twitter, Facebook, Instagram, LinkedIn) matching Figma */}
        <div className="flex items-center justify-center space-x-6 mt-8 text-[#BDBDBD]">
          {/* Twitter */}
          <a
            href="#twitter"
            className="hover:text-[#23A6F0] transition duration-200"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#facebook"
            className="hover:text-[#23A6F0] transition duration-200"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-7h-2v-3h2V8.5C12 6.57 13.57 5 15.5 5H18v3h-2.5c-.28 0-.5.22-.5.5V11h3l-1 3h-2v7h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#instagram"
            className="hover:text-[#23A6F0] transition duration-200"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="#linkedin"
            className="hover:text-[#23A6F0] transition duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
