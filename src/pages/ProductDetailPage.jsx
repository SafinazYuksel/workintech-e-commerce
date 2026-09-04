import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2, Star, ShoppingCart, Check } from 'lucide-react';
import { fetchProductDetail } from '../store/actions/productActions';
import { setCart } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.product);
  const fetchState = useSelector((state) => state.product.fetchState);
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [productId, dispatch]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        count: newCart[existingIndex].count + 1
      };
    } else {
      newCart.push({ count: 1, product });
    }

    dispatch(setCart(newCart));
    setAddedToCart(true);
    toast.success(`${product.name} sepetinize eklendi!`);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (fetchState === 'FETCHING') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-3" />
        <p className="text-gray-500 text-sm font-medium">Ürün detayları yükleniyor...</p>
      </div>
    );
  }

  if (fetchState === 'FAILED' || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Ürün Bulunamadı</h3>
        <p className="text-gray-500 mb-6 text-sm">Aradığınız ürün mevcut değil veya yüklenirken bir hata oluştu.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Geri Dön
        </button>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: 'https://via.placeholder.com/600x600?text=No+Image', index: 0 }];

  const currentImage = images[selectedImageIndex]?.url || images[0]?.url;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-600 hover:text-indigo-600 transition group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Geri Dön (Back)
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Images */}
        <div className="flex flex-col space-y-4">
          <div className="w-full h-96 sm:h-[450px] bg-gray-50 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-contain p-2"
            />
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImageIndex === index
                      ? 'border-indigo-600 ring-2 ring-indigo-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md">
                Stok Kodu: #{product.id}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Stok Durumu: <span className={product.stock > 0 ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold'}>{product.stock} adet</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Sales */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm font-bold text-gray-800">
                  {product.rating || '4.5'}
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-500">
                {product.sell_count || 0} adet satıldı
              </span>
            </div>

            {/* Price */}
            <div className="pt-2">
              <span className="text-3xl font-black text-indigo-600">
                ₺{Number(product.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Ürün Açıklaması</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Add to Cart Action */}
          <div className="border-t border-gray-100 pt-6 mt-8">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-white shadow-md transition duration-200 ${
                addedToCart
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" /> Sepete Eklendi!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Sepete Ekle (Add to Cart)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
