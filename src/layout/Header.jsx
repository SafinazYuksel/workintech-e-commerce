import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { LogOut, User, ShoppingCart as CartIcon, Search, Heart, ChevronDown, Package } from 'lucide-react';
import { logout } from '../store/actions/clientActions';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const categories = useSelector((state) => state.product.categories);

  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

          <Link to="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600 transition">
            Contact
          </Link>
        </nav>

        {/* Actions & User Info */}
        <div className="flex items-center space-x-5 text-sm">
          {/* Search Icon */}
          <button className="text-slate-600 hover:text-indigo-600 p-1">
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon & Dropdown (T17) */}
          <div
            className="relative"
            onMouseEnter={() => setIsCartMenuOpen(true)}
            onMouseLeave={() => setIsCartMenuOpen(false)}
          >
            <Link
              to="/cart"
              className="text-slate-600 hover:text-orange-600 p-1 relative flex items-center transition"
              title="Sepetime Git"
            >
              <CartIcon className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Cart Dropdown Container */}
            {isCartMenuOpen && (
              <div className="absolute top-full right-0 w-80 sm:w-96 bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 z-50 animate-fadeIn">
                <h3 className="text-sm font-bold text-slate-800 border-b border-gray-100 pb-3 mb-3">
                  Sepetim ({totalCartItems} Ürün)
                </h3>

                {!cart || cart.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs">
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
                              <h4 className="text-xs font-bold text-slate-800 truncate">
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Adet: {item.count}
                              </p>
                              <p className="text-xs font-extrabold text-orange-600 mt-1">
                                ₺{itemTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons matching T17 mockup */}
                    <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 mt-3">
                      <Link
                        to="/cart"
                        onClick={() => setIsCartMenuOpen(false)}
                        className="py-2.5 px-3 text-center border border-gray-200 hover:border-gray-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                      >
                        Sepete Git
                      </Link>
                      <Link
                        to="/order"
                        onClick={() => setIsCartMenuOpen(false)}
                        className="py-2.5 px-3 text-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
                      >
                        Siparişi Tamamla
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button className="text-slate-600 hover:text-indigo-600 p-1 hidden sm:block">
            <Heart className="w-5 h-5" />
          </button>

          {/* Auth State */}
          {isLoggedIn ? (
            <div
              className="relative pl-3 border-l border-gray-200"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button className="flex items-center space-x-2 py-2 hover:text-orange-600 transition focus:outline-none">
                {gravatarUrl ? (
                  <img
                    src={gravatarUrl}
                    alt={user.name || user.email}
                    className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="text-xs font-bold text-slate-800 hidden sm:inline flex items-center gap-1">
                  {user.name || user.email?.split('@')[0]}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-50 text-xs">
                    <p className="font-bold text-slate-800 truncate">{user.name || 'Kullanıcı'}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    <Package className="w-4 h-4 text-orange-500" /> Siparişlerim (Previous Orders)
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
