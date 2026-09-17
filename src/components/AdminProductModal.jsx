import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Plus, Edit2, Image, Package, Tag, DollarSign, Star } from 'lucide-react';
import { addProduct, updateProduct } from '../store/actions/productActions';
import { toast } from 'react-toastify';

export default function AdminProductModal({ isOpen, onClose, initialProduct = null }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);

  const isEdit = Boolean(initialProduct);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '25',
    rating: '4.8',
    category_id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
  });

  useEffect(() => {
    if (initialProduct) {
      const existingImg = initialProduct.images && initialProduct.images.length > 0
        ? initialProduct.images[0].url
        : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';

      setFormData({
        name: initialProduct.name || '',
        description: initialProduct.description || '',
        price: initialProduct.price !== undefined ? String(initialProduct.price) : '',
        stock: initialProduct.stock !== undefined ? String(initialProduct.stock) : '25',
        rating: initialProduct.rating !== undefined ? String(initialProduct.rating) : '4.8',
        category_id: initialProduct.category_id ? String(initialProduct.category_id) : '1',
        imageUrl: existingImg
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '25',
        rating: '4.8',
        category_id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
      });
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Lütfen ürün adını giriniz.');
      return;
    }
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      toast.error('Lütfen geçerli bir fiyat giriniz.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || 'Yüksek kaliteli ürün.',
      price: Number(formData.price),
      stock: Number(formData.stock) || 25,
      rating: Number(formData.rating) || 4.8,
      category_id: Number(formData.category_id) || 1,
      images: [{ url: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' }]
    };

    if (isEdit) {
      payload.id = initialProduct.id;
      dispatch(updateProduct(payload));
      toast.success('Ürün başarıyla güncellendi! (Admin)');
    } else {
      payload.id = Date.now();
      dispatch(addProduct(payload));
      toast.success('Yeni ürün başarıyla eklendi! (Admin)');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-purple-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base">
            {isEdit ? <Edit2 className="w-5 h-5 text-purple-200" /> : <Plus className="w-5 h-5 text-purple-200" />}
            <span>{isEdit ? 'Ürün Düzenle (Admin Yetkisi)' : 'Yeni Ürün Ekle (Admin Yetkisi)'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Ürün Adı */}
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
              Ürün Adı *
            </label>
            <div className="relative">
              <Package className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Örn: Premium Pamuklu T-Shirt"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Fiyat & Stok Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Fiyat (₺) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="149.99"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Stok Adedi
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="25"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Kategori & Puan Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Kategori
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                >
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="1">Tişört</option>
                      <option value="2">Ayakkabı</option>
                      <option value="3">Ceket</option>
                      <option value="4">Elbise</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Puan (Rating 1-5)
              </label>
              <div className="relative">
                <Star className="w-4 h-4 text-amber-400 absolute left-3 top-3 fill-current" />
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="4.8"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Görsel URL */}
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
              Görsel Bağlantısı (URL)
            </label>
            <div className="relative">
              <Image className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Image Preview */}
          {formData.imageUrl && (
            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-lg">
              <img
                src={formData.imageUrl}
                alt="Önizleme"
                className="w-12 h-12 object-cover rounded-md border border-gray-300"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <span className="text-xs font-medium text-gray-600">Görsel Önizlemesi</span>
            </div>
          )}

          {/* Açıklama */}
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
              Ürün Açıklaması
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ürün özelliklerini detaylıca yazınız..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-md transition"
            >
              {isEdit ? 'Değişiklikleri Kaydet' : 'Ürünü Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
