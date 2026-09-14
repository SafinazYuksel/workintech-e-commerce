import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutGrid, List, ChevronRight, Filter as FilterIcon, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories } from '../store/actions/productActions';

export default function ShopPage() {
  const { categoryId, gender, categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product.productList);
  const categories = useSelector((state) => state.product.categories);
  const fetchState = useSelector((state) => state.product.fetchState);
  const total = useSelector((state) => state.product.total);

  const [viewMode, setViewMode] = useState('grid');
  const [filterInput, setFilterInput] = useState(searchParams.get('filter') || '');
  const [filterState, setFilterState] = useState(searchParams.get('filter') || '');
  const [sortState, setSortState] = useState(searchParams.get('sort') || '');

  // 1. Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // 2. Fetch products whenever categoryId, filterState, or sortState changes
  useEffect(() => {
    const params = {};
    if (categoryId) params.category = categoryId;
    if (filterState) params.filter = filterState;
    if (sortState) params.sort = sortState;

    dispatch(fetchProducts(params));
  }, [categoryId, filterState, sortState, dispatch]);

  // 3. Handle Filter submit / change
  const handleFilterSubmit = (e) => {
    if (e) e.preventDefault();
    setFilterState(filterInput);

    // Update query params in URL while keeping existing
    const newParams = new URLSearchParams(searchParams);
    if (filterInput) {
      newParams.set('filter', filterInput);
    } else {
      newParams.delete('filter');
    }
    setSearchParams(newParams);
  };

  // 4. Handle Sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortState(value);

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  // 5. Handle Category selection
  const handleCategoryClick = (cat) => {
    const catGender = cat.gender === 'k' ? 'kadin' : 'erkek';
    const slug = cat.title ? cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'kategori';

    // Preserve filter & sort search params when navigating category
    const searchString = searchParams.toString() ? `?${searchParams.toString()}` : '';
    navigate(`/shop/${catGender}/${slug}/${cat.id}${searchString}`);
  };

  // Sample default categories if API hasn't loaded
  const displayCategories = categories && categories.length > 0
    ? categories.slice(0, 5)
    : [
        { id: 1, title: 'KADIN TİŞÖRT', code: 'k:tisort', gender: 'k', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
        { id: 2, title: 'ERKEK TİŞÖRT', code: 'e:tisort', gender: 'e', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80' },
        { id: 3, title: 'KADIN CEKET', code: 'k:ceket', gender: 'k', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
        { id: 4, title: 'ERKEK AYAKKABI', code: 'e:ayakkabi', gender: 'e', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
        { id: 5, title: 'KADIN ELBİSE', code: 'k:elbise', gender: 'k', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=500&q=80' }
      ];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Shop</h1>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="text-slate-900 hover:text-indigo-600 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Shop</span>
            {gender && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-indigo-600 capitalize">{gender}</span>
              </>
            )}
            {categoryName && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-indigo-600 capitalize">{categoryName}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Categories Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className={`relative h-48 rounded-xl overflow-hidden group cursor-pointer border shadow-sm transition duration-300 ${
                String(cat.id) === String(categoryId)
                  ? 'border-indigo-600 ring-4 ring-indigo-200'
                  : 'border-gray-200 hover:border-indigo-400'
              }`}
            >
              <img
                src={cat.img || cat.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80'}
                alt={cat.title || cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex flex-col items-center justify-center text-white text-center p-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wide">{cat.title || cat.name}</h3>
                <span className="text-[11px] font-medium text-indigo-200 mt-1">Kategori #{cat.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls & Filtering Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Total items result count */}
          <span className="text-xs font-bold text-slate-600">
            Toplam {total || productList.length} sonuç gösteriliyor
          </span>

          {/* View Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-500">Görünüm:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition ${
                viewMode === 'grid'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : 'border-gray-200 text-slate-400 hover:border-gray-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition ${
                viewMode === 'list'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : 'border-gray-200 text-slate-400 hover:border-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Input & Sort Select Component */}
          <form onSubmit={handleFilterSubmit} className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filter Input */}
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Filtrele (ör: siyah)..."
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Sort Select Component */}
            <select
              value={sortState}
              onChange={handleSortChange}
              className="text-xs font-semibold px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            >
              <option value="">Sırala (Sort By)</option>
              <option value="price:asc">Fiyat: Düşükten Yükseğe (price:asc)</option>
              <option value="price:desc">Fiyat: Yüksekten Düşüğe (price:desc)</option>
              <option value="rating:asc">Puan: Düşükten Yükseğe (rating:asc)</option>
              <option value="rating:desc">Puan: Yüksekten Düşüğe (rating:desc)</option>
            </select>

            {/* Filter Submit Button */}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-sm"
            >
              <FilterIcon className="w-3.5 h-3.5" /> Filtrele
            </button>
          </form>
        </div>
      </div>

      {/* Products Grid & Loading state */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        {fetchState === 'FETCHING' ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-3" />
            <p className="text-sm font-medium text-slate-500">Ürünler yükleniyor...</p>
          </div>
        ) : productList.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-100 p-8 text-center">
            <p className="text-base font-bold text-slate-700 mb-2">Aramanıza Uygun Ürün Bulunamadı</p>
            <p className="text-xs text-slate-500 mb-4">Farklı bir filtre veya kategori deneyebilirsiniz.</p>
            <button
              onClick={() => {
                setFilterInput('');
                setFilterState('');
                setSortState('');
                navigate('/shop');
              }}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                : 'flex flex-col space-y-4'
            }
          >
            {productList.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 flex justify-center">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm text-xs font-bold">
          <button className="px-4 py-2.5 text-slate-400 border-r border-gray-200 hover:bg-gray-50 transition">
            First
          </button>
          <button className="px-4 py-2.5 bg-indigo-600 text-white border-r border-gray-200">
            1
          </button>
          <button className="px-4 py-2.5 text-slate-600 hover:bg-gray-50 border-r border-gray-200 transition">
            2
          </button>
          <button className="px-4 py-2.5 text-slate-600 hover:bg-gray-50 border-r border-gray-200 transition">
            3
          </button>
          <button className="px-4 py-2.5 text-indigo-600 hover:bg-gray-50 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
