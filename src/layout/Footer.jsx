import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans">
      {/* Main Footer Links Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Column 1: Get In Touch */}
          <div>
            <h3 className="text-base font-bold text-[#252B42] mb-4">
              Get In Touch
            </h3>
            <p className="text-xs font-bold text-[#737373] leading-relaxed max-w-[220px] mb-6">
              the quick fox jumps over the lazy dog
            </p>
            {/* Social Icons matching desktop-footer-1 & mobile-footer-1 */}
            <div className="flex items-center space-x-4">
              <a
                href="#facebook"
                className="text-[#23A6F0] hover:opacity-80 transition duration-200"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="text-[#23A6F0] hover:opacity-80 transition duration-200"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="text-[#23A6F0] hover:opacity-80 transition duration-200"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company info */}
          <div>
            <h3 className="text-base font-bold text-[#252B42] mb-4">
              Company info
            </h3>
            <ul className="space-y-3 text-xs font-bold text-[#737373]">
              <li>
                <Link to="/about" className="hover:text-[#23A6F0] transition">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#carrier" className="hover:text-[#23A6F0] transition">
                  Carrier
                </a>
              </li>
              <li>
                <Link to="/team" className="hover:text-[#23A6F0] transition">
                  We are hiring
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#23A6F0] transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div>
            <h3 className="text-base font-bold text-[#252B42] mb-4">
              Features
            </h3>
            <ul className="space-y-3 text-xs font-bold text-[#737373]">
              <li>
                <a href="#business-marketing" className="hover:text-[#23A6F0] transition">
                  Business Marketing
                </a>
              </li>
              <li>
                <a href="#user-analytic" className="hover:text-[#23A6F0] transition">
                  User Analytic
                </a>
              </li>
              <li>
                <a href="#live-chat" className="hover:text-[#23A6F0] transition">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#unlimited-support" className="hover:text-[#23A6F0] transition">
                  Unlimited Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-base font-bold text-[#252B42] mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-xs font-bold text-[#737373]">
              <li>
                <a href="#ios-android" className="hover:text-[#23A6F0] transition">
                  IOS & Android
                </a>
              </li>
              <li>
                <a href="#watch-demo" className="hover:text-[#23A6F0] transition">
                  Watch a Demo
                </a>
              </li>
              <li>
                <a href="#customers" className="hover:text-[#23A6F0] transition">
                  Customers
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-[#23A6F0] transition">
                  API
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar matching desktop-footer-1 & mobile-footer-1 */}
      <div className="bg-[#FAFAFA] border-t border-gray-100 py-6 text-center">
        <p className="text-xs font-bold text-[#737373]">
          Made With Love By Figmaland All Right Reserved
        </p>
      </div>
    </footer>
  );
}
