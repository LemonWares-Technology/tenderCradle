import { useState, useEffect } from "react";
import { Search, Filter, Eye, X, Loader2, AlertCircle, Package } from "lucide-react";
import { adminGetOrders, adminUpdateOrderStatus, type Order } from "@/lib/api/orders";
import { sanitizeText } from "@/lib/utils/sanitize";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminGetOrders({
        page,
        pageSize: 20,
        search: searchQuery || undefined,
        status: statusFilter || undefined,
      });
      setOrders(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, searchQuery, statusFilter]);

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      DELIVERED: "bg-[#E6F4EA] text-[#137333]",
      PROCESSING: "bg-[#FEF7E0] text-[#E37400]",
      SHIPPED: "bg-[#E8F0FE] text-[#1A73E8]",
      CONFIRMED: "bg-[#E6F4EA] text-[#1E8E3E]",
      PENDING: "bg-[#FEF7E0] text-[#B5770D]",
      CANCELLED: "bg-[#FCE8E6] text-[#C5221F]",
      REFUNDED: "bg-[#F1F3F4] text-[#5F6368]",
    };
    return colors[status] || "bg-[#F1F3F4] text-[#5F6368]";
  };

  if (loading && orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#1A73E8] animate-spin" />
          <p className="text-sm text-[#5F6368]">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-normal text-[#202124]">Orders</h1>
      </div>

      {error && (
        <div className="bg-[#FCE8E6] border border-[#D93025] rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#D93025] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[#D93025]">{error}</p>
            <button onClick={fetchOrders} className="text-sm text-[#1A73E8] hover:underline mt-2">
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
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="bg-transparent border-none outline-none text-sm w-full text-[#202124] placeholder:text-[#5F6368]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 text-sm border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-xs font-medium text-[#5F6368] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#5F6368] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DADCE0]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Package className="w-12 h-12 text-[#9AA0A6] mx-auto mb-3" />
                    <p className="text-sm text-[#5F6368]">No orders found</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F8F9FA] transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1A73E8] cursor-pointer">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#202124]">
                      {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">{order.items.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#202124]">
                      ₦{Number(order.total).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {orders.length > 0 && (
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#DADCE0] sticky top-0 bg-white">
              <h2 className="text-xl font-medium text-[#202124]">Order {selectedOrder.orderNumber}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#5F6368] mb-1">Customer</p>
                  <p className="font-medium text-[#202124]">
                    {selectedOrder.customer
                      ? `${selectedOrder.customer.firstName} ${selectedOrder.customer.lastName}`
                      : "—"}
                  </p>
                  <p className="text-xs text-[#5F6368]">{selectedOrder.customer?.email}</p>
                </div>
                <div>
                  <p className="text-[#5F6368] mb-1">Order Date</p>
                  <p className="font-medium text-[#202124]">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#5F6368] mb-1">Status</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-[#5F6368] mb-1">Payment Status</p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      selectedOrder.paymentStatus === "PAID"
                        ? "bg-[#E6F4EA] text-[#1E8E3E]"
                        : "bg-[#FEF7E0] text-[#B5770D]"
                    }`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#DADCE0] pt-6">
                <h3 className="font-medium text-[#202124] mb-4">Items ({selectedOrder.items.length})</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-[#F8F9FA] p-3 rounded border border-[#DADCE0]">
                      <div>
                        <p className="text-sm font-medium text-[#202124]">{sanitizeText(item.productName)}</p>
                        {item.variantName && <p className="text-xs text-[#5F6368]">{sanitizeText(item.variantName)}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#5F6368]">{item.quantity}x</p>
                        <p className="text-sm font-medium text-[#202124]">₦{Number(item.total).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#DADCE0] pt-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#5F6368]">Subtotal</span>
                    <span className="text-[#202124]">₦{Number(selectedOrder.subtotal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6368]">Tax</span>
                    <span className="text-[#202124]">₦{Number(selectedOrder.tax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F6368]">Shipping</span>
                    <span className="text-[#202124]">₦{Number(selectedOrder.shippingCost).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#DADCE0]">
                    <span className="font-medium text-[#202124]">Total</span>
                    <span className="font-semibold text-[#202124] text-lg">₦{Number(selectedOrder.total).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded text-sm font-medium hover:bg-[#E8EAED] text-[#202124] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
