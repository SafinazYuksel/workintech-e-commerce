import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { LogOut, User, ShoppingCart as CartIcon, Search, Heart, ChevronDown } from 'lucide-react';
import { logout } from '../store/actions/clientActions';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const categories = useSelector((state) => state.product.categories);

  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  const totalCartItems = cart ? cart.reduce((acc, item) => acc + item.count, 0) : 0;
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

  // Group categories by gender for dropdown
  const womenCategories = categories
    ? categories.filter((cat) => cat.gender === 'k' || cat.code?.startsWith('k:'))
    : [];
  const menCategories = categories
    ? categories.filter((cat) => cat.gender === 'e' || cat.code?.startsWith('e:'))
    : [];

  const getCategoryLink = (cat, genderLabel) => {
    const slug = cat.title ? cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'kategori';
    return `/shop/${genderLabel}/${slug}/${cat.id}`;
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center flex justify-between items-center max-w-7xl mx-auto hidden sm:flex">
        <p>📞 (212) 555-0103 | ✉️ support@ecommerce.com</p>
        <p className="font-medium">Follow Us and get a chance to win 80% off</p>
        <div className="flex gap-3">
          <span>Instagram</span>
          <span>YouTube</span>
          <span>Facebook</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tight">
          Bandage
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>

          {/* Shop Dropdown Menu (T12) */}
          <div
            className="relative"
            onMouseEnter={() => setIsShopMenuOpen(true)}
            onMouseLeave={() => setIsShopMenuOpen(false)}
          >
            <Link
              to="/shop"
              className="hover:text-indigo-600 transition flex items-center gap-1 py-4"
            >
              Shop <ChevronDown className="w-4 h-4" />
            </Link>

            {/* Dropdown Menu Container */}
            {isShopMenuOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-gray-100 shadow-xl rounded-b-xl p-6 z-50 grid grid-cols-2 gap-6 animate-fadeIn">
                {/* Kadın Column */}
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase border-b border-gray-100 pb-2 mb-3 tracking-wider">
                    Kadın
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {womenCategories.length > 0 ? (
                      womenCategories.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={getCategoryLink(cat, 'kadin')}
                            onClick={() => setIsShopMenuOpen(false)}
                            className="text-slate-600 hover:text-indigo-600 font-medium transition block"
                          >
                            {cat.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><Link to="/shop/kadin/tisort/1" className="text-slate-600 hover:text-indigo-600 block">Tişört</Link></li>
                        <li><Link to="/shop/kadin/ayakkabi/2" className="text-slate-600 hover:text-indigo-600 block">Ayakkabı</Link></li>
                        <li><Link to="/shop/kadin/ceket/3" className="text-slate-600 hover:text-indigo-600 block">Ceket</Link></li>
                        <li><Link to="/shop/kadin/elbise/5" className="text-slate-600 hover:text-indigo-600 block">Elbise</Link></li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Erkek Column */}
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase border-b border-gray-100 pb-2 mb-3 tracking-wider">
                    Erkek
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {menCategories.length > 0 ? (
                      menCategories.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={getCategoryLink(cat, 'erkek')}
                            onClick={() => setIsShopMenuOpen(false)}
                            className="text-slate-600 hover:text-indigo-600 font-medium transition block"
                          >
                            {cat.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><Link to="/shop/erkek/gomlek/11" className="text-slate-600 hover:text-indigo-600 block">Gömlek</Link></li>
                        <li><Link to="/shop/erkek/pantolon/12" className="text-slate-600 hover:text-indigo-600 block">Pantolon</Link></li>
                        <li><Link to="/shop/erkek/ayakkabi/4" className="text-slate-600 hover:text-indigo-600 block">Ayakkabı</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link to="/" className="hover:text-indigo-600 transition">
            About
          </Link>
          <Link to="/" className="hover:text-indigo-600 transition">
            Contact
          </Link>
        </nav>

        {/* Actions & User Info */}
        <div className="flex items-center space-x-5 text-sm">
          {/* Search Icon */}
          <button className="text-slate-600 hover:text-indigo-600 p-1">
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="text-slate-600 hover:text-indigo-600 p-1 relative flex items-center transition"
            title="Sepetime Git"
          >
            <CartIcon className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <button className="text-slate-600 hover:text-indigo-600 p-1 hidden sm:block">
            <Heart className="w-5 h-5" />
          </button>

          {/* Auth State */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
              {gravatarUrl ? (
                <img
                  src={gravatarUrl}
                  alt={user.name || user.email}
                  className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
              )}
              <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                {user.name || user.email?.split('@')[0]}
              </span>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1 text-slate-500 hover:text-red-600 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
              <Link
                to="/login"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 px-2.5 py-1.5 rounded-md"
              >
                Login
              </Link>
              <span className="text-gray-300">/</span>
              <Link
                to="/signup"
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
