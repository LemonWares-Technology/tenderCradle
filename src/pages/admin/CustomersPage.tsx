import { useState, useEffect } from "react";
import { Search, Mail, Eye, X, Loader2, AlertCircle, Users, ShoppingBag } from "lucide-react";
import apiClient, { PaginatedResponse } from "@/lib/api/client";
import type { Customer } from "@/lib/api/customer-auth";
import { sanitizeText } from "@/lib/utils/sanitize";

interface CustomerWithStats extends Customer {
  _count?: {
    orders: number;
  };
  totalSpent?: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<CustomerWithStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("pageSize", "20");
      if (searchQuery) params.set("search", searchQuery);

      const { data } = await apiClient.get<PaginatedResponse<CustomerWithStats>>(`/admin/customers?${params}`);
      setCustomers(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, searchQuery]);

  const getStatusBadge = (customer: CustomerWithStats) => {
    if (!customer.isActive) return { text: "Inactive", class: "bg-[#F1F3F4] text-[#5F6368]" };
    if (!customer._count || customer._count.orders === 0) return { text: "New", class: "bg-[#E8F0FE] text-[#1A73E8]" };
    return { text: "Active", class: "bg-[#E6F4EA] text-[#137333]" };
  };

  if (loading && customers.length === 0) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#1A73E8] animate-spin" />
          <p className="text-sm text-[#5F6368]">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-normal text-[#202124]">Customers</h1>
      </div>

      {error && (
        <div className="bg-[#FCE8E6] border border-[#D93025] rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#D93025] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[#D93025]">{error}</p>
            <button onClick={fetchCustomers} className="text-sm text-[#1A73E8] hover:underline mt-2">
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
            placeholder="Search customers..."
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
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Customer Info</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Total Orders</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#5F6368] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DADCE0]">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 text-[#9AA0A6] mx-auto mb-3" />
                    <p className="text-sm text-[#5F6368]">No customers found</p>
                  </td>
                </tr>
              ) : (
                customers.map((customer) => {
                  const status = getStatusBadge(customer);
                  return (
                    <tr key={customer.id} className="hover:bg-[#F8F9FA] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center shrink-0 border border-[#DADCE0]">
                            <span className="text-sm font-medium">
                              {customer.firstName.charAt(0)}
                              {customer.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#202124] group-hover:text-[#1A73E8] cursor-pointer">
                              {sanitizeText(`${customer.firstName} ${customer.lastName}`)}
                            </div>
                            <div className="text-xs text-[#5F6368]">{sanitizeText(customer.email)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                        {customer._count?.orders || 0} orders
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#202124]">
                        ₦{customer.totalSpent ? Number(customer.totalSpent).toLocaleString() : "0"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`mailto:${customer.email}`}
                            className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors"
                            title="Email Customer"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                          <button
                            onClick={() => setViewingCustomer(customer)}
                            className="text-[#5F6368] hover:text-[#1E8E3E] p-1 rounded-full hover:bg-[#E6F4EA] transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
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

        {customers.length > 0 && (
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

      {/* Customer Details Sidebar */}
      {viewingCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setViewingCustomer(null)} />
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
                  {viewingCustomer.firstName.charAt(0)}
                  {viewingCustomer.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#202124]">
                    {sanitizeText(`${viewingCustomer.firstName} ${viewingCustomer.lastName}`)}
                  </h3>
                  <p className="text-sm text-[#5F6368]">{sanitizeText(viewingCustomer.email)}</p>
                  {viewingCustomer.phone && <p className="text-xs text-[#5F6368] mt-1">{sanitizeText(viewingCustomer.phone)}</p>}
                </div>
              </div>

              <hr className="border-[#DADCE0]" />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
                  <p className="text-xs text-[#5F6368] mb-1">Total Orders</p>
                  <p className="text-xl font-medium text-[#202124]">{viewingCustomer._count?.orders || 0}</p>
                </div>
                <div className="bg-[#F8F9FA] p-4 rounded-lg border border-[#DADCE0]">
                  <p className="text-xs text-[#5F6368] mb-1">Lifetime Spent</p>
                  <p className="text-xl font-medium text-[#202124]">
                    ₦{viewingCustomer.totalSpent ? Number(viewingCustomer.totalSpent).toLocaleString() : "0"}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#202124] mb-3">Account Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#5F6368]">Status</span>
                    <span className={`font-medium ${viewingCustomer.isActive ? "text-[#1E8E3E]" : "text-[#D93025]"}`}>
                      {viewingCustomer.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6368]">Email Verified</span>
                    <span className={`font-medium ${viewingCustomer.emailVerified ? "text-[#1E8E3E]" : "text-[#B5770D]"}`}>
                      {viewingCustomer.emailVerified ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6368]">Joined</span>
                    <span className="font-medium text-[#202124]">{new Date(viewingCustomer.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {Array.isArray(viewingCustomer.addresses) && viewingCustomer.addresses.length > 0 && (
                <div>
                  <h4 className="font-medium text-[#202124] mb-3">Addresses</h4>
                  <div className="space-y-3">
                    {viewingCustomer.addresses.map((addr, i) => (
                      <div key={i} className="bg-[#F8F9FA] p-3 rounded-lg border border-[#DADCE0] text-sm">
                        <p className="font-medium text-[#202124] mb-1">{addr.label}</p>
                        <p className="text-[#5F6368]">
                          {addr.line1}
                          {addr.line2 && `, ${addr.line2}`}
                        </p>
                        <p className="text-[#5F6368]">
                          {addr.city}, {addr.state} {addr.zip}
                        </p>
                        <p className="text-[#5F6368]">{addr.country}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
