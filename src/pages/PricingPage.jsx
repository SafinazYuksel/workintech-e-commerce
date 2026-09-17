import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import PricingSection from '../components/PricingSection';
import ClientsSection from '../components/ClientsSection';

const faqs = [
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Metropolis helps you build and scale your brand with precision and care. Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Metropolis helps you build and scale your brand with precision and care. Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Metropolis helps you build and scale your brand with precision and care. Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Metropolis helps you build and scale your brand with precision and care. Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Metropolis helps you build and scale your brand with precision and care. Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics."
  },
  {
    question: "the quick fox jumps over the lazy dog",
    answer: "Metropolis helps you build and scale your brand with precision and care. Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics."
  }
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Header & Breadcrumbs */}
      <section className="bg-white border-b border-gray-100 py-12 md:py-16 text-center">
        <span className="text-xs font-black text-[#23A6F0] uppercase tracking-widest block mb-2">
          PRICING
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#252B42] tracking-tight leading-tight max-w-xl mx-auto">
          Simple & Transparent Pricing
        </h1>
        <p className="text-xs sm:text-sm text-[#737373] mt-3 max-w-md mx-auto leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#737373] mt-6">
          <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Pricing</span>
        </div>
      </section>

      {/* 2. Main Pricing Cards Section */}
      <PricingSection />

      {/* 3. Clients / Trusted Brands Banner */}
      <div className="my-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-[#737373] uppercase tracking-wider">
            Trusted By Over 4,000 Companies
          </p>
        </div>
        <ClientsSection />
      </div>

      {/* 4. Pricing FAQs Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-[#252B42] tracking-tight">
            Pricing FAQs
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] mt-2">
            Problems trying to resolve the conflict between the two major realms of Classical physics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-start justify-between text-left focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <ChevronRight className="w-4 h-4 text-[#23A6F0] flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-[#252B42] text-sm leading-snug">
                    {faq.question}
                  </h3>
                </div>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-[#23A6F0] flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                )}
              </button>

              {openFaq === index && (
                <p className="text-xs text-[#737373] mt-3 pl-7 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Free Trial Banner */}
      <section className="bg-white py-16 text-center border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-black text-[#252B42] tracking-tight">
            Start your 14 days free trial
          </h2>
          <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
            Metropolis helps you build and scale your brand with precision and care. Try it free today.
          </p>
          <div className="pt-2">
            <Link
              to="/signup"
              className="inline-block bg-[#23A6F0] hover:bg-[#1b8bc9] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg transition duration-300 shadow-md"
            >
              Try it free now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
