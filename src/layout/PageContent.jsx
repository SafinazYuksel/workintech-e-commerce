import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CreateOrderPage from '../pages/CreateOrderPage';
import PreviousOrdersPage from '../pages/PreviousOrdersPage';
import AboutPage from '../pages/AboutPage';
import TeamPage from '../pages/TeamPage';
import ProtectedRoute from '../components/ProtectedRoute';

export default function PageContent() {
  return (
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <CreateOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-order"
          element={
            <ProtectedRoute>
              <CreateOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <PreviousOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/previous-orders"
          element={
            <ProtectedRoute>
              <PreviousOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<ProductDetailPage />}
        />
      </Routes>
    </main>
  );
}
