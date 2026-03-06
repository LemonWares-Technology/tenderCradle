"use client";
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, Eye, X, Send } from "lucide-react";

export default function AdminCustomersPage() {
  const [viewingCustomer, setViewingCustomer] = useState<null | any>(null);
  const [emailingCustomer, setEmailingCustomer] = useState<null | any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const customers = [
    { id: "CUS-001", name: "Sarah Jenkins", email: "sarah.j@example.com", orders: 12, spent: "₦450,000", status: "Active" },
    { id: "CUS-002", name: "Michael Chen", email: "m.chen@example.com", orders: 3, spent: "₦85,500", status: "Active" },
    { id: "CUS-003", name: "Chioma Adeyemi", email: "chioma.a@example.com", orders: 1, spent: "₦78,000", status: "New" },
    { id: "CUS-004", name: "David Wilson", email: "david.w@example.com", orders: 5, spent: "₦112,000", status: "Active" },
    { id: "CUS-005", name: "Aisha Mohammed", email: "aisha.m@example.com", orders: 0, spent: "₦0", status: "Inactive" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-normal text-[#202124]">Customers</h1>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-2 md:p-4 rounded-lg border border-[#DADCE0] shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm flex items-center gap-2 bg-[#F1F3F4] px-3 py-2 rounded focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1A73E8] transition-all">
          <Search className="w-4 h-4 text-[#5F6368]" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..." 
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
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Customer Info</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Total Orders</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#5F6368] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DADCE0]">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#F8F9FA] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center shrink-0 border border-[#DADCE0]">
                        <span className="text-sm font-medium">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#202124] group-hover:text-[#1A73E8] cursor-pointer">{customer.name}</div>
                        <div className="text-xs text-[#5F6368]">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${customer.status === 'Active' ? 'bg-[#E6F4EA] text-[#137333]' : 
                        customer.status === 'New' ? 'bg-[#E8F0FE] text-[#1A73E8]' : 
                        'bg-[#F1F3F4] text-[#5F6368]'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                    {customer.orders} orders
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#202124]">
                    {customer.spent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setEmailingCustomer(customer)}
                        className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors" title="Email Customer"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setViewingCustomer(customer)}
                        className="text-[#5F6368] hover:text-[#1E8E3E] p-1 rounded-full hover:bg-[#E6F4EA] transition-colors" title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setOpenDropdownId(openDropdownId === customer.id ? null : customer.id)}
                          className="text-[#5F6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#F1F3F4] transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        {openDropdownId === customer.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)}></div>
                            <div className="absolute right-0 mt-1 w-44 bg-white border border-[#DADCE0] rounded shadow-lg z-20 py-1 text-left animate-in fade-in zoom-in duration-100">
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">Reset Password</button>
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">View Invoice</button>
                              <div className="border-t border-[#F1F3F4] my-1"></div>
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#D93025] hover:bg-[#FCE8E6] text-left">Deactivate User</button>
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
          <span>Showing 1 to 5 of 32 results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4] disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 rounded border border-[#DADCE0] hover:bg-[#F1F3F4]">Next</button>
          </div>
        </div>
      </div>

      {/* Customer Details Sidebar Drawer */}
      {viewingCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setViewingCustomer(null)} />
          
          <div className="w-full max-w-md bg-white h-full shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[#DADCE0]">
              <h2 className="text-lg font-medium text-[#202124]">Customer Profile</h2>
              <button onClick={() => setViewingCustomer(null)} className="p-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center border border-[#DADCE0] text-2xl font-medium">
                  {viewingCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#202124]">{viewingCustomer.name}</h3>
                  <p className="text-sm text-[#5F6368]">{viewingCustomer.email}</p>
                  <p className="text-xs text-[#5F6368] mt-1">Customer ID: {viewingCustomer.id}</p>
                </div>
              </div>

              <hr className="border-[#DADCE0]" />

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
                    <p className="text-xs text-[#5F6368] mb-1">Total Orders</p>
                    <p className="text-xl font-medium text-[#202124]">{viewingCustomer.orders}</p>
                 </div>
                 <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
                    <p className="text-xs text-[#5F6368] mb-1">Lifetime Spent</p>
                    <p className="text-xl font-medium text-[#202124]">{viewingCustomer.spent}</p>
                 </div>
              </div>

              <div>
                <h4 className="font-medium text-[#202124] mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {viewingCustomer.orders > 0 ? (
                    <div className="flex items-center justify-between py-2 border-b border-[#F1F3F4]">
                      <span className="text-sm text-[#5F6368]">Completed Order #8405</span>
                      <span className="text-sm font-medium text-[#202124]">Oct 24, 2026</span>
                    </div>
                  ) : (
                    <p className="text-sm text-[#5F6368]">No orders placed yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {emailingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setEmailingCustomer(null)} />
          
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative z-10 animate-in fade-in zoom-in duration-200 overflow-hidden">
            <div className="bg-[#1A73E8] px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-medium text-white flex items-center gap-2">
                <Mail className="w-5 h-5" /> New Message
              </h2>
              <button onClick={() => setEmailingCustomer(null)} className="p-1 text-white/80 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-sm">
              <div className="flex items-center border-b border-[#F1F3F4] pb-2">
                <span className="w-12 text-[#5F6368]">To:</span>
                <span className="bg-[#E8F0FE] text-[#1A73E8] px-2 py-0.5 rounded-full text-xs font-medium border border-[#D2E3FC]">
                  {emailingCustomer.name} &lt;{emailingCustomer.email}&gt;
                </span>
              </div>
              
              <div className="flex items-center border-b border-[#F1F3F4] pb-2">
                <span className="w-12 text-[#5F6368]">Subject:</span>
                <input type="text" className="flex-1 outline-none text-[#202124]" placeholder="Enter subject line..." />
              </div>

              <div>
                <textarea 
                  rows={8} 
                  className="w-full resize-none outline-none text-[#202124] placeholder:text-[#5F6368]"
                  placeholder={`Hi ${emailingCustomer.name.split(' ')[0]},\n\nWrite your message here...`}
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-[#DADCE0] bg-[#F8F9FA] flex justify-between items-center">
               <button className="p-2 text-[#5F6368] hover:bg-[#E8EAED] rounded transition-colors" title="Attach file">
                 <span className="text-lg">📎</span>
               </button>
               <button 
                onClick={() => setEmailingCustomer(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium bg-[#1A73E8] text-white hover:bg-[#185ABC] transition-colors shadow-sm"
               >
                 Send <Send className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
