import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, ArrowRight, Globe, Share2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ContactCtaSection from '../components/ContactCtaSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.warning('Lütfen gerekli tüm alanları doldurunuz.');
      return;
    }
    setSubmitted(true);
    toast.success('Mesajınız başarıyla iletildi. En kısa sürede dönüş yapacağız!');
  };

  return (
    <div className="bg-white text-slate-800 font-sans">
      {/* 1. Hero Section (Mobile & Desktop View) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block">
            CONTACT US
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Get in touch today!
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0">
            We know how large objects will act, but things on a small scale just do not act that way.
          </p>

          <div className="space-y-2 text-sm font-bold text-slate-800">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-indigo-600" /> Phone: +90 (212) 555-0103
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4 text-indigo-600" /> Email: support@bandage.com
            </p>
          </div>

          <div className="flex justify-center md:justify-start space-x-4 pt-2 text-slate-500">
            <button className="p-2.5 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white transition">
              <Globe className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white transition">
              <Mail className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-full bg-slate-100 hover:bg-indigo-600 hover:text-white transition">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-72 sm:w-96 h-72 sm:h-96 bg-pink-50 rounded-full absolute -z-10 animate-pulse"></div>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
            alt="Contact Hero"
            className="w-full max-w-md h-auto object-cover rounded-3xl shadow-2xl border-4 border-white"
          />
        </div>
      </section>

      {/* 2. Visit Our Office Cards Section */}
      <section className="bg-slate-50 py-16 border-y border-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto space-y-3 mb-12">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest block">
              VISIT OUR OFFICE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              We help small businesses with big ideas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Support Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Phone className="w-8 h-8" />
              </div>
              <div className="text-xs font-semibold text-slate-600 space-y-1">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Get Support</h3>
              <button className="px-5 py-2.5 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-bold transition">
                Submit Request
              </button>
            </div>

            {/* Location Card (Highlighted) */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-2xl transition duration-300 flex flex-col items-center text-center space-y-4 md:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="text-xs font-semibold text-slate-300 space-y-1">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <h3 className="font-bold text-white text-sm">Visit Location</h3>
              <button className="px-5 py-2.5 border border-white text-white hover:bg-white hover:text-slate-900 rounded-xl text-xs font-bold transition">
                Submit Request
              </button>
            </div>

            {/* Mail Support Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Mail className="w-8 h-8" />
              </div>
              <div className="text-xs font-semibold text-slate-600 space-y-1">
                <p>georgia.young@example.com</p>
                <p>georgia.young@ple.com</p>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
              <button className="px-5 py-2.5 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-bold transition">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Get answers to all your questions CTA matching desktop-contact-1 & mobile-contact-1 */}
      <ContactCtaSection />

      {/* 4. Interactive Contact Form & Let's Talk Section */}
      <section id="contact-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="space-y-4 mb-8">
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block">
            WE CAN'T WAIT TO MEET YOU
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Let's Talk
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Hizmetlerimiz veya sorularınız için formu doldurarak bizlere doğrudan ulaşabilirsiniz.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 max-w-lg mx-auto text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-900">Mesajınız Alındı!</h3>
            <p className="text-xs text-emerald-700">
              Bizimle iletişime geçtiğiniz için teşekkür ederiz. Müşteri temsilcimiz en kısa sürede e-posta adresiniz üzerinden sizinle irtibata geçecektir.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              Yeni Mesaj Gönder
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg text-left max-w-xl mx-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Adınız Soyadınız (Name) *</label>
              <input
                type="text"
                placeholder="Ahmet Yılmaz"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">E-posta Adresiniz (Email) *</label>
              <input
                type="email"
                placeholder="ahmet@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Konu (Subject)</label>
              <input
                type="text"
                placeholder="Sipariş / Genel Bilgi"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mesajınız (Message) *</label>
              <textarea
                rows={4}
                placeholder="Sorunuzu veya mesajınızı buraya yazabilirsiniz..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Mesajı Gönder
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
