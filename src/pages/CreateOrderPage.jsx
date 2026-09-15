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
  Info,
  CreditCard as CardIcon,
  Lock,
  Check
} from 'lucide-react';
import {
  fetchAddressList,
  addAddress,
  updateAddress,
  deleteAddress,
  fetchCreditCards,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard
} from '../store/actions/clientActions';
import { setAddress, setPayment, setCart, createOrder } from '../store/actions/shoppingCartActions';
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
  const creditCards = useSelector((state) => state.client.creditCards) || [];
  const cart = useSelector((state) => state.shoppingCart.cart) || [];

  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [selectedBillingId, setSelectedBillingId] = useState(null);
  const [useSameAddressForBilling, setUseSameAddressForBilling] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Credit Card State (T21)
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [use3DSecure, setUse3DSecure] = useState(true);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  // Order Success State (T22)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState(null);
  const [isOrderSubmitting, setIsOrderSubmitting] = useState(false);

  // Address Form Hook
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    reset: resetAddress,
    formState: { errors: addressErrors, isSubmitting: isAddressSubmitting }
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

  // Card Form Hook
  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    reset: resetCard,
    formState: { errors: cardErrors, isSubmitting: isCardSubmitting }
  } = useForm({
    defaultValues: {
      card_no: '',
      expire_month: 12,
      expire_year: 2028,
      name_on_card: '',
      cvv: ''
    }
  });

  useEffect(() => {
    dispatch(fetchAddressList());
    dispatch(fetchCreditCards());
  }, [dispatch]);

  // Set default selected address
  useEffect(() => {
    if (addressList.length > 0 && !selectedShippingId) {
      setSelectedShippingId(addressList[0].id);
      setSelectedBillingId(addressList[0].id);
    }
  }, [addressList, selectedShippingId]);

  // Set default selected card
  useEffect(() => {
    if (creditCards.length > 0 && !selectedCardId) {
      setSelectedCardId(creditCards[0].id);
    }
  }, [creditCards, selectedCardId]);

  // Price calculations for Order Summary
  const checkedItems = cart.filter((item) => item.checked !== false);
  const productsSubtotal = checkedItems.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    return sum + price * item.count;
  }, 0);

  const shippingPrice = productsSubtotal > 0 ? 29.99 : 0;
  const shippingDiscount = productsSubtotal >= 150 ? 29.99 : 0;
  const grandTotal = Math.max(0, productsSubtotal + shippingPrice - shippingDiscount);

  // Address Handlers
  const handleOpenAddAddressModal = () => {
    setEditingAddress(null);
    resetAddress({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: 'İstanbul',
      district: '',
      neighborhood: ''
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddressModal = (addr, e) => {
    e.stopPropagation();
    setEditingAddress(addr);
    resetAddress({
      title: addr.title || '',
      name: addr.name || '',
      surname: addr.surname || '',
      phone: addr.phone || '',
      city: addr.city || 'İstanbul',
      district: addr.district || '',
      neighborhood: addr.neighborhood || ''
    });
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = async (addressId, e) => {
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
      setIsAddressModalOpen(false);
      resetAddress();
    }
  };

  // Card Handlers (T21)
  const handleOpenAddCardModal = () => {
    setEditingCard(null);
    resetCard({
      card_no: '',
      expire_month: 12,
      expire_year: 2028,
      name_on_card: '',
      cvv: ''
    });
    setIsCardModalOpen(true);
  };

  const handleOpenEditCardModal = (card, e) => {
    e.stopPropagation();
    setEditingCard(card);
    resetCard({
      card_no: card.card_no || '',
      expire_month: card.expire_month || 12,
      expire_year: card.expire_year || 2028,
      name_on_card: card.name_on_card || '',
      cvv: '123'
    });
    setIsCardModalOpen(true);
  };

  const handleDeleteCard = async (cardId, e) => {
    e.stopPropagation();
    if (window.confirm('Bu kartı silmek istediğinize emin misiniz?')) {
      await dispatch(deleteCreditCard(cardId));
      if (selectedCardId === cardId) {
        setSelectedCardId(null);
      }
    }
  };

  const onSubmitCard = async (data) => {
    const cleanCardNo = data.card_no.replace(/\s+/g, '');
    const payload = {
      card_no: cleanCardNo,
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year),
      name_on_card: data.name_on_card
    };

    let result;
    if (editingCard) {
      payload.id = editingCard.id;
      result = await dispatch(updateCreditCard(payload));
    } else {
      result = await dispatch(addCreditCard(payload));
    }

    if (result.success) {
      setIsCardModalOpen(false);
      setShowNewCardForm(false);
      resetCard();
    }
  };

  const handleSaveAndContinueAddress = () => {
    if (!selectedShippingId) {
      toast.warning('Lütfen devam etmek için bir teslimat adresi seçiniz.');
      return;
    }

    const selectedAddr = addressList.find((a) => a.id === selectedShippingId);
    dispatch(setAddress(selectedAddr));
    toast.success('Adres bilginiz kaydedildi. Ödeme adımına geçiliyor.');
    setActiveStep(2);
  };

  const handleCompletePayment = async () => {
    if (!agreedTerms) {
      toast.warning('Lütfen devam etmeden önce Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Koşullarını onaylayınız.');
      return;
    }

    if (!selectedShippingId) {
      toast.warning('Lütfen bir teslimat adresi seçiniz.');
      return;
    }

    const selectedCard = creditCards.find((c) => c.id === selectedCardId);
    if (!selectedCard && creditCards.length > 0) {
      toast.warning('Lütfen ödeme yapmak için bir kart seçiniz.');
      return;
    }

    setIsOrderSubmitting(true);

    const cleanCardNo = Number(String(selectedCard?.card_no || '1234123412341234').replace(/\D/g, '')) || 1234123412341234;
    const nowIso = new Date().toISOString().slice(0, 19);

    const orderProducts = checkedItems.map((item) => ({
      product_id: Number(item.product.id),
      count: Number(item.count),
      detail: item.product.name || 'Varsayılan Ürün Detayı'
    }));

    const orderPayload = {
      address_id: Number(selectedShippingId),
      order_date: nowIso,
      card_no: cleanCardNo,
      card_name: selectedCard?.name_on_card || 'Kayıtlı Müşteri',
      card_expire_month: Number(selectedCard?.expire_month || 12),
      card_expire_year: Number(selectedCard?.expire_year || 2028),
      card_ccv: 321,
      price: Number(grandTotal),
      products: orderProducts
    };

    const result = await dispatch(createOrder(orderPayload));
    setIsOrderSubmitting(false);

    if (result.success) {
      setCreatedOrderData(result.data || orderPayload);
      setIsSuccessModalOpen(true);
    }
  };

  const formatCardNumber = (cardNo) => {
    if (!cardNo) return '**** **** **** ****';
    const str = String(cardNo).replace(/\s+/g, '');
    if (str.length >= 16) {
      return `${str.slice(0, 4)} ${str.slice(4, 6)}** **** ${str.slice(12)}`;
    }
    return str;
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
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {activeStep === 1 ? (
            /* STEP 1: ADDRESS INFORMATION */
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
                    onClick={handleOpenAddAddressModal}
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
                                onClick={(e) => handleOpenEditAddressModal(addr, e)}
                                className="p-1 text-slate-400 hover:text-orange-600 transition text-xs flex items-center gap-1 font-semibold"
                                title="Düzenle"
                              >
                                <Edit2 className="w-3.5 h-3.5" /> Düzenle
                              </button>
                              <button
                                onClick={(e) => handleDeleteAddress(addr.id, e)}
                                className="p-1 text-slate-400 hover:text-red-600 transition"
                                title="Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

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
            </>
          ) : (
            /* STEP 2: CREDIT CARD PAYMENT (T21) */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              {/* Header Radio & Subtitle */}
              <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
                    <input type="radio" checked readOnly className="w-4 h-4 text-orange-600" />
                    <span>Kart ile Öde</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 pl-6">
                    Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddCardModal}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Başka bir Kart ile Ödeme Yap / Yeni Kart Ekle
                </button>
              </div>

              {/* Cards Grid & Form Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Saved Credit Cards Column */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Kart Bilgileri (Kayıtlı Kartlarım)
                  </h3>

                  {creditCards.length === 0 ? (
                    <div className="p-6 border border-dashed border-gray-200 rounded-xl text-center space-y-3">
                      <CardIcon className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-500">Kayıtlı kartınız bulunmuyor.</p>
                      <button
                        onClick={handleOpenAddCardModal}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition shadow-sm"
                      >
                        + Kart Ekle
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                      {creditCards.map((card) => {
                        const isSelected = selectedCardId === card.id;
                        return (
                          <div
                            key={card.id}
                            onClick={() => setSelectedCardId(card.id)}
                            className={`border rounded-xl p-4 cursor-pointer transition relative ${
                              isSelected
                                ? 'border-orange-500 bg-orange-50/20 ring-2 ring-orange-100 shadow-sm'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <label className="flex items-center gap-2 font-bold text-xs text-slate-900 cursor-pointer">
                                <input
                                  type="radio"
                                  name="creditCardSelect"
                                  checked={isSelected}
                                  onChange={() => setSelectedCardId(card.id)}
                                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                />
                                <span>{card.name_on_card || 'Kredi Kartı'}</span>
                              </label>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => handleOpenEditCardModal(card, e)}
                                  className="p-1 text-slate-400 hover:text-orange-600 transition"
                                  title="Düzenle"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteCard(card.id, e)}
                                  className="p-1 text-slate-400 hover:text-red-600 transition"
                                  title="Sil"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Card Display Mockup */}
                            <div className="mt-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-3 space-y-2 text-xs shadow">
                              <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                                <span>CREDIT CARD</span>
                                <CardIcon className="w-4 h-4 text-amber-400" />
                              </div>
                              <p className="font-mono text-sm tracking-wider font-semibold">
                                {formatCardNumber(card.card_no)}
                              </p>
                              <div className="flex justify-between items-end text-[10px] text-slate-300">
                                <div>
                                  <span className="block text-[8px] text-slate-400">KART SAHİBİ</span>
                                  <span className="font-bold uppercase">{card.name_on_card}</span>
                                </div>
                                <div>
                                  <span className="block text-[8px] text-slate-400">SKT</span>
                                  <span className="font-mono font-bold">{card.expire_month}/{card.expire_year}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Installment Options Column (Taksit Seçenekleri) */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Taksit Seçenekleri
                  </h3>
                  <p className="text-xs text-slate-500">Kartınıza uygun taksit seçeneğini seçiniz</p>

                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 font-bold border-b border-gray-200">
                          <th className="py-2.5 px-3">Taksit Sayısı</th>
                          <th className="py-2.5 px-3 text-right">Aylık Ödeme</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 bg-orange-50/30">
                          <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                            <input type="radio" checked readOnly className="w-4 h-4 text-orange-600" />
                            Tek Çekim
                          </td>
                          <td className="py-3 px-3 text-right font-black text-orange-600">
                            ₺{grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 3D Secure Checkbox */}
              <div className="border-t border-gray-100 pt-4">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={use3DSecure}
                    onChange={(e) => setUse3DSecure(e.target.checked)}
                    className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                  />
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>3D Secure ile ödemek istiyorum</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Card (1 Col) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Top Primary Action Button */}
          {activeStep === 1 ? (
            <button
              onClick={handleSaveAndContinueAddress}
              disabled={!selectedShippingId}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
                selectedShippingId
                  ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              Kaydet ve Devam Et <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCompletePayment}
              disabled={!agreedTerms || (creditCards.length === 0 && !selectedCardId)}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
                agreedTerms && (selectedCardId || creditCards.length > 0)
                  ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              Ödeme Yap <Lock className="w-4 h-4" />
            </button>
          )}

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

          {/* Bottom Action Button */}
          {activeStep === 1 ? (
            <button
              onClick={handleSaveAndContinueAddress}
              disabled={!selectedShippingId}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
                selectedShippingId
                  ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              Kaydet ve Devam Et <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCompletePayment}
              disabled={!agreedTerms || (creditCards.length === 0 && !selectedCardId)}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-white text-center text-base shadow-md transition duration-200 flex items-center justify-center gap-2 ${
                agreedTerms && (selectedCardId || creditCards.length > 0)
                  ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              Ödeme Yap <Lock className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-400 justify-center pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit SSL ile %100 Güvenli Ödeme</span>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative my-8 animate-fadeIn">
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
            </h3>

            <form onSubmit={handleSubmitAddress(onSubmitAddress)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adres Başlığı (Address Title) *
                </label>
                <input
                  type="text"
                  placeholder="örn: Ev adresi, İş adresi"
                  {...registerAddress('title', { required: 'Adres başlığı zorunludur.' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {addressErrors.title && <p className="text-xs text-red-500 mt-0.5">{addressErrors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ad (Name) *</label>
                  <input
                    type="text"
                    placeholder="Alişan"
                    {...registerAddress('name', { required: 'Ad zorunludur.' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                  {addressErrors.name && <p className="text-xs text-red-500 mt-0.5">{addressErrors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Soyad (Surname) *</label>
                  <input
                    type="text"
                    placeholder="Karababa"
                    {...registerAddress('surname', { required: 'Soyad zorunludur.' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                  {addressErrors.surname && <p className="text-xs text-red-500 mt-0.5">{addressErrors.surname.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefon (Phone) *</label>
                <input
                  type="tel"
                  placeholder="05376845834"
                  {...registerAddress('phone', { required: 'Telefon numarası zorunludur.' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {addressErrors.phone && <p className="text-xs text-red-500 mt-0.5">{addressErrors.phone.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">İl (City) *</label>
                  <select
                    {...registerAddress('city', { required: 'İl seçimi zorunludur.' })}
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
                    {...registerAddress('district', { required: 'İlçe zorunludur.' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  />
                  {addressErrors.district && <p className="text-xs text-red-500 mt-0.5">{addressErrors.district.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mahalle & Adres Detayı (Neighborhood) *
                </label>
                <textarea
                  rows={3}
                  placeholder="Mahalle, sokak, bina no ve daire detayları..."
                  {...registerAddress('neighborhood', { required: 'Adres detayı zorunludur.' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {addressErrors.neighborhood && <p className="text-xs text-red-500 mt-0.5">{addressErrors.neighborhood.message}</p>}
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isAddressSubmitting}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shadow-sm disabled:opacity-50"
                >
                  {isAddressSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Credit Card Form Modal (T21) */}
      {isCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative my-8 animate-fadeIn">
            <button
              onClick={() => setIsCardModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CardIcon className="w-5 h-5 text-orange-500" />
              {editingCard ? 'Kredi Kartını Düzenle' : 'Yeni Kredi Kartı Ekle'}
            </h3>

            <form onSubmit={handleSubmitCard(onSubmitCard)} className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kart Numarası (Card Number) *
                </label>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  maxLength={19}
                  {...registerCard('card_no', {
                    required: 'Kart numarası zorunludur.',
                    minLength: { value: 15, message: 'Geçerli bir kart numarası giriniz.' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {cardErrors.card_no && <p className="text-xs text-red-500 mt-0.5">{cardErrors.card_no.message}</p>}
              </div>

              {/* Name on Card */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kart Üzerindeki İsim (Name on Card) *
                </label>
                <input
                  type="text"
                  placeholder="Ali Baş"
                  {...registerCard('name_on_card', { required: 'Kart üzerindeki isim zorunludur.' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm uppercase focus:ring-1 focus:ring-orange-500 focus:outline-none"
                />
                {cardErrors.name_on_card && <p className="text-xs text-red-500 mt-0.5">{cardErrors.name_on_card.message}</p>}
              </div>

              {/* Expire Month & Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Son Kullanma Ay *</label>
                  <select
                    {...registerCard('expire_month', { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>
                        {m < 10 ? `0${m}` : m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Son Kullanma Yıl *</label>
                  <select
                    {...registerCard('expire_year', { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:outline-none bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => 2024 + i).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end gap-3 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCardModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isCardSubmitting}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shadow-sm disabled:opacity-50"
                >
                  {isCardSubmitting ? 'Kaydediliyor...' : 'Kartı Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Success Congratulations Modal (T22) */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center space-y-6 animate-fadeIn border border-emerald-100">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                🎉 Tebrikler!
              </h2>
              <p className="text-sm font-bold text-emerald-600 mt-1">
                Siparişiniz Başarıyla Oluşturuldu
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Siparişiniz başarıyla alındı ve hazırlanma sürecine geçti. Alışverişiniz için teşekkür ederiz!
              </p>
            </div>

            {createdOrderData && (
              <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 text-left border border-gray-100">
                <div className="flex justify-between text-slate-600">
                  <span>Sipariş No:</span>
                  <span className="font-bold text-slate-800">#{createdOrderData.id || Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tarih:</span>
                  <span className="font-semibold text-slate-800">{createdOrderData.order_date || new Date().toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ödenen Tutar:</span>
                  <span className="font-black text-orange-600 text-sm">₺{Number(createdOrderData.price || grandTotal).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            )}

            <div>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  navigate('/');
                }}
                className="w-full py-3.5 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 transition duration-200"
              >
                Alışverişe Devam Et (Home)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
