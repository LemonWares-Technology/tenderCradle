import { useAuth } from "@/lib/context/AuthContext";
import { Settings, User, Shield, Clock } from "lucide-react";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-normal text-[#202124]">Settings</h1>
        <p className="text-sm text-[#5F6368] mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#E8F0FE] flex items-center justify-center">
            <User className="w-4 h-4 text-[#1A73E8]" />
          </div>
          <h2 className="text-base font-medium text-[#202124]">Profile</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#1A73E8] flex items-center justify-center text-white text-2xl font-medium">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-lg font-medium text-[#202124]">{user?.name || "Admin"}</p>
              <p className="text-sm text-[#5F6368]">{user?.email || "—"}</p>
              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#E8F0FE] text-[#1A73E8] rounded-full">
                {user?.role || "admin"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#E6F4EA] flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#1E8E3E]" />
          </div>
          <h2 className="text-base font-medium text-[#202124]">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#F1F3F4]">
            <div>
              <p className="text-sm font-medium text-[#202124]">Password</p>
              <p className="text-xs text-[#5F6368] mt-0.5">Last changed: unknown</p>
            </div>
            <button
              disabled
              className="text-sm text-[#5F6368] px-4 py-2 border border-[#DADCE0] rounded-lg opacity-50 cursor-not-allowed"
            >
              Change Password
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-[#202124]">Session</p>
              <p className="text-xs text-[#5F6368] mt-0.5">JWT-based, expires in 7 days</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#1E8E3E]">
              <Clock className="w-3.5 h-3.5" /> Active
            </div>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white rounded-lg border border-[#DADCE0] shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#F3E8FF] flex items-center justify-center">
            <Settings className="w-4 h-4 text-[#9334E9]" />
          </div>
          <h2 className="text-base font-medium text-[#202124]">Application</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-[#F8F9FA] rounded-lg">
            <p className="text-[#5F6368] text-xs mb-1">Frontend</p>
            <p className="font-medium text-[#202124]">Vite + React</p>
          </div>
          <div className="p-3 bg-[#F8F9FA] rounded-lg">
            <p className="text-[#5F6368] text-xs mb-1">Backend</p>
            <p className="font-medium text-[#202124]">Express + Prisma</p>
          </div>
        </div>
      </div>
    </div>
  );
}
