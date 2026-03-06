"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package, TrendingUp, Users, ShoppingBag, ArrowUpRight, ArrowDownRight,
  Plus, FileText, Eye, Clock, CheckCircle2, XCircle, Truck
} from "lucide-react";

const statCards = [
  { label: "Total Revenue", value: "₦4.2M", icon: TrendingUp, trend: "+12.5%", up: true, sub: "vs last month" },
  { label: "Active Orders", value: "24", icon: ShoppingBag, trend: "+4.1%", up: true, sub: "3 need attention" },
  { label: "Total Products", value: "156", icon: Package, trend: "+2", up: true, sub: "6 low stock" },
  { label: "New Customers", value: "32", icon: Users, trend: "+18.2%", up: true, sub: "this month" },
];

const chartData = [
  { day: "Mon", val: 60 },
  { day: "Tue", val: 35 },
  { day: "Wed", val: 80 },
  { day: "Thu", val: 45 },
  { day: "Fri", val: 95 },
  { day: "Sat", val: 120 },
  { day: "Sun", val: 85 },
];
const maxVal = Math.max(...chartData.map((d) => d.val));

const topProducts = [
  { name: "Ergonomic Toddler Backpack", sales: 142, revenue: "₦3.1M", image: "/images/shop-backpack.png" },
  { name: "Tender Premium Uniform", sales: 98, revenue: "₦1.5M", image: "/images/shop-uniform.png" },
  { name: "Sensory Board Book Collection", sales: 87, revenue: "₦1.6M", image: "/images/shop-books.png" },
  { name: "Wooden Sorting Alphabet", sales: 65, revenue: "₦618K", image: "/images/shop-alphabet.png" },
  { name: "Early Years Creative Kit", sales: 51, revenue: "₦612K", image: "/images/shop-kit.png" },
];

const recentActivity = [
  { type: "order", icon: ShoppingBag, color: "text-[#1A73E8] bg-[#E8F0FE]", text: "New order #8405 — Adaeze Okonkwo", time: "2 min ago" },
  { type: "customer", icon: Users, color: "text-[#1E8E3E] bg-[#E6F4EA]", text: "New customer registered — Emeka Eze", time: "14 min ago" },
  { type: "shipped", icon: Truck, color: "text-[#B5770D] bg-[#FEF7E0]", text: "Order #8402 marked as shipped", time: "31 min ago" },
  { type: "complete", icon: CheckCircle2, color: "text-[#1E8E3E] bg-[#E6F4EA]", text: "Order #8399 completed & delivered", time: "1 hr ago" },
  { type: "cancelled", icon: XCircle, color: "text-[#D93025] bg-[#FCE8E6]", text: "Order #8397 cancelled by customer", time: "2 hr ago" },
  { type: "blog", icon: FileText, color: "text-[#9334E9] bg-[#F3E8FF]", text: "Blog post published: Montessori at Home", time: "3 hr ago" },
  { type: "order", icon: ShoppingBag, color: "text-[#1A73E8] bg-[#E8F0FE]", text: "New order #8394 — Funmilayo Adeyemi", time: "5 hr ago" },
];

const quickActions = [
  { label: "Add Product", href: "/admin/products/new", icon: Plus, color: "bg-[#E8F0FE] text-[#1A73E8]" },
  { label: "View Orders", href: "/admin/orders", icon: ShoppingBag, color: "bg-[#E6F4EA] text-[#1E8E3E]" },
  { label: "New Blog Post", href: "/admin/blog/new", icon: FileText, color: "bg-[#F3E8FF] text-[#9334E9]" },
  { label: "View Site", href: "/", icon: Eye, color: "bg-[#FEF7E0] text-[#B5770D]", target: "_blank" },
];

type ChartRange = "This Week" | "Last Week" | "This Month";

export default function AdminDashboardPage() {
  const [chartRange, setChartRange] = useState<ChartRange>("This Week");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Overview</h1>
          <p className="text-sm text-[#5F6368] mt-0.5">Friday, 6 March 2026 — Good morning, Admin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] rounded shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 md:p-6 rounded-lg border border-[#DADCE0] shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.up ? "bg-[#E8F0FE] text-[#1A73E8]" : "bg-[#FCE8E6] text-[#D93025]"}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? "text-[#1E8E3E]" : "text-[#D93025]"}`}>
                {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.trend}
              </span>
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
            href={action.href}
            target={action.target}
            className="bg-white border border-[#DADCE0] rounded-lg p-4 flex flex-col items-start gap-3 hover:shadow-md hover:border-[#BBBFC3] transition-all group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${action.color}`}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-[#202124] group-hover:text-[#1A73E8] transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Charts + Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-lg border border-[#DADCE0] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-medium text-[#202124]">Revenue Overview</h2>
              <p className="text-xs text-[#5F6368] mt-0.5">Daily gross revenue</p>
            </div>
            <select
              value={chartRange}
              onChange={(e) => setChartRange(e.target.value as ChartRange)}
              className="text-sm text-[#5F6368] bg-[#F8F9FA] border border-[#DADCE0] rounded px-2 py-1 outline-none cursor-pointer hover:bg-[#F1F3F4] transition-colors"
            >
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>

          {/* Chart */}
          <div className="flex-1 flex items-end gap-2 md:gap-3 relative min-h-[200px] pt-8">
            {/* Grid lines */}
            <div className="absolute inset-x-0 bottom-8 top-0 flex flex-col justify-between pointer-events-none">
              {[4, 3, 2, 1, 0].map((line) => (
                <div key={line} className="w-full border-t border-dashed border-[#F1F3F4] flex items-center">
                  <span className="text-[10px] text-[#9AA0A6] pr-2 -mt-3 bg-white">₦{line * 50}K</span>
                </div>
              ))}
            </div>

            {/* Bars */}
            {chartData.map((d, i) => {
              const isHighest = d.val === maxVal;
              const heightPct = (d.val / maxVal) * 100;
              return (
                <div key={i} className="flex flex-col items-center flex-1 group h-full justify-end z-10 relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none">
                    <div className="bg-[#202124] text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                      ₦{(d.val * 1750).toLocaleString()}
                    </div>
                    <div className="w-2 h-2 bg-[#202124] rotate-45 -mt-1" />
                  </div>
                  {/* Bar */}
                  <div
                    className={`w-full max-w-[44px] rounded-t-md group-hover:opacity-90 transition-all duration-300 ${
                      isHighest ? "bg-[#1A73E8]" : "bg-[#1A73E8]/25 group-hover:bg-[#1A73E8]/60"
                    }`}
                    style={{ height: `${heightPct}%`, minHeight: "4px" }}
                  />
                  <span className="text-[10px] md:text-xs font-medium text-[#9AA0A6] mt-2 group-hover:text-[#202124] transition-colors">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-[#F1F3F4]">
            {[
              { label: "Peak Day", value: "Saturday" },
              { label: "Avg/Day", value: "₦73.6K" },
              { label: "Total", value: "₦514.8K" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-[#5F6368]">{s.label}</p>
                <p className="text-sm font-semibold text-[#202124] mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-5 md:p-6 rounded-lg border border-[#DADCE0] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-medium text-[#202124]">Activity</h2>
            <span className="flex items-center gap-1 text-xs text-[#5F6368]">
              <Clock className="w-3.5 h-3.5" /> Live
            </span>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto flex-1 max-h-[360px] pr-1 scrollbar-thin">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#202124] leading-snug line-clamp-2">{item.text}</p>
                  <p className="text-[11px] text-[#9AA0A6] mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/orders"
            className="mt-5 pt-4 border-t border-[#F1F3F4] text-xs font-medium text-[#1A73E8] hover:text-[#185ABC] flex items-center gap-1 transition-colors"
          >
            View All Orders <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-[#F1F3F4]">
          <h2 className="text-base font-medium text-[#202124]">Top Selling Products</h2>
          <Link href="/admin/products" className="text-xs font-medium text-[#1A73E8] hover:underline flex items-center gap-1">
            All Products <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                {["Product", "Units Sold", "Revenue", ""].map((h) => (
                  <th key={h} className="px-5 md:px-6 py-3 text-left text-xs font-bold text-[#5F6368] uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4]">
              {topProducts.map((product, i) => (
                <tr key={i} className="hover:bg-[#F8F9FA] transition-colors group">
                  <td className="px-5 md:px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F1F3F4] overflow-hidden shrink-0 relative">
                        {/* rank badge */}
                        {i < 3 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-[#5F6368]">#{i + 1}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-[#202124] line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-5 md:px-6 py-3.5 text-sm text-[#5F6368]">{product.sales} units</td>
                  <td className="px-5 md:px-6 py-3.5 text-sm font-semibold text-[#202124]">{product.revenue}</td>
                  <td className="px-5 md:px-6 py-3.5">
                    <Link
                      href="/admin/products"
                      className="text-xs text-[#1A73E8] hover:underline opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 whitespace-nowrap"
                    >
                      View <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
