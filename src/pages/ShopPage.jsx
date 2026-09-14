import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutGrid, List, ChevronRight, Filter as FilterIcon, Loader2, ChevronLeft } from 'lucide-react';
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

  const PAGE_LIMIT = 25;

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [activePage, setActivePage] = useState(initialPage);
  const [viewMode, setViewMode] = useState('grid');
  const [filterInput, setFilterInput] = useState(searchParams.get('filter') || '');
  const [filterState, setFilterState] = useState(searchParams.get('filter') || '');
  const [sortState, setSortState] = useState(searchParams.get('sort') || '');

  // 1. Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // 2. Fetch products whenever categoryId, filterState, sortState, or activePage changes
  useEffect(() => {
    const currentOffset = (activePage - 1) * PAGE_LIMIT;
    const params = {
      limit: PAGE_LIMIT,
      offset: currentOffset
    };

    if (categoryId) params.category = categoryId;
    if (filterState) params.filter = filterState;
    if (sortState) params.sort = sortState;

    dispatch(fetchProducts(params));
  }, [categoryId, filterState, sortState, activePage, dispatch]);

  // 3. Handle Filter submit
  const handleFilterSubmit = (e) => {
    if (e) e.preventDefault();
    setFilterState(filterInput);
    setActivePage(1); // Reset to page 1 on new filter

    const newParams = new URLSearchParams(searchParams);
    if (filterInput) {
      newParams.set('filter', filterInput);
    } else {
      newParams.delete('filter');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  // 4. Handle Sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortState(value);
    setActivePage(1); // Reset to page 1 on new sort

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  // 5. Handle Page change (T15 Pagination)
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setActivePage(newPage);

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);

    // Scroll smoothly to top of products grid
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // 6. Handle Category selection
  const handleCategoryClick = (cat) => {
    const catGender = cat.gender === 'k' || cat.code?.startsWith('k:') ? 'kadin' : 'erkek';
    const slug = cat.title ? cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'kategori';

    setActivePage(1);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    const searchString = newParams.toString() ? `?${newParams.toString()}` : '';

    navigate(`/shop/${catGender}/${slug}/${cat.id}${searchString}`);
  };

  // Top 5 categories by rating
  const top5Categories = categories && categories.length > 0
    ? [...categories]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5)
    : [
        { id: 1, title: 'KADIN TİŞÖRT', code: 'k:tisort', gender: 'k', rating: 4.9, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80' },
        { id: 2, title: 'ERKEK KOT', code: 'e:tisort', gender: 'e', rating: 4.8, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80' },
        { id: 3, title: 'KADIN CEKET', code: 'k:ceket', gender: 'k', rating: 4.7, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80' },
        { id: 4, title: 'ERKEK AYAKKABI', code: 'e:ayakkabi', gender: 'e', rating: 4.6, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
        { id: 5, title: 'KADIN ELBİSE', code: 'k:elbise', gender: 'k', rating: 4.5, img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=500&q=80' }
      ];

  // Pagination calculation
  const totalItems = total || productList.length;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT) || 1;

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

      {/* Top 5 Categories Section (Sorted by rating) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {top5Categories.map((cat) => (
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
                <span className="text-[11px] font-medium text-indigo-200 mt-1">⭐ Puan: {cat.rating || '5.0'}</span>
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
            Toplam {totalItems} sonuç gösteriliyor (Sayfa {activePage} / {totalPages})
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
                setActivePage(1);
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

      {/* T15 Pagination Component */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 flex justify-center">
          <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm text-xs font-bold">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              className="px-3.5 py-2.5 text-slate-600 border-r border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Önceki (Prev)
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2.5 border-r border-gray-200 transition ${
                  activePage === pageNum
                    ? 'bg-indigo-600 text-white font-extrabold'
                    : 'text-slate-700 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              className="px-3.5 py-2.5 text-indigo-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              Sonraki (Next) <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
