import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutGrid, List, ChevronRight, Loader2, Plus, Shield } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ShopCards from '../components/ShopCards';
import ClientsSection from '../components/ClientsSection';
import AdminProductModal from '../components/AdminProductModal';
import { fetchProducts, fetchCategories, deleteProduct } from '../store/actions/productActions';
import { toast } from 'react-toastify';

export default function ShopPage() {
  const { categoryId, gender, categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const isAdmin = user && (user.role_id === 1 || user.role === 'admin');

  const productList = useSelector((state) => state.product.productList);
  const categories = useSelector((state) => state.product.categories);
  const fetchState = useSelector((state) => state.product.fetchState);
  const total = useSelector((state) => state.product.total);

  const PAGE_LIMIT = 12;

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [activePage, setActivePage] = useState(initialPage);
  const [viewMode, setViewMode] = useState('grid');
  const [filterInput, setFilterInput] = useState(searchParams.get('filter') || '');
  const [filterState, setFilterState] = useState(searchParams.get('filter') || '');
  const [sortState, setSortState] = useState(searchParams.get('sort') || '');

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsAdminModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setIsAdminModalOpen(true);
  };

  const handleDeleteProduct = (prodId) => {
    if (window.confirm('Bu ürünü sistemden silmek istediğinize emin misiniz?')) {
      dispatch(deleteProduct(prodId));
      toast.success('Ürün başarıyla silindi! (Admin)');
    }
  };

  // Sync state with URL searchParams
  useEffect(() => {
    const urlSort = searchParams.get('sort') || '';
    const urlFilter = searchParams.get('filter') || '';
    setSortState(urlSort);
    setFilterState(urlFilter);
    setFilterInput(urlFilter);
  }, [searchParams]);

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
    setActivePage(1);

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
    setActivePage(1);

    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('sort', value);
    } else {
      newParams.delete('sort');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  // 5. Handle Page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setActivePage(newPage);

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);

    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Pagination calculation
  const totalItems = total || productList.length;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT) || 3;

  return (
    <div className="bg-white min-h-screen py-6 font-sans">
      {/* Admin Modal */}
      <AdminProductModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        initialProduct={editingProduct}
      />

      {/* Top Header & Breadcrumbs matching desktop-shop-1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <h1 className="text-2xl font-black text-[#252B42] tracking-tight">Shop</h1>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#737373]">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">Shop</span>
            {gender && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#23A6F0] capitalize">{gender}</span>
              </>
            )}
            {categoryName && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#23A6F0] capitalize">{categoryName}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5-Category Cards Row matching desktop-shop-1 */}
      <ShopCards />

      {/* Controls & Filtering Bar matching desktop-shop-1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        {/* Admin Management Action Banner */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-purple-950 flex items-center gap-2">
                  🛡️ Yönetici (Admin) Kontrol Paneli
                </h3>
                <p className="text-xs text-purple-700 mt-0.5">
                  Sistem Yöneticisi olarak ürün ekleyebilir, fiyat/stok bilgilerini güncelleyebilir veya ürünleri silebilirsiniz.
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="bg-purple-700 hover:bg-purple-800 active:scale-95 text-white text-xs font-black px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition shrink-0"
            >
              <Plus className="w-4 h-4 text-purple-200" /> Yeni Ürün Ekle (Admin)
            </button>
          </div>
        )}

        <div className="bg-white py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-y border-gray-100">
          {/* Total items result count */}
          <span className="text-xs font-bold text-[#737373]">
            Showing all {totalItems} results
          </span>

          {/* View Toggle */}
          <div className="flex items-center space-x-3 text-xs font-bold text-[#737373]">
            <span>Views:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-md border transition ${
                viewMode === 'grid'
                  ? 'border-[#252B42] text-[#252B42] bg-gray-50'
                  : 'border-gray-200 text-slate-400 hover:border-gray-300'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-md border transition ${
                viewMode === 'list'
                  ? 'border-[#252B42] text-[#252B42] bg-gray-50'
                  : 'border-gray-200 text-slate-400 hover:border-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Select & Filter Button matching desktop-shop-1 */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={sortState}
              onChange={handleSortChange}
              className="text-xs font-semibold px-4 py-2.5 border border-gray-200 rounded-md bg-[#F9F9F9] focus:outline-none focus:ring-1 focus:ring-[#23A6F0] text-[#737373]"
            >
              <option value="">Popularity</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>

            <button
              onClick={handleFilterSubmit}
              className="bg-[#23A6F0] hover:bg-[#1b8bc9] active:scale-95 text-white font-bold text-xs px-6 py-2.5 rounded-md transition duration-200 shadow-sm"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid & Loading state */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        {fetchState === 'FETCHING' ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#23A6F0] mb-3" />
            <p className="text-sm font-medium text-[#737373]">Loading products...</p>
          </div>
        ) : productList.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl border border-gray-100 p-8 text-center">
            <p className="text-base font-bold text-[#252B42] mb-2">No Products Found</p>
            <p className="text-xs text-[#737373] mb-4">Try clearing your search or choosing another category.</p>
            <button
              onClick={() => {
                setFilterInput('');
                setFilterState('');
                setSortState('');
                setActivePage(1);
                navigate('/shop');
              }}
              className="text-xs font-bold text-[#23A6F0] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'
                : 'flex flex-col space-y-4'
            }
          >
            {productList.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Bar matching desktop-shop-2 */}
      {totalPages >= 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 flex justify-center">
          <div className="inline-flex items-center rounded-md border border-gray-200 bg-white shadow-sm text-xs font-bold overflow-hidden">
            {/* First / Prev Button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={activePage === 1}
              className="px-5 py-3 text-slate-400 bg-[#BDBDBD]/10 border-r border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              First
            </button>

            {/* Page Numbers (1, 2, 3) */}
            {[1, 2, 3].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-5 py-3 border-r border-gray-200 transition ${
                  activePage === pageNum
                    ? 'bg-[#23A6F0] text-[#FFFFFF] font-extrabold'
                    : 'text-[#23A6F0] hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              className="px-5 py-3 text-[#23A6F0] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Clients / Partner Logos Banner matching desktop-shop-3 */}
      <div className="mt-16">
        <ClientsSection />
      </div>
    </div>
  );
}
