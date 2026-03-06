"use client";
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, X } from "lucide-react";

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<null | any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const orders = [
    { id: "ORD-8405", customer: "Sarah Jenkins", date: "Oct 24, 2026", total: "₦45,000", status: "Processing", items: 3 },
    { id: "ORD-8404", customer: "Michael Chen", date: "Oct 23, 2026", total: "₦12,500", status: "Shipped", items: 1 },
    { id: "ORD-8403", customer: "Chioma Adeyemi", date: "Oct 22, 2026", total: "₦78,000", status: "Delivered", items: 4 },
    { id: "ORD-8402", customer: "David Wilson", date: "Oct 21, 2026", total: "₦22,000", status: "Delivered", items: 1 },
    { id: "ORD-8401", customer: "Aisha Mohammed", date: "Oct 20, 2026", total: "₦35,500", status: "Cancelled", items: 2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-normal text-[#202124]">Orders</h1>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-2 md:p-4 rounded-lg border border-[#DADCE0] shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm flex items-center gap-2 bg-[#F1F3F4] px-3 py-2 rounded focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1A73E8] transition-all">
          <Search className="w-4 h-4 text-[#5F6368]" />
          <input 
            type="text" 
            placeholder="Search orders by ID or customer..." 
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
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#5F6368] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DADCE0]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F8F9FA] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1A73E8] cursor-pointer">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#202124]">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#202124]">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Delivered' ? 'bg-[#E6F4EA] text-[#137333]' : 
                        order.status === 'Processing' ? 'bg-[#FEF7E0] text-[#E37400]' : 
                        order.status === 'Shipped' ? 'bg-[#E8F0FE] text-[#1A73E8]' : 
                        'bg-[#FCE8E6] text-[#C5221F]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors" title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdownId(openDropdownId === order.id ? null : order.id)}
                          className="text-[#5F6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#F1F3F4] transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        {openDropdownId === order.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-[#DADCE0] rounded shadow-lg z-20 py-1 text-left animate-in fade-in zoom-in duration-100">
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">Update Status</button>
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">Print Packing Slip</button>
                              <div className="border-t border-[#F1F3F4] my-1"></div>
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#D93025] hover:bg-[#FCE8E6] text-left">Cancel Order</button>
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
        
        {/* Pagination */ }
        <div className="px-6 py-4 border-t border-[#DADCE0] bg-white flex items-center justify-between text-sm text-[#5F6368]">
          <span>Showing 1 to 5 of 24 results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4] disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4]">Next</button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#DADCE0]">
              <h2 className="text-xl font-medium text-[#202124]">Order {selectedOrder.id} Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#5F6368] mb-1">Customer Name</p>
                  <p className="font-medium text-[#202124]">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-[#5F6368] mb-1">Order Date</p>
                  <p className="font-medium text-[#202124]">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-[#5F6368] mb-1">Status</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F1F3F4] text-[#5F6368]">
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-[#5F6368] mb-1">Total Amount</p>
                  <p className="font-medium text-[#202124] text-lg">{selectedOrder.total}</p>
                </div>
              </div>

              <div className="border-t border-[#DADCE0] pt-6">
                <h3 className="font-medium text-[#202124] mb-4">Items Ordered ({selectedOrder.items})</h3>
                <div className="space-y-3">
                   {(Array.from({length: selectedOrder.items})).map((_, i) => (
                      <div key={i} className="flex justify-between items-center bg-[#F8F9FA] p-3 rounded border border-[#DADCE0]">
                        <span className="text-sm font-medium text-[#202124]">Product Item {i + 1}</span>
                        <span className="text-sm text-[#5F6368]">1x</span>
                      </div>
                   ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] rounded-b-lg flex justify-end gap-3">
              <button onClick={() => setSelectedOrder(null)} className="px-5 py-2 rounded text-sm font-medium hover:bg-[#E8EAED] text-[#202124] transition-colors">
                Close
              </button>
              <button className="px-5 py-2 rounded text-sm font-medium bg-[#1A73E8] text-white hover:bg-[#185ABC] transition-colors shadow-sm">
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
