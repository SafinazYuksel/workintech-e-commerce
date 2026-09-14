import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart as CartIcon,
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  Tag
} from 'lucide-react';
import {
  updateCartItemCount,
  toggleCartItemCheck,
  removeFromCart,
  toggleSelectAll
} from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';

export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.shoppingCart.cart) || [];

  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Calculate checked items
  const checkedItems = cart.filter((item) => item.checked !== false);
  const isAllChecked = cart.length > 0 && checkedItems.length === cart.length;

  // Price calculations according to T19 requirements:
  // Products Total Price + Shipping Payment Price - Discount = Grand Total Price
  const productsSubtotal = checkedItems.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    return sum + price * item.count;
  }, 0);

  const shippingPrice = productsSubtotal > 0 ? 29.99 : 0;
  const shippingDiscount = productsSubtotal >= 150 ? 29.99 : 0;
  const grandTotal = Math.max(0, productsSubtotal + shippingPrice - shippingDiscount - appliedDiscount);

  const handleToggleAll = () => {
    dispatch(toggleSelectAll(!isAllChecked));
  };

  const handleRemove = (productId, productName) => {
    dispatch(removeFromCart(productId));
    toast.info(`${productName || 'Ürün'} sepetten çıkarıldı.`);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    if (promoCode.trim().toUpperCase() === 'WORKINTECH' || promoCode.trim().toUpperCase() === 'INDIRIM10') {
      const discount = productsSubtotal * 0.1;
      setAppliedDiscount(discount);
      toast.success('İndirim kodu başarıyla uygulandı! (%10 İndirim)');
    } else {
      toast.error('Geçersiz indirim kodu.');
    }
  };

  const handleCreateOrderClick = () => {
    if (checkedItems.length === 0) {
      toast.warning('Lütfen sipariş vermek için en az bir ürün seçiniz.');
      return;
    }
    navigate('/order');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-lg mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
            <CartIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sepetiniz Henüz Boş</h2>
          <p className="text-slate-500 text-sm mb-8">
            Harika ürünlerimizi keşfetmek ve sepetinizi doldurmak için hemen alışverişe başlayın!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Alışverişe Başla (Go to Shop)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Sepetim ({cart.length} Ürün)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Seçili ürünlerinizi kontrol edip siparişinizi tamamlayabilirsiniz.
          </p>
        </div>
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Alışverişe Devam Et
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2 Cols): Products Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Toolbar */}
            <div className="px-6 py-4 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={handleToggleAll}
                  className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tümünü Seç ({checkedItems.length}/{cart.length})
                </span>
              </label>

              {checkedItems.length > 0 && (
                <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                  {checkedItems.length} ürün seçildi
                </span>
              )}
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="py-3 px-4 w-10 text-center">Seç</th>
                    <th className="py-3 px-4">Ürün Bilgisi</th>
                    <th className="py-3 px-4 text-center">Birim Fiyat</th>
                    <th className="py-3 px-4 text-center">Adet</th>
                    <th className="py-3 px-4 text-right">Toplam</th>
                    <th className="py-3 px-4 w-12 text-center">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {cart.map((item) => {
                    const { product, count, checked } = item;
                    const isChecked = checked !== false;
                    const price = Number(product?.price || 0);
                    const itemTotal = price * count;
                    const imageUrl =
                      product?.images && product.images.length > 0
                        ? product.images[0].url
                        : 'https://via.placeholder.com/150?text=No+Image';

                    return (
                      <tr
                        key={product.id}
                        className={`transition hover:bg-slate-50/60 ${
                          !isChecked ? 'opacity-60 bg-gray-50/30' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => dispatch(toggleCartItemCheck(product.id))}
                            className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                          />
                        </td>

                        {/* Product Info */}
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm truncate max-w-xs sm:max-w-sm">
                                {product.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                {product.description || `Ürün Kodu: #${product.id}`}
                              </p>
                              <span className="inline-block text-[10px] font-semibold text-slate-400 mt-1 bg-slate-100 px-1.5 py-0.5 rounded">
                                Stok: {product.stock || 50}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Unit Price */}
                        <td className="py-4 px-4 text-center font-medium text-slate-700 whitespace-nowrap">
                          ₺{price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </td>

                        {/* Quantity Controls */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <button
                              onClick={() => dispatch(updateCartItemCount(product.id, count - 1))}
                              className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-slate-50 transition border-r border-gray-100"
                              title="Adet Azalt"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-bold text-xs text-slate-800">
                              {count}
                            </span>
                            <button
                              onClick={() => dispatch(updateCartItemCount(product.id, count + 1))}
                              className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-slate-50 transition border-l border-gray-100"
                              title="Adet Artır"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Item Subtotal */}
                        <td className="py-4 px-4 text-right font-black text-orange-600 whitespace-nowrap">
                          ₺{itemTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                        </td>

                        {/* Delete Action */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => handleRemove(product.id, product.name)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Ürünü Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): T19 Order Summary Box */}
        <div className="lg:col-span-1 space-y-4">
          {/* Top Primary "Create Order" Button */}
          <button
            onClick={handleCreateOrderClick}
            disabled={checkedItems.length === 0}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
              checkedItems.length > 0
                ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed shadow-none'
            }`}
          >
            Create Order <ChevronRight className="w-5 h-5" />
          </button>

          {/* Order Summary Card Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">
              Sipariş Özeti (Order Summary)
            </h3>

            {/* Line Items */}
            <div className="space-y-3 text-sm">
              {/* Products Total Price */}
              <div className="flex justify-between text-slate-600">
                <span>Ürünün Toplamı</span>
                <span className="font-bold text-slate-800">
                  ₺{productsSubtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Shipping Payment Price */}
              <div className="flex justify-between text-slate-600">
                <span>Kargo Toplam</span>
                <span className="font-bold text-slate-800">
                  ₺{shippingPrice.toFixed(2)}
                </span>
              </div>

              {/* Shipping Discount (-29.99 TL if >= 150 TL) */}
              {shippingDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                  <span>-₺{shippingDiscount.toFixed(2)}</span>
                </div>
              )}

              {/* Applied Promo Code Discount */}
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span>İndirim Kodu Uyum İndirimi</span>
                  <span>-₺{appliedDiscount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              {/* Grand Total Price */}
              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-black text-slate-900">Grand Total (Toplam)</span>
                <span className="text-2xl font-black text-orange-600">
                  ₺{grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Promo Code Input Accordion / Toggle */}
            <div className="pt-2">
              {!showPromoInput ? (
                <button
                  onClick={() => setShowPromoInput(true)}
                  className="w-full py-2.5 px-4 border border-dashed border-gray-300 hover:border-orange-500 rounded-xl text-xs font-bold text-slate-600 hover:text-orange-600 transition flex items-center justify-center gap-2 bg-slate-50/50"
                >
                  <Tag className="w-3.5 h-3.5 text-orange-500" /> + İNDİRİM KODU GİR
                </button>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="İndirim kodu (örn: INDIRIM10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition"
                  >
                    Uygula
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Secondary "Create Order" Button */}
          <button
            onClick={handleCreateOrderClick}
            disabled={checkedItems.length === 0}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
              checkedItems.length > 0
                ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed shadow-none'
            }`}
          >
            Create Order <ChevronRight className="w-5 h-5" />
          </button>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-xs text-slate-400 justify-center pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit SSL ile %100 Güvenli Alışveriş</span>
          </div>
        </div>
      </div>
    </div>
  );
}
