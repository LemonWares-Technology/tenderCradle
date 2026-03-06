"use client";
import { useState } from "react";

const tabs = ["Store Details", "Payments", "Shipping & Delivery", "Notifications"];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-normal text-[#202124]">Settings</h1>
      </div>

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm">
        
        {/* Settings Navigation */}
        <div className="flex overflow-x-auto border-b border-[#DADCE0] no-scrollbar">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? "border-[#1A73E8] text-[#1A73E8]"
                  : "border-transparent text-[#5F6368] hover:text-[#202124] hover:bg-[#F8F9FA]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings Form Content */}
        <div className="p-6 md:p-8 space-y-8">
          
          {activeTab === "Store Details" && (
            <>
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-[#202124]">Basic Information</h2>
                <p className="text-sm text-[#5F6368]">Manage your store&apos;s public-facing information.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-[#5F6368] mb-1">Store Name</label>
                    <input 
                      type="text" 
                      defaultValue="Tender Cradle"
                      className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5F6368] mb-1">Support Email</label>
                    <input 
                      type="email" 
                      defaultValue="support@tendercradle.com"
                      className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-[#DADCE0]" />

              <div className="space-y-4">
                <h2 className="text-lg font-medium text-[#202124]">Currency & Region</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-[#5F6368] mb-1">Store Currency</label>
                    <select className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer">
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5F6368] mb-1">Timezone</label>
                    <select className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer">
                      <option value="Africa/Lagos">(GMT+01:00) West Africa Time - Lagos</option>
                      <option value="UTC">(GMT+00:00) Universal Time Coordinated</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Payments" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-[#202124]">Payment Providers</h2>
                    <p className="text-sm text-[#5F6368]">Configure how you accept payments on the storefront.</p>
                  </div>
                </div>
                
                <div className="border border-[#DADCE0] rounded-lg bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F8F9FA] rounded border border-[#DADCE0] flex items-center justify-center font-bold text-[#1A73E8]">
                        P
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-[#202124]">Paystack</h3>
                        <p className="text-sm text-[#1E8E3E]">Active &middot; Accepting automated payments</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#F1F3F4] text-[#202124] text-sm font-medium rounded hover:bg-[#E8EAED] transition-colors">
                      Manage Config
                    </button>
                  </div>
                </div>

                <div className="border border-[#DADCE0] rounded-lg bg-white p-6 opacity-60 hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#F8F9FA] rounded border border-[#DADCE0] flex items-center justify-center font-bold text-[#202124]">
                        S
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-[#202124]">Stripe (International)</h3>
                        <p className="text-sm text-[#5F6368]">Not configured</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-[#DADCE0] text-[#1A73E8] text-sm font-medium rounded hover:bg-[#F8F9FA] transition-colors">
                      Enable Stripe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Shipping & Delivery" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-[#202124]">Shipping Zones</h2>
                <p className="text-sm text-[#5F6368]">Define regions where you deliver, and their respective rates.</p>
                
                <div className="border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
                  <div className="p-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium text-[#202124]">Lagos Logistics</span>
                      <span className="bg-[#E6F4EA] text-[#137333] px-2 py-0.5 rounded text-xs font-bold">Default</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-[#F1F3F4]">
                      <span className="text-sm text-[#202124]">Standard Delivery (2-3 Business Days)</span>
                      <span className="text-sm font-medium text-[#202124]">₦2,500</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-[#202124]">Express / Same Day Delivery</span>
                      <span className="text-sm font-medium text-[#202124]">₦5,000</span>
                    </div>
                  </div>
                </div>

                <div className="border border-[#DADCE0] rounded-lg bg-white overflow-hidden">
                  <div className="p-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium text-[#202124]">Outside Lagos (Interstate)</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-[#F1F3F4]">
                      <span className="text-sm text-[#202124]">GIG Logistics Standard (3-7 Days)</span>
                      <span className="text-sm font-medium text-[#202124]">₦4,500</span>
                    </div>
                  </div>
                </div>

                <button className="text-[#1A73E8] text-sm font-medium hover:underline pt-2">
                  + Add New Shipping Zone
                </button>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
             <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
               <div className="w-16 h-16 bg-[#F1F3F4] rounded-full flex items-center justify-center mb-4">
                 <span className="text-[#5F6368] font-medium text-2xl">🔔</span>
               </div>
               <h3 className="text-lg font-medium text-[#202124] mb-2">Automated Notifications</h3>
               <p className="text-sm text-[#5F6368] max-w-sm">
                 Email templates for Order Confirmations and Shipping updates will be manageable here soon.
               </p>
             </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#DADCE0] bg-[#F8F9FA] flex justify-end gap-4 rounded-b-lg">
          <button type="button" className="px-6 py-2 rounded text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] transition-colors border border-transparent">
            Discard
          </button>
          <button type="button" className="px-6 py-2 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
