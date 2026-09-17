import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChevronRight,
  ChevronLeft,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Check,
  Loader2,
  ArrowLeft,
  Shield,
  Edit,
  Trash2
} from 'lucide-react';
import { fetchProductDetail, deleteProduct } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import ClientsSection from '../components/ClientsSection';
import AdminProductModal from '../components/AdminProductModal';
import { toast } from 'react-toastify';

const bestsellerProducts = [
  {
    id: 201,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 202,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 203,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 204,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 205,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 206,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 207,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 208,
    name: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    price: 6.48,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80'
  }
];

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const isAdmin = user && (user.role_id === 1 || user.role === 'admin');

  const product = useSelector((state) => state.product.product);
  const fetchState = useSelector((state) => state.product.fetchState);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [productId, dispatch]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
    setAddedToCart(true);
    toast.success(`${product.name} sepetinize eklendi!`);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? 'Favorilerden çıkarıldı.' : 'Favorilere eklendi!');
  };

  if (fetchState === 'FETCHING') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#23A6F0] mb-3" />
        <p className="text-[#737373] text-sm font-medium">Loading product details...</p>
      </div>
    );
  }

  if (fetchState === 'FAILED' || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-xl font-bold text-[#252B42] mb-2">Product Not Found</h3>
        <p className="text-[#737373] mb-6 text-sm">The product you are looking for does not exist or failed to load.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#23A6F0] text-white rounded-md hover:bg-[#1b8bc9] transition text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [
        { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', index: 0 },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', index: 1 }
      ];

  const currentImage = images[selectedImageIndex]?.url || images[0]?.url;

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white min-h-screen py-6 font-sans">
      {/* 1. Header & Breadcrumbs matching desktop-product-1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#737373] py-4">
          <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/shop" className="text-gray-400 hover:text-[#23A6F0] transition">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#23A6F0] truncate">{product.name}</span>
        </div>
      </div>

      {/* 2. Product Summary Area matching desktop-product-1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Image Carousel Showcase */}
          <div className="flex flex-col space-y-4">
            <div className="relative w-full h-[400px] sm:h-[480px] bg-[#F9F9F9] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center group">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition duration-500"
              />

              {/* Slider Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 p-3 rounded-full bg-white/80 hover:bg-white text-[#252B42] shadow-md backdrop-blur-sm transition focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 p-3 rounded-full bg-white/80 hover:bg-white text-[#252B42] shadow-md backdrop-blur-sm transition focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images Row */}
            <div className="flex space-x-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition ${
                    selectedImageIndex === idx
                      ? 'border-[#23A6F0] opacity-100'
                      : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details & Actions */}
          <div className="flex flex-col space-y-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252B42] tracking-tight">
              {product.name || 'Floating Phone'}
            </h1>

            {/* Rating Stars & Reviews Count matching desktop-product-1 */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(product.rating || 4)
                        ? 'text-[#F3CD03] fill-[#F3CD03]'
                        : 'text-[#F3CD03] stroke-[#F3CD03] fill-transparent'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#737373] ml-2">
                10 Reviews
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-black text-[#252B42]">
              ${Number(product.price || 1139.33).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>

            {/* Availability */}
            <div className="text-xs font-bold text-[#737373]">
              Availability : <span className="text-[#23A6F0] ml-1">In Stock</span>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm font-medium text-[#737373] leading-relaxed border-b border-gray-100 pb-6">
              {product.description ||
                "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."}
            </p>

            {/* Color Swatch Options */}
            <div className="flex items-center space-x-2.5 pt-2">
              {['#23A6F0', '#2DC071', '#E77C40', '#252B42'].map((color, idx) => (
                <span
                  key={idx}
                  className="w-7 h-7 rounded-full cursor-pointer hover:scale-110 transition-transform border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Actions Row (Select Options Button & Icon Controls matching desktop-product-1) */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                className={`px-8 py-3.5 rounded-md font-bold text-xs uppercase tracking-wider text-white shadow-md transition duration-300 flex items-center gap-2 ${
                  addedToCart
                    ? 'bg-[#2DC071] hover:bg-[#28ab64]'
                    : 'bg-[#23A6F0] hover:bg-[#1b8bc9]'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  'Select Options'
                )}
              </button>

              <button
                onClick={toggleWishlist}
                className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'text-[#252B42] hover:bg-gray-50'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full border border-gray-200 text-[#252B42] hover:bg-gray-50 flex items-center justify-center transition"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>

              <button
                className="w-10 h-10 rounded-full border border-gray-200 text-[#252B42] hover:bg-gray-50 flex items-center justify-center transition"
                aria-label="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Admin Management Action Box */}
            {isAdmin && (
              <div className="mt-8 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-purple-950">🛡️ Yönetici Yetkisi: Ürün Yönetimi</h4>
                    <p className="text-[11px] text-purple-700">Bu ürünü doğrudan güncelleyebilir veya sistemden silebilirsiniz.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition"
                  >
                    <Edit className="w-3.5 h-3.5 text-purple-200" /> Ürünü Düzenle (Admin)
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Bu ürünü sistemden silmek istediğinize emin misiniz?')) {
                        dispatch(deleteProduct(product.id));
                        toast.success('Ürün başarıyla silindi! (Admin)');
                        navigate('/shop');
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Ürünü Sil
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Edit Modal */}
      <AdminProductModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        initialProduct={product}
      />

      {/* 3. Description Tabs Bar matching desktop-product-1 & desktop-product-2 */}
      <div className="border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-sm font-bold text-[#737373] py-6 border-b border-gray-100">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 transition ${
                activeTab === 'description'
                  ? 'text-[#252B42] border-b-2 border-[#23A6F0] font-extrabold'
                  : 'hover:text-[#252B42]'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`pb-2 transition ${
                activeTab === 'additional'
                  ? 'text-[#252B42] border-b-2 border-[#23A6F0] font-extrabold'
                  : 'hover:text-[#252B42]'
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 transition ${
                activeTab === 'reviews'
                  ? 'text-[#252B42] border-b-2 border-[#23A6F0] font-extrabold'
                  : 'hover:text-[#252B42]'
              }`}
            >
              Reviews (0)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Tab Content Area matching desktop-product-2 (3-Column Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Column 1: Interior Image */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 h-80">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
              alt="Room Interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Column 2: Paragraph Content */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#252B42]">
              the quick fox jumps over
            </h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            <p className="text-xs text-[#737373] leading-relaxed">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
            <p className="text-xs text-[#737373] leading-relaxed">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
            </p>
          </div>

          {/* Column 3: Bullet Lists with Chevron Icons */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#252B42] mb-3">
                the quick fox jumps over
              </h3>
              <ul className="space-y-2 text-xs font-bold text-[#737373]">
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#252B42] mb-3">
                the quick fox jumps over
              </h3>
              <ul className="space-y-2 text-xs font-bold text-[#737373]">
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                  <span>the quick fox jumps over the lazy dog</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BESTSELLER PRODUCTS Section matching desktop-product-2 & desktop-product-3 */}
      <section className="bg-[#FAFAFA] py-16 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-4 mb-8">
            <h2 className="text-2xl font-black text-[#252B42] uppercase tracking-tight">
              BESTSELLER PRODUCTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {bestsellerProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group text-left"
              >
                <div className="h-72 overflow-hidden bg-gray-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col items-start space-y-1">
                  <h3 className="font-bold text-[#252B42] text-base group-hover:text-[#23A6F0] transition">
                    {p.name}
                  </h3>
                  <p className="text-xs font-bold text-[#737373]">
                    {p.department}
                  </p>

                  <div className="flex items-center space-x-2 pt-2 text-xs font-bold">
                    <span className="text-[#BDBDBD] line-through">${p.originalPrice}</span>
                    <span className="text-[#23856D]">${p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Clients Banner matching desktop-product-3 */}
      <div className="my-8">
        <ClientsSection />
      </div>
    </div>
  );
}
