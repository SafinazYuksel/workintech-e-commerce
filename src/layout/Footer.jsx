import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Footer: Logo & Socials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Bandage</h2>
          <p className="text-xs text-slate-400 mt-1">Get in touch with us on social media</p>
        </div>
        <div className="flex space-x-4 text-indigo-400">
          <a href="#facebook" className="hover:text-white transition text-sm">Facebook</a>
          <a href="#instagram" className="hover:text-white transition text-sm">Instagram</a>
          <a href="#twitter" className="hover:text-white transition text-sm">Twitter</a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h3 className="text-sm font-bold text-white mb-4">Company Info</h3>
          <ul className="space-y-2.5 text-slate-400 text-xs">
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#carrier" className="hover:text-white transition">Carrier</a></li>
            <li><a href="#hiring" className="hover:text-white transition">We are hiring</a></li>
            <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2.5 text-slate-400 text-xs">
            <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
            <li><a href="#cookies" className="hover:text-white transition">Cookie Settings</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-4">Features</h3>
          <ul className="space-y-2.5 text-slate-400 text-xs">
            <li><a href="#marketing" className="hover:text-white transition">Business Marketing</a></li>
            <li><a href="#analytics" className="hover:text-white transition">User Analytics</a></li>
            <li><a href="#chat" className="hover:text-white transition">Live Chat</a></li>
            <li><a href="#support" className="hover:text-white transition">Unlimited Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-4">Resources</h3>
          <ul className="space-y-2.5 text-slate-400 text-xs">
            <li><a href="#ios" className="hover:text-white transition">IOS & Android</a></li>
            <li><a href="#demo" className="hover:text-white transition">Watch a Demo</a></li>
            <li><a href="#customers" className="hover:text-white transition">Customers</a></li>
            <li><a href="#api" className="hover:text-white transition">API Docs</a></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="text-sm font-bold text-white mb-4">Get In Touch</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex overflow-hidden rounded-md border border-slate-700">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-slate-800 text-xs text-white px-3 py-2.5 focus:outline-none w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 transition">
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-slate-500">Lore impsum dolor amit</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>Made With Love By Workintech All Right Reserved</p>
      </div>
    </footer>
  );
}
