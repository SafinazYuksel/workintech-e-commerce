import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';

export default function PageContent() {
  return (
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<ProductDetailPage />}
        />
      </Routes>
    </main>
  );
}
