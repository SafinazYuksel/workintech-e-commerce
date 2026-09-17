import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Package,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar,
  CreditCard,
  MapPin,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { fetchOrders } from '../store/actions/shoppingCartActions';

export default function PreviousOrdersPage() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadOrders = async () => {
      setLoading(true);
      const data = await dispatch(fetchOrders());
      if (isMounted) {
        setOrders(data || []);
        // Automatically expand the latest order if available
        if (data && data.length > 0) {
          setExpandedOrderId(data[0].id);
        }
        setLoading(false);
      }
    };
    loadOrders();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600 mb-3" />
        <p className="text-gray-500 text-sm font-medium">Sipariş geçmişiniz yükleniyor...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-lg mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6">
            <Package className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Henüz Siparişiniz Bulunmuyor</h2>
          <p className="text-slate-500 text-sm mb-8">
            Verdiğiniz tüm siparişlerin geçmişini bu sayfada detaylıca görüntüleyebilirsiniz.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Geçmiş Siparişlerim (Previous Orders)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Toplam <span className="font-bold text-slate-800">{orders.length}</span> adet siparişiniz bulunmaktadır.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
        >
          <ShoppingBag className="w-4 h-4" /> Alışverişe Devam Et
        </Link>
      </div>

      {/* Orders List / Collapsible Panels */}
      <div className="space-y-4">
        {orders.map((order, idx) => {
          const isExpanded = expandedOrderId === order.id;
          const orderProducts = order.products || [];
          const totalProductCount = orderProducts.reduce((sum, p) => sum + (p.count || 1), 0);

          return (
            <div
              key={order.id || idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition duration-200"
            >
              {/* Collapsible Panel Header */}
              <div
                onClick={() => toggleExpand(order.id)}
                className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition ${
                  isExpanded ? 'bg-orange-50/20 border-b border-gray-100' : 'hover:bg-slate-50/60'
                }`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                  {/* Order ID & Date */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Sipariş No
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      #{order.id || idx + 100}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Sipariş Tarihi
                    </span>
                    <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(order.order_date)}
                    </span>
                  </div>

                  {/* Customer / Card Name */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Alıcı / Kart
                    </span>
                    <span className="text-xs font-semibold text-slate-700 truncate block mt-0.5">
                      {order.customer_name || order.card_name || 'Müşteri'}
                    </span>
                  </div>

                  {/* Total Price */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Toplam Tutar
                    </span>
                    <span className="text-sm font-black text-orange-600">
                      ₺{Number(order.price || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Right Action & Expand Toggle */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tamamlandı ({totalProductCount} Ürün)
                  </span>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Panel Content */}
              {isExpanded && (
                <div className="p-6 space-y-6 bg-white animate-fadeIn">
                  {/* Order Info Cards Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Payment Info */}
                    <div className="bg-slate-50/60 rounded-xl p-4 border border-gray-100 space-y-1.5">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-orange-500" /> Ödeme Bilgileri
                      </h4>
                      <p className="text-slate-600">
                        <strong>Kart Sahibi:</strong> {order.card_name || 'Belirtilmedi'}
                      </p>
                      <p className="text-slate-600">
                        <strong>Kart No:</strong> **** **** **** {String(order.card_no || '').slice(-4) || '1234'}
                      </p>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-slate-50/60 rounded-xl p-4 border border-gray-100 space-y-1.5">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-orange-500" /> Teslimat Adresi
                      </h4>
                      <p className="text-slate-600">
                        <strong>Adres ID:</strong> #{order.address_id || 1}
                      </p>
                      <p className="text-slate-600">
                        <strong>Durum:</strong> Teslim Edilmek Üzere Hazırlanıyor
                      </p>
                    </div>
                  </div>

                  {/* Products Data Table */}
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3">
                      Sipariş Edilen Ürünler ({orderProducts.length})
                    </h4>

                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-gray-100 text-[10px]">
                            <th className="py-3 px-4">Ürün Detayı</th>
                            <th className="py-3 px-4 text-center">Adet</th>
                            <th className="py-3 px-4 text-right">Birim / Toplam Fiyat</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {orderProducts.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="py-4 text-center text-slate-400">
                                Ürün detay bilgisi mevcut değil.
                              </td>
                            </tr>
                          ) : (
                            orderProducts.map((prod, pIdx) => {
                              const imgUrl =
                                prod.images && prod.images.length > 0
                                  ? prod.images[0].url
                                  : 'https://via.placeholder.com/100?text=Ürün';

                              return (
                                <tr key={prod.product_id || pIdx} className="hover:bg-slate-50/40">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center space-x-3">
                                      <img
                                        src={imgUrl}
                                        alt={prod.name || 'Ürün'}
                                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                                      />
                                      <div>
                                        <h5 className="font-bold text-slate-900 text-xs">
                                          {prod.name || prod.detail || `Ürün #${prod.product_id}`}
                                        </h5>
                                        {prod.detail && (
                                          <p className="text-[11px] text-slate-500 mt-0.5">
                                            {prod.detail}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-center font-bold text-slate-700 whitespace-nowrap">
                                    {prod.count || 1} Adet
                                  </td>
                                  <td className="py-3 px-4 text-right font-black text-orange-600 whitespace-nowrap">
                                    ₺{Number(prod.price || order.price || 0).toLocaleString('tr-TR', {
                                      minimumFractionDigits: 2
                                    })}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
