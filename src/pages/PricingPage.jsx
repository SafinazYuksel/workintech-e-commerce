import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PricingSection from '../components/PricingSection';
import ClientsSection from '../components/ClientsSection';

const faqs = [
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."
  }
];

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Header & Breadcrumbs matching desktop-pricing-1 */}
      <section className="bg-white py-12 md:py-16 text-center">
        <span className="text-xs font-bold text-[#737373] uppercase tracking-widest block mb-4">
          PRICING
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#252B42] tracking-tight leading-tight max-w-xl mx-auto">
          Simple Pricing
        </h1>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#737373] mt-6">
          <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
          <span className="text-[#737373]">Pricing</span>
        </div>
      </section>

      {/* 2. Main Pricing Cards Section matching desktop-pricing-1 */}
      <div className="bg-[#FAFAFA] py-8">
        <PricingSection />
      </div>

      {/* 3. Clients / Trusted Brands Banner matching desktop-pricing-2 */}
      <div className="bg-[#FAFAFA] py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base font-bold text-[#252B42] mb-8">
            Trusted By Over 4000 Big Companies
          </p>
          <ClientsSection />
        </div>
      </div>

      {/* 4. Pricing FAQs Section matching desktop-pricing-2 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#252B42] tracking-tight mb-3">
            Pricing FAQs
          </h2>
          <p className="text-xs text-[#737373] leading-relaxed">
            Problems trying to resolve the conflict between the two major realms of Classical physics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {faqs.map((faq, index) => (
            <div key={index} className="flex items-start space-x-3 text-left">
              <ChevronRight className="w-5 h-5 text-[#23A6F0] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-[#252B42] text-sm mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Free Trial Banner matching desktop-pricing-3 */}
      <section className="bg-white py-20 text-center border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <p className="text-xs text-[#737373] font-semibold">
            Haven't got your answer? Contact our support
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#252B42] tracking-tight pt-4">
            Start your 14 days free trial
          </h2>
          <p className="text-xs text-[#737373] leading-relaxed max-w-md mx-auto">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
          </p>
          <div className="pt-4">
            <Link
              to="/signup"
              className="inline-block bg-[#23A6F0] hover:bg-[#1b8bc9] text-white font-bold text-xs px-8 py-3.5 rounded-md transition duration-300 shadow-md"
            >
              Try it free now
            </Link>
          </div>

          {/* Social Icons Row */}
          <div className="flex justify-center items-center space-x-6 pt-8">
            <a href="#twitter" className="text-[#23A6F0] hover:opacity-80 transition" title="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#facebook" className="text-[#395185] hover:opacity-80 transition" title="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#instagram" className="text-[#000000] hover:opacity-80 transition" title="Instagram">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#linkedin" className="text-[#0A66C2] hover:opacity-80 transition" title="LinkedIn">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

