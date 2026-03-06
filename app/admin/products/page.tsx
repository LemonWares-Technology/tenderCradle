"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreHorizontal, Filter, X, Trash2, Edit } from "lucide-react";

export default function AdminProductsPage() {
  const [productToDelete, setProductToDelete] = useState<null | any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const products = [
    { id: "TC-UNIF-01", name: "Tender Premium Uniform", category: "Apparel", price: "₦15,000", status: "Active", stock: 124 },
    { id: "TC-TOY-02", name: "Montessori Object Permanence Box", category: "Developmental", price: "₦8,500", status: "Active", stock: 45 },
    { id: "TC-KIT-03", name: "Early Years Creative Kit", category: "Learning", price: "₦12,000", status: "Out of Stock", stock: 0 },
    { id: "TC-BOOK-04", name: "Sensory Board Book Collection", category: "Books", price: "₦18,000", status: "Active", stock: 82 },
    { id: "TC-GEAR-05", name: "Ergonomic Toddler Backpack", category: "Gear", price: "₦22,000", status: "Draft", stock: 15 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-normal text-[#202124]">Products</h1>
        <Link 
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-[#1A73E8] hover:bg-[#185ABC] text-white px-6 py-2.5 rounded text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-2 md:p-4 rounded-lg border border-[#DADCE0] shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm flex items-center gap-2 bg-[#F1F3F4] px-3 py-2 rounded focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1A73E8] transition-all">
          <Search className="w-4 h-4 text-[#5F6368]" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none outline-none text-sm w-full text-[#202124] placeholder:text-[#5F6368]"
          />
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] rounded transition-colors whitespace-nowrap">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Data Table */}
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#F8F9FA] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#F1F3F4] flex items-center justify-center shrink-0 border border-[#DADCE0]">
                        <span className="text-xs font-medium text-[#5F6368]">{product.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#202124] group-hover:text-[#1A73E8] cursor-pointer">{product.name}</div>
                        <div className="text-xs text-[#5F6368]">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#202124] font-medium">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${product.status === 'Active' ? 'bg-[#E6F4EA] text-[#137333]' : 
                        product.status === 'Out of Stock' ? 'bg-[#FCE8E6] text-[#C5221F]' : 
                        'bg-[#F1F3F4] text-[#5F6368]'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 text-white">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => setProductToDelete(product)}
                        className="text-[#5F6368] hover:text-[#D93025] p-1 rounded-full hover:bg-[#FCE8E6] transition-colors" title="Delete"
                      >
                       <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdownId(openDropdownId === product.id ? null : product.id)}
                          className="text-[#5F6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#F1F3F4] transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        {openDropdownId === product.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
                            <div className="absolute right-0 mt-1 w-40 bg-white border border-[#DADCE0] rounded shadow-lg z-20 py-1 text-left animate-in fade-in zoom-in duration-100">
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">Duplicate</button>
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">Hide related</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-[#DADCE0] bg-white flex items-center justify-between text-sm text-[#5F6368]">
          <span>Showing 1 to 5 of 156 results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4] disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4]">Next</button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setProductToDelete(null)} />
          
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mx-auto mb-2">
                <Trash2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-medium text-[#202124]">Delete Product?</h2>
              <p className="text-sm text-[#5F6368]">
                Are you sure you want to delete <span className="font-medium text-[#202124]">{productToDelete.name}</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] rounded-b-lg flex justify-end gap-3">
              <button 
                onClick={() => setProductToDelete(null)} 
                className="px-4 py-2 rounded text-sm font-medium hover:bg-[#E8EAED] text-[#202124] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded text-sm font-medium bg-[#D93025] text-white hover:bg-[#B31412] transition-colors shadow-sm"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
