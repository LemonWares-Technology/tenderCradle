import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/context/AuthContext";
import { getDashboardStats, getEcommerceStats } from "@/lib/api/stats";
import type { DashboardStats, EcommerceStats } from "@/lib/api/stats";
import {
  Package, TrendingUp, Users, ShoppingBag, ArrowUpRight,
  Plus, FileText, Eye, Clock, Loader2, AlertCircle,
  Mail, MessageSquare, UserCheck, BarChart3
} from "lucide-react";

const quickActions = [
  { label: "Add Product", href: "/admin/products/new", icon: Plus, color: "bg-[#E8F0FE] text-[#1A73E8]" },
  { label: "View Orders", href: "/admin/orders", icon: ShoppingBag, color: "bg-[#E6F4EA] text-[#1E8E3E]" },
  { label: "New Blog Post", href: "/admin/blog/new", icon: FileText, color: "bg-[#F3E8FF] text-[#9334E9]" },
  { label: "View Site", href: "/", icon: Eye, color: "bg-[#FEF7E0] text-[#B5770D]", target: "_blank" as const },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [cmsStats, setCmsStats] = useState<DashboardStats | null>(null);
  const [ecomStats, setEcomStats] = useState<EcommerceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [cms, ecom] = await Promise.all([
          getDashboardStats(),
          getEcommerceStats(),
        ]);
        setCmsStats(cms);
        setEcomStats(ecom);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#1A73E8] animate-spin" />
          <p className="text-sm text-[#5F6368]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg border border-[#DADCE0] shadow-sm">
          <AlertCircle className="w-10 h-10 text-[#D93025]" />
          <p className="text-sm text-[#5F6368]">{error}</p>
          <button onClick={() => window.location.reload()} className="text-sm text-[#1A73E8] hover:underline">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const mainStats = [
    {
      label: "Total Revenue",
      value: `₦${Number(ecomStats?.totalRevenue || 0).toLocaleString()}`,
      icon: TrendingUp,
      sub: "from paid orders",
      color: "bg-[#E8F0FE] text-[#1A73E8]",
    },
    {
      label: "Total Orders",
      value: String(ecomStats?.totalOrders || 0),
      icon: ShoppingBag,
      sub: `${ecomStats?.pendingOrders || 0} pending`,
      color: "bg-[#E6F4EA] text-[#1E8E3E]",
    },
    {
      label: "Active Products",
      value: String(ecomStats?.totalProducts || 0),
      icon: Package,
      sub: `${ecomStats?.lowStockVariants || 0} low stock`,
      color: "bg-[#FEF7E0] text-[#B5770D]",
    },
    {
      label: "Customers",
      value: String(ecomStats?.totalCustomers || 0),
      icon: Users,
      sub: "registered accounts",
      color: "bg-[#F3E8FF] text-[#9334E9]",
    },
  ];

  const cmsCards = [
    { label: "Blog Posts", value: cmsStats?.counts.blogs || 0, icon: FileText, href: "/admin/blog" },
    { label: "Team Members", value: cmsStats?.counts.teamMembers || 0, icon: UserCheck, href: "/admin/team" },
    { label: "Leads", value: cmsStats?.counts.leads || 0, icon: MessageSquare, href: "/admin/leads" },
    { label: "Subscribers", value: cmsStats?.counts.subscribers || 0, icon: Mail, href: "/admin/newsletters" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Overview</h1>
          <p className="text-sm text-[#5F6368] mt-0.5">
            {today} — {greeting()}, {user?.name || "Admin"}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] rounded shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* E-Commerce Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {mainStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 md:p-6 rounded-lg border border-[#DADCE0] shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#202124] tracking-tight">{stat.value}</h3>
              <p className="text-xs text-[#5F6368] mt-0.5">{stat.label}</p>
            </div>
            <p className="text-[11px] text-[#5F6368] border-t border-[#F1F3F4] pt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {quickActions.map((action, idx) => (
          <Link
            key={idx}
            to={action.href}
            target={action.target}
            className="bg-white border border-[#DADCE0] rounded-lg p-4 flex flex-col items-start gap-3 hover:shadow-md hover:border-[#BBBFC3] transition-all group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${action.color}`}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-[#202124] group-hover:text-[#1A73E8] transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Content & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* CMS Stats */}
        <div className="lg:col-span-1 bg-white p-5 md:p-6 rounded-lg border border-[#DADCE0] shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-[#5F6368]" />
            <h2 className="text-base font-medium text-[#202124]">Content</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {cmsCards.map((card, idx) => (
              <Link
                key={idx}
                to={card.href}
                className="p-4 rounded-lg bg-[#F8F9FA] border border-[#F1F3F4] hover:border-[#DADCE0] hover:shadow-sm transition-all group"
              >
                <card.icon className="w-5 h-5 text-[#5F6368] mb-2" />
                <p className="text-2xl font-semibold text-[#202124]">{card.value}</p>
                <p className="text-[11px] text-[#5F6368] mt-0.5 group-hover:text-[#1A73E8] transition-colors">
                  {card.label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="lg:col-span-1 bg-white p-5 md:p-6 rounded-lg border border-[#DADCE0] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-medium text-[#202124]">Recent Leads</h2>
            <Link to="/admin/leads" className="text-xs text-[#1A73E8] hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {cmsStats?.recent.leads && cmsStats.recent.leads.length > 0 ? (
              cmsStats.recent.leads.map((lead) => (
                <div key={lead.id} className="flex items-start gap-3 p-3 bg-[#F8F9FA] rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 text-[#1A73E8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#202124] truncate">{lead.name}</p>
                    <p className="text-[11px] text-[#5F6368] truncate">{lead.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#9AA0A6] text-center py-8">No leads yet</p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-1 bg-white p-5 md:p-6 rounded-lg border border-[#DADCE0] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-medium text-[#202124]">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-[#1A73E8] hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {ecomStats?.recentOrders && ecomStats.recentOrders.length > 0 ? (
              ecomStats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#1E8E3E]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#202124]">{order.orderNumber}</p>
                      <p className="text-[11px] text-[#5F6368]">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#202124]">₦{Number(order.total).toLocaleString()}</p>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        order.status === "DELIVERED"
                          ? "bg-[#E6F4EA] text-[#1E8E3E]"
                          : order.status === "CANCELLED"
                          ? "bg-[#FCE8E6] text-[#D93025]"
                          : order.status === "PENDING"
                          ? "bg-[#FEF7E0] text-[#B5770D]"
                          : "bg-[#E8F0FE] text-[#1A73E8]"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#9AA0A6] text-center py-8">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
