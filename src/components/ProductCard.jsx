import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const mainImage = product.images && product.images.length > 0
    ? product.images[0].url
    : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';

  const handleClick = () => {
    // Construct proper URL structure: /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
    const slug = product.name
      ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : 'product';
    navigate(`/shop/kadin/ceket/${product.category_id || 1}/${slug}/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between text-left">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
            {product.category_name || 'English Department'}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description || 'Quality product from our latest collection.'}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-indigo-600">
              ₺{Number(product.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center text-amber-400 text-xs font-bold bg-amber-50 px-2 py-1 rounded">
            <Star className="w-3.5 h-3.5 fill-current mr-1" />
            {product.rating || '4.5'}
          </div>
        </div>
      </div>
    </div>
  );
}
