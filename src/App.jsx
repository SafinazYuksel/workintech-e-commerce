import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import TeamPage from './pages/TeamPage';
import { verifyToken, fetchRoles } from './store/actions/clientActions';

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-indigo-50/30 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-full mb-4">
          E-Ticaret Platformu
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Hoş Geldiniz 👋
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">
          E-Ticaret projemiz kuruldu. Sayfalar arasında gezinmek veya giriş / kayıt işlevlerini test etmek için aşağıdaki butonları kullanabilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 shadow-md text-sm"
          >
            Kayıt Ol (Sign Up)
          </Link>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 font-medium py-2.5 px-6 rounded-lg transition duration-200 text-sm"
          >
            Giriş Yap (Login)
          </Link>
          <Link
            to="/team"
            className="bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 text-sm"
          >
            Ekibimiz (Team)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Auto login check & roles pre-fetch
    dispatch(verifyToken());
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Header />
        <ToastContainer position="top-right" autoClose={4000} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/team" element={<TeamPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
