import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, Trash2, Edit, Loader2, AlertCircle, Package } from "lucide-react";
import { adminGetProducts, deleteProduct, type Product } from "@/lib/api/products";
import { sanitizeText } from "@/lib/utils/sanitize";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminGetProducts({ page, pageSize: 20, search: searchQuery || undefined });
      setProducts(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery]);

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      setDeleting(true);
      await deleteProduct(productToDelete.id);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (product: Product) => {
    if (!product.isActive) return { text: "Inactive", class: "bg-[#F1F3F4] text-[#5F6368]" };
    const totalStock = product.variants.reduce((sum, v) => sum + (v.stock - v.reservedStock), 0);
    if (totalStock === 0) return { text: "Out of Stock", class: "bg-[#FCE8E6] text-[#C5221F]" };
    return { text: "Active", class: "bg-[#E6F4EA] text-[#137333]" };
  };

  if (loading && products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#1A73E8] animate-spin" />
          <p className="text-sm text-[#5F6368]">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-normal text-[#202124]">Products</h1>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-[#1A73E8] hover:bg-[#185ABC] text-white px-6 py-2.5 rounded text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-[#FCE8E6] border border-[#D93025] rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#D93025] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[#D93025]">{error}</p>
            <button onClick={fetchProducts} className="text-sm text-[#1A73E8] hover:underline mt-2">
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-2 md:p-4 rounded-lg border border-[#DADCE0] shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm flex items-center gap-2 bg-[#F1F3F4] px-3 py-2 rounded focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1A73E8] transition-all">
          <Search className="w-4 h-4 text-[#5F6368]" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="bg-transparent border-none outline-none text-sm w-full text-[#202124] placeholder:text-[#5F6368]"
          />
        </div>
      </div>

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#5F6368] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DADCE0]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Package className="w-12 h-12 text-[#9AA0A6] mx-auto mb-3" />
                    <p className="text-sm text-[#5F6368]">No products found</p>
                    <Link to="/admin/products/new" className="text-sm text-[#1A73E8] hover:underline mt-2 inline-block">
                      Create your first product
                    </Link>
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const status = getStatusBadge(product);
                  const totalStock = product.variants.reduce((sum, v) => sum + (v.stock - v.reservedStock), 0);
                  const lowestPrice = Math.min(...product.variants.map((v) => Number(v.price)));

                  return (
                    <tr key={product.id} className="hover:bg-[#F8F9FA] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-[#F1F3F4] flex items-center justify-center shrink-0 border border-[#DADCE0] overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-4 h-4 text-[#5F6368]" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#202124] group-hover:text-[#1A73E8] cursor-pointer">
                              {sanitizeText(product.name)}
                            </div>
                            <div className="text-xs text-[#5F6368]">{product.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                        {product.category?.name || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#202124] font-medium">
                        ₦{lowestPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">{totalStock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setProductToDelete(product)}
                            className="text-[#5F6368] hover:text-[#D93025] p-1 rounded-full hover:bg-[#FCE8E6] transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {products.length > 0 && (
          <div className="px-6 py-4 border-t border-[#DADCE0] bg-white flex items-center justify-between text-sm text-[#5F6368]">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !deleting && setProductToDelete(null)} />
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative z-10">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mx-auto mb-2">
                <Trash2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-medium text-[#202124]">Delete Product?</h2>
              <p className="text-sm text-[#5F6368]">
                Are you sure you want to delete <span className="font-medium text-[#202124]">{sanitizeText(productToDelete.name)}</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] rounded-b-lg flex justify-end gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                disabled={deleting}
                className="px-4 py-2 rounded text-sm font-medium hover:bg-[#E8EAED] text-[#202124] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded text-sm font-medium bg-[#D93025] text-white hover:bg-[#B31412] transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Product"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
