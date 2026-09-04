import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { LogOut, User } from 'lucide-react';
import { logout } from '../store/actions/clientActions';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.client.user);

  const isLoggedIn = user && (user.email || user.name);

  // Gravatar URL generation
  const emailHash = user?.email ? md5(user.email.trim().toLowerCase()) : '';
  const gravatarUrl = emailHash
    ? `https://www.gravatar.com/avatar/${emailHash}?s=40&d=identicon`
    : null;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-xl font-extrabold text-indigo-600 tracking-tight">
          E-Commerce
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            Anasayfa
          </Link>
          <Link to="/team" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            Ekibimiz
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              {/* Gravatar / Avatar */}
              {gravatarUrl ? (
                <img
                  src={gravatarUrl}
                  alt={user.name || user.email}
                  className="w-9 h-9 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <User className="w-5 h-5" />
                </div>
              )}

              {/* User info */}
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-gray-900">{user.name || 'Kullanıcı'}</p>
                <p className="text-[10px] text-gray-500">{user.email}</p>
              </div>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                title="Çıkış Yap"
                className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <Link
                to="/login"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-md hover:bg-indigo-50"
              >
                Giriş Yap
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-md shadow-sm"
              >
                Kayıt Ol
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
