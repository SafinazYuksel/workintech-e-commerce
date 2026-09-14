import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Plus,
  Edit2,
  Trash2,
  Phone,
  User,
  MapPin,
  X,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  fetchAddressList,
  addAddress,
  updateAddress,
  deleteAddress
} from '../store/actions/clientActions';
import { setAddress } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';

const TURKISH_CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
  'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
  'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum',
  'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir',
  'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir',
  'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir',
  'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak',
  'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressList = useSelector((state) => state.client.addressList) || [];
  const cart = useSelector((state) => state.shoppingCart.cart) || [];

  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [selectedBillingId, setSelectedBillingId] = useState(null);
  const [useSameAddressForBilling, setUseSameAddressForBilling] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Address Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: 'İstanbul',
      district: '',
      neighborhood: ''
    }
  });

  useEffect(() => {
    dispatch(fetchAddressList());
  }, [dispatch]);

  // Set default selected address when addressList loads
  useEffect(() => {
    if (addressList.length > 0 && !selectedShippingId) {
      setSelectedShippingId(addressList[0].id);
      setSelectedBillingId(addressList[0].id);
    }
  }, [addressList, selectedShippingId]);

  // Price calculations for Order Summary
  const checkedItems = cart.filter((item) => item.checked !== false);
  const productsSubtotal = checkedItems.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    return sum + price * item.count;
  }, 0);

  const shippingPrice = productsSubtotal > 0 ? 29.99 : 0;
  const shippingDiscount = productsSubtotal >= 150 ? 29.99 : 0;
  const grandTotal = Math.max(0, productsSubtotal + shippingPrice - shippingDiscount);

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    reset({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: 'İstanbul',
      district: '',
      neighborhood: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (addr, e) => {
    e.stopPropagation();
    setEditingAddress(addr);
    reset({
      title: addr.title || '',
      name: addr.name || '',
      surname: addr.surname || '',
      phone: addr.phone || '',
      city: addr.city || 'İstanbul',
      district: addr.district || '',
      neighborhood: addr.neighborhood || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (addressId, e) => {
    e.stopPropagation();
    if (window.confirm('Bu adresi silmek istediğinize emin misiniz?')) {
      await dispatch(deleteAddress(addressId));
      if (selectedShippingId === addressId) {
        setSelectedShippingId(null);
      }
    }
  };

  const onSubmitAddress = async (data) => {
    const payload = {
      title: data.title,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      city: data.city,
      district: data.district,
      neighborhood: data.neighborhood
    };

    let result;
    if (editingAddress) {
      payload.id = editingAddress.id;
      result = await dispatch(updateAddress(payload));
    } else {
      result = await dispatch(addAddress(payload));
    }

    if (result.success) {
      setIsModalOpen(false);
      reset();
    }
  };

  const handleSaveAndContinue = () => {
    if (!selectedShippingId) {
      toast.warning('Lütfen devam etmek için bir teslimat adresi seçiniz.');
      return;
    }

    const selectedAddr = addressList.find((a) => a.id === selectedShippingId);
    dispatch(setAddress(selectedAddr));
    toast.success('Adres bilgisi kaydedildi. Ödeme adımına geçiliyor.');
    setActiveStep(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 2-Step Header Bar */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Step 1 Tab */}
        <div
          onClick={() => setActiveStep(1)}
          className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
            activeStep === 1
              ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-100'
              : 'bg-slate-50 border-gray-200 text-slate-500 hover:bg-white'
          }`}
        >
          <span
            className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm ${
              activeStep === 1 ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            1
          </span>
          <div>
            <h3 className={`font-bold text-sm ${activeStep === 1 ? 'text-orange-600' : 'text-slate-700'}`}>
              Adres Bilgileri
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">
              {selectedShippingId
                ? addressList.find((a) => a.id === selectedShippingId)?.title || 'Adres Seçildi'
                : 'Teslimat & Fatura Adresi'}
            </p>
          </div>
        </div>

        {/* Step 2 Tab */}
        <div
          onClick={() => {
            if (selectedShippingId) setActiveStep(2);
            else toast.warning('Lütfen önce bir teslimat adresi seçiniz.');
          }}
          className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
            activeStep === 2
              ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-100'
              : 'bg-slate-50 border-gray-200 text-slate-500 hover:bg-white'
          }`}
        >
          <span
            className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm ${
              activeStep === 2 ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            2
          </span>
          <div>
            <h3 className={`font-bold text-sm ${activeStep === 2 ? 'text-orange-600' : 'text-slate-700'}`}>
              Ödeme Seçenekleri
            </h3>
            <p className="text-xs text-slate-500">Banka/Kredi Kartı ile güvenli ödeme</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Address Information & Selection (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {activeStep === 1 ? (
            <>
              {/* Notice Banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-800">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Kurumsal faturalı alışveriş yapmak için <strong>"Faturamı Aynı Adrese Gönder"</strong> tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.
                </p>
              </div>

              {/* Shipping Address Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900">Teslimat Adresi</h2>
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={useSameAddressForBilling}
                      onChange={(e) => setUseSameAddressForBilling(e.target.checked)}
                      className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                    />
                    <span>Faturamı Aynı Adrese Gönder</span>
                  </label>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Add New Address Card */}
                  <div
                    onClick={handleOpenAddModal}
                    className="border-2 border-dashed border-gray-200 hover:border-orange-500 bg-slate-50/50 hover:bg-orange-50/30 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer min-h-[160px] transition text-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center mb-2 shadow-sm transition">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-orange-600 transition">
                      + Yeni Adres Ekle
                    </span>
                  </div>

                  {/* Address List Cards */}
                  {addressList.map((addr) => {
                    const isSelected = selectedShippingId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedShippingId(addr.id)}
                        className={`border rounded-xl p-4 cursor-pointer transition relative flex flex-col justify-between min-h-[160px] ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/20 ring-2 ring-orange-100 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div>
                          {/* Card Top Row */}
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-2 font-bold text-xs text-slate-900 cursor-pointer">
                              <input
                                type="radio"
                                name="shippingAddress"
                                checked={isSelected}
                                onChange={() => setSelectedShippingId(addr.id)}
                                className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
                              />
                              <span>{addr.title || 'Adres'}</span>
                            </label>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => handleOpenEditModal(addr, e)}
                                className="p-1 text-slate-400 hover:text-orange-600 transition text-xs flex items-center gap-1 font-semibold"
                                title="Düzenle"
                              >
                                <Edit2 className="w-3.5 h-3.5" /> Düzenle
                              </button>
                              <button
                                onClick={(e) => handleDelete(addr.id, e)}
                                className="p-1 text-slate-400 hover:text-red-600 transition"
                                title="Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Address Details */}
                          <div className="space-y-1 text-xs text-slate-600 pl-6">
                            <p className="font-semibold text-slate-800 flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-slate-400" /> {addr.name} {addr.surname}
                            </p>
                            <p className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-slate-400" /> {addr.phone}
                            </p>
                            <p className="flex items-start gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                              <span>
                                {addr.neighborhood}, {addr.district} / {addr.city}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Billing Address Section (If not same) */}
              {!useSameAddressForBilling && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-4">
                    Fatura Adresi
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addressList.map((addr) => {
                      const isSelected = selectedBillingId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedBillingId(addr.id)}
                          className={`border rounded-xl p-4 cursor-pointer transition relative flex flex-col justify-between min-h-[140px] ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50/20 ring-2 ring-orange-100 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-2 font-bold text-xs text-slate-900 cursor-pointer">
                              <input
                                type="radio"
                                name="billingAddress"
                                checked={isSelected}
                                onChange={() => setSelectedBillingId(addr.id)}
                                className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
                              />
                              <span>{addr.title}</span>
                            </label>
                          </div>
                          <div className="space-y-1 text-xs text-slate-600 pl-6">
                            <p className="font-semibold text-slate-800">{addr.name} {addr.surname}</p>
                            <p>{addr.neighborhood}, {addr.district} / {addr.city}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Step 2 Placeholder / Payment Section */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Adres Bilgileri Onaylandı</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Seçilen Adres: <strong>{addressList.find((a) => a.id === selectedShippingId)?.title}</strong> ({addressList.find((a) => a.id === selectedShippingId)?.city})
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Adresi Değiştir
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Card (1 Col) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Top Save & Continue Button */}
          <button
            onClick={handleSaveAndContinue}
            disabled={!selectedShippingId}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
              selectedShippingId
                ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed shadow-none'
            }`}
          >
            Kaydet ve Devam Et <ChevronRight className="w-5 h-5" />
          </button>

          {/* Terms Agreement Checkbox */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-snug">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer mt-0.5"
              />
              <span>
                <strong>Ön Bilgilendirme Koşulları</strong>'nı ve <strong>Mesafeli Satış Sözleşmesi</strong>'ni okudum, onaylıyorum.
              </span>
            </label>
          </div>

          {/* Summary Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">
              Sipariş Özeti
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Ürünün Toplamı</span>
                <span className="font-bold text-slate-800">
                  ₺{productsSubtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Kargo Toplam</span>
                <span className="font-bold text-slate-800">
                  ₺{shippingPrice.toFixed(2)}
                </span>
              </div>

              {shippingDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span>150 TL ve Üzeri Kargo Bedava</span>
                  <span>-₺{shippingDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-black text-slate-900">Toplam</span>
                <span className="text-2xl font-black text-orange-600">
                  ₺{grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Save & Continue Button */}
          <button
            onClick={handleSaveAndContinue}
            disabled={!selectedShippingId}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
              selectedShippingId
                ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed shadow-none'
            }`}
          >
            Kaydet ve Devam Et <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 justify-center pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit SSL ile %100 Güvenli Ödeme</span>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative my-8 animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
            </h3>

            <form onSubmit={handleSubmit(onSubmitAddress)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adres Başlığı (Address Title) *
                </label>
                <input
                  type="text"
                  placeholder="örn: Ev adresi, İş adresi"
                  {...register('title', { required: 'Adres başlığı zorunludur.' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {errors.title && <p className="text-xs text-red-500 mt-0.5">{errors.title.message}</p>}
              </div>

              {/* Name & Surname */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ad (Name) *</label>
                  <input
                    type="text"
                    placeholder="Alişan"
                    {...register('name', { required: 'Ad zorunludur.' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Soyad (Surname) *</label>
                  <input
                    type="text"
                    placeholder="Karababa"
                    {...register('surname', { required: 'Soyad zorunludur.' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                  {errors.surname && <p className="text-xs text-red-500 mt-0.5">{errors.surname.message}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefon (Phone) *</label>
                <input
                  type="tel"
                  placeholder="05376845834"
                  {...register('phone', { required: 'Telefon numarası zorunludur.' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone.message}</p>}
              </div>

              {/* City & District */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">İl (City) *</label>
                  <select
                    {...register('city', { required: 'İl seçimi zorunludur.' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none bg-white"
                  >
                    {TURKISH_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">İlçe (District) *</label>
                  <input
                    type="text"
                    placeholder="Esenler"
                    {...register('district', { required: 'İlçe zorunludur.' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                  {errors.district && <p className="text-xs text-red-500 mt-0.5">{errors.district.message}</p>}
                </div>
              </div>

              {/* Neighborhood / Address Detail */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mahalle & Adres Detayı (Neighborhood) *
                </label>
                <textarea
                  rows={3}
                  placeholder="Mahalle, sokak, bina no ve daire detayları..."
                  {...register('neighborhood', { required: 'Adres detayı zorunludur.' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {errors.neighborhood && <p className="text-xs text-red-500 mt-0.5">{errors.neighborhood.message}</p>}
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex justify-end gap-3 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
