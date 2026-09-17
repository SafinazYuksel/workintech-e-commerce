import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import md5 from 'md5';
import {
  LogOut,
  User,
  ShoppingCart as CartIcon,
  Search,
  Heart,
  ChevronDown,
  Package,
  Phone,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { logout } from '../store/actions/clientActions';

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
  </svg>
);

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const categories = useSelector((state) => state.product.categories);

  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cart ? cart.reduce((acc, item) => acc + item.count, 0) : 0;
  const isLoggedIn = user && (user.email || user.name);

  // Active Link Helper
  const isLinkActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    if (path === '/shop') {
      return pathname.startsWith('/shop') || pathname.startsWith('/product');
    }
    return pathname.startsWith(path);
  };

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
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100 font-sans">
      {/* Top Notification Bar (desktop-shop-header-1) */}
      <div className="bg-[#252B42] text-white text-xs font-bold py-3 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6">
            <a href="tel:2255550118" className="flex items-center gap-2 hover:text-[#23A6F0] transition">
              <Phone className="w-4 h-4 text-white" />
              <span>(225) 555-0118</span>
            </a>
            <a href="mailto:michelle.rivera@example.com" className="flex items-center gap-2 hover:text-[#23A6F0] transition">
              <Mail className="w-4 h-4 text-white" />
              <span>michelle.rivera@example.com</span>
            </a>
          </div>

          {/* Middle: Promotion Announcement */}
          <div className="font-bold tracking-tight">
            Follow Us and get a chance to win 80% off
          </div>

          {/* Right: Social Media Links */}
          <div className="flex items-center gap-3">
            <span className="font-bold mr-1">Follow Us :</span>
            <a href="#instagram" className="hover:text-[#23A6F0] transition"><InstagramIcon /></a>
            <a href="#youtube" className="hover:text-[#23A6F0] transition"><YoutubeIcon /></a>
            <a href="#facebook" className="hover:text-[#23A6F0] transition"><FacebookIcon /></a>
            <a href="#twitter" className="hover:text-[#23A6F0] transition"><TwitterIcon /></a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-extrabold text-[#252B42] tracking-tight">
          Bandage
        </Link>

        {/* Desktop Navigation Links with Dynamic Active Styling */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-bold">
          <Link
            to="/"
            className={`transition ${
              isLinkActive('/') ? 'text-[#252B42] font-extrabold' : 'text-[#737373] hover:text-[#252B42]'
            }`}
          >
            Home
          </Link>

          {/* Shop Dropdown Menu */}
          <div
            className="relative"
            onMouseEnter={() => setIsShopMenuOpen(true)}
            onMouseLeave={() => setIsShopMenuOpen(false)}
          >
            <Link
              to="/shop"
              className={`transition flex items-center gap-1 py-4 ${
                isLinkActive('/shop') ? 'text-[#252B42] font-extrabold' : 'text-[#737373] hover:text-[#252B42]'
              }`}
            >
              Shop <ChevronDown className={`w-4 h-4 ${isLinkActive('/shop') ? 'text-[#252B42]' : 'text-[#737373]'}`} />
            </Link>

            {/* Dropdown Container */}
            {isShopMenuOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-gray-100 shadow-xl rounded-b-xl p-6 z-50 grid grid-cols-2 gap-6 animate-fadeIn">
                {/* Kadın Column */}
                <div>
                  <h4 className="text-xs font-black text-[#252B42] uppercase border-b border-gray-100 pb-2 mb-3 tracking-wider">
                    Kadın
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {womenCategories.length > 0 ? (
                      womenCategories.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={getCategoryLink(cat, 'kadin')}
                            onClick={() => setIsShopMenuOpen(false)}
                            className="text-[#737373] hover:text-[#23A6F0] font-medium transition block"
                          >
                            {cat.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><Link to="/shop/kadin/tisort/1" className="text-[#737373] hover:text-[#23A6F0] block">Tişört</Link></li>
                        <li><Link to="/shop/kadin/ayakkabi/2" className="text-[#737373] hover:text-[#23A6F0] block">Ayakkabı</Link></li>
                        <li><Link to="/shop/kadin/ceket/3" className="text-[#737373] hover:text-[#23A6F0] block">Ceket</Link></li>
                        <li><Link to="/shop/kadin/elbise/5" className="text-[#737373] hover:text-[#23A6F0] block">Elbise</Link></li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Erkek Column */}
                <div>
                  <h4 className="text-xs font-black text-[#252B42] uppercase border-b border-gray-100 pb-2 mb-3 tracking-wider">
                    Erkek
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {menCategories.length > 0 ? (
                      menCategories.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={getCategoryLink(cat, 'erkek')}
                            onClick={() => setIsShopMenuOpen(false)}
                            className="text-[#737373] hover:text-[#23A6F0] font-medium transition block"
                          >
                            {cat.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li><Link to="/shop/erkek/gomlek/11" className="text-[#737373] hover:text-[#23A6F0] block">Gömlek</Link></li>
                        <li><Link to="/shop/erkek/pantolon/12" className="text-[#737373] hover:text-[#23A6F0] block">Pantolon</Link></li>
                        <li><Link to="/shop/erkek/ayakkabi/4" className="text-[#737373] hover:text-[#23A6F0] block">Ayakkabı</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`transition ${
              isLinkActive('/about') ? 'text-[#252B42] font-extrabold' : 'text-[#737373] hover:text-[#252B42]'
            }`}
          >
            About
          </Link>
          <Link
            to="/blog"
            className={`transition ${
              isLinkActive('/blog') ? 'text-[#252B42] font-extrabold' : 'text-[#737373] hover:text-[#252B42]'
            }`}
          >
            Blog
          </Link>
          <Link
            to="/pricing"
            className={`transition ${
              isLinkActive('/pricing') ? 'text-[#252B42] font-extrabold' : 'text-[#737373] hover:text-[#252B42]'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className={`transition ${
              isLinkActive('/contact') ? 'text-[#252B42] font-extrabold' : 'text-[#737373] hover:text-[#252B42]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Desktop Actions & User Info */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-bold">
          {/* Auth State */}
          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button className="flex items-center space-x-2 text-[#23A6F0] hover:opacity-80 transition focus:outline-none">
                {gravatarUrl ? (
                  <img
                    src={gravatarUrl}
                    alt={user.name || user.email}
                    className="w-7 h-7 rounded-full border border-[#23A6F0] object-cover"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="text-xs font-bold text-[#23A6F0] flex items-center gap-1">
                  {user.name || user.email?.split('@')[0]}
                  <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 w-52 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-50 text-xs">
                    <p className="font-bold text-[#252B42] truncate">{user.name || 'Kullanıcı'}</p>
                    <p className="text-[11px] text-[#737373] truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#252B42] hover:bg-slate-50 hover:text-[#23A6F0] transition"
                  >
                    <Package className="w-4 h-4 text-[#23A6F0]" /> Siparişlerim (Previous Orders)
                  </Link>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition border-t border-gray-50"
                  >
                    <LogOut className="w-4 h-4" /> Çıkış Yap (Logout)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[#23A6F0] hover:opacity-80 transition font-bold flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Login / Register</span>
            </Link>
          )}

          {/* Search Icon */}
          <button className="text-[#23A6F0] hover:opacity-80 transition p-1">
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Icon & Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCartMenuOpen(true)}
            onMouseLeave={() => setIsCartMenuOpen(false)}
          >
            <Link
              to="/cart"
              className="text-[#23A6F0] hover:opacity-80 p-1 flex items-center gap-1 transition"
              title="Sepetime Git"
            >
              <CartIcon className="w-4 h-4" />
              <span className="text-xs font-bold">{totalCartItems}</span>
            </Link>

            {/* Cart Dropdown Container */}
            {isCartMenuOpen && (
              <div className="absolute top-full right-0 w-80 sm:w-96 bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 z-50 animate-fadeIn">
                <h3 className="text-sm font-bold text-[#252B42] border-b border-gray-100 pb-3 mb-3">
                  Sepetim ({totalCartItems} Ürün)
                </h3>

                {!cart || cart.length === 0 ? (
                  <div className="py-8 text-center text-[#737373] text-xs font-medium">
                    Sepetinizde ürün bulunmamaktadır.
                  </div>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-50">
                      {cart.map((item) => {
                        const imageUrl =
                          item.product?.images && item.product.images.length > 0
                            ? item.product.images[0].url
                            : 'https://via.placeholder.com/100?text=No+Image';

                        const itemTotal = Number(item.product?.price || 0) * item.count;

                        return (
                          <div key={item.product.id} className="flex items-center space-x-3 pt-3 first:pt-0">
                            <img
                              src={imageUrl}
                              alt={item.product.name}
                              className="w-14 h-14 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#252B42] truncate">
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-[#737373] mt-0.5">
                                Adet: {item.count}
                              </p>
                              <p className="text-xs font-extrabold text-[#23A6F0] mt-1">
                                ₺{itemTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 mt-3">
                      <Link
                        to="/cart"
                        onClick={() => setIsCartMenuOpen(false)}
                        className="py-2.5 px-3 text-center border border-gray-200 hover:border-gray-300 rounded-xl text-xs font-bold text-[#252B42] hover:bg-slate-50 transition"
                      >
                        Sepete Git
                      </Link>
                      <Link
                        to="/order"
                        onClick={() => setIsCartMenuOpen(false)}
                        className="py-2.5 px-3 text-center bg-[#23A6F0] hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
                      >
                        Siparişi Tamamla
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="text-[#23A6F0] hover:opacity-80 transition p-1 flex items-center gap-1" title="Favorilerim">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-bold">0</span>
          </button>
        </div>

        {/* Mobile Header Right Items */}
        <div className="flex md:hidden items-center space-x-4">
          <button className="text-[#252B42] p-1">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/cart" className="text-[#252B42] p-1 relative flex items-center">
            <CartIcon className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#23A6F0] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalCartItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#252B42] p-1 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-8 px-6 space-y-6 text-center flex flex-col items-center animate-fadeIn">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl transition ${
              isLinkActive('/') ? 'text-[#252B42] font-bold' : 'text-[#737373] font-normal hover:text-[#252B42]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl transition ${
              isLinkActive('/shop') ? 'text-[#252B42] font-bold' : 'text-[#737373] font-normal hover:text-[#252B42]'
            }`}
          >
            Shop
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl transition ${
              isLinkActive('/about') ? 'text-[#252B42] font-bold' : 'text-[#737373] hover:text-[#252B42]'
            }`}
          >
            About
          </Link>
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl transition ${
              isLinkActive('/blog') ? 'text-[#252B42] font-bold' : 'text-[#737373] hover:text-[#252B42]'
            }`}
          >
            Blog
          </Link>
          <Link
            to="/pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl transition ${
              isLinkActive('/pricing') ? 'text-[#252B42] font-bold' : 'text-[#737373] font-normal hover:text-[#252B42]'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl transition ${
              isLinkActive('/contact') ? 'text-[#252B42] font-bold' : 'text-[#737373] font-normal hover:text-[#252B42]'
            }`}
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <div className="pt-4 border-t border-gray-100 w-full flex flex-col items-center gap-3">
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#23A6F0] font-bold text-lg flex items-center gap-2"
              >
                <Package className="w-5 h-5" /> Siparişlerim
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-600 font-bold text-lg flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" /> Çıkış Yap
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100 w-full flex flex-col items-center gap-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#23A6F0] font-bold text-xl flex items-center gap-2"
              >
                <User className="w-5 h-5" /> Login / Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

