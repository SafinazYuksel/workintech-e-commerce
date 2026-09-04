import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import TeamPage from '../pages/TeamPage';
import ProductDetailPage from '../pages/ProductDetailPage';

export default function PageContent() {
  return (
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<ProductDetailPage />}
        />
      </Routes>
    </main>
  );
}
