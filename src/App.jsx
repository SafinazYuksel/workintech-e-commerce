import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './layout/Header';
import PageContent from './layout/PageContent';
import Footer from './layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import { verifyToken, fetchRoles } from './store/actions/clientActions';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col justify-between font-sans">
        <Header />
        <PageContent />
        <Footer />
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </BrowserRouter>
  );
}

