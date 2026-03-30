import { useState } from "react";
import { Menu, Search, Bell, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/context/AuthContext";

export const AdminTopbar = ({ onOpenMobileSidebar }: { onOpenMobileSidebar?: () => void }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  return (
    <header className="h-16 border-b border-[#DADCE0] bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
      
      {/* Mobile Menu Trigger & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 bg-[#F1F3F4] px-4 py-2 rounded-lg max-w-md w-full focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1A73E8] focus-within:shadow-sm transition-all">
          <Search className="w-4 h-4 text-[#5F6368]" />
          <input 
            type="text" 
            placeholder="Search products, orders..." 
            className="bg-transparent border-none outline-none text-sm w-full text-[#202124] placeholder:text-[#5F6368]"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D93025] rounded-full border border-white" />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full overflow-hidden border border-[#DADCE0] focus:ring-2 focus:ring-[#1A73E8]/50 outline-none ml-2 flex items-center justify-center bg-[#1A73E8] text-white text-sm font-medium transition-shadow relative z-20"
          >
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </button>
          
          {isProfileOpen && (
            <>
              {/* Invisible overlay to click outside */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#DADCE0] rounded-lg shadow-lg z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-[#F1F3F4]">
                  <p className="text-sm font-medium text-[#202124]">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-[#5F6368] mt-0.5" style={{ wordBreak: 'break-all' }}>{user?.email || 'admin@tendercradle.com'}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link to="/admin/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] rounded transition-colors">
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link to="/admin/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124] rounded transition-colors">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                </div>
                <div className="p-2 border-t border-[#F1F3F4]">
                  <button 
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsLogoutModalOpen(true);
                    }} 
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#D93025] hover:bg-[#FCE8E6] rounded transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Logout Confirmation Modal */}
          {isLogoutModalOpen && (
            <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsLogoutModalOpen(false)} />
              
              <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative z-10 animate-in fade-in zoom-in duration-200">
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mx-auto mb-2">
                    <LogOut className="w-6 h-6 ml-1" />
                  </div>
                  <h2 className="text-xl font-medium text-[#202124]">Sign Out?</h2>
                  <p className="text-sm text-[#5F6368]">
                    Are you sure you want to sign out of the Admin Dashboard?
                  </p>
                </div>
                
                <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] rounded-b-lg flex justify-end gap-3">
                  <button 
                    onClick={() => setIsLogoutModalOpen(false)} 
                    className="px-4 py-2 rounded text-sm font-medium hover:bg-[#E8EAED] text-[#202124] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded text-sm font-medium bg-[#D93025] text-white hover:bg-[#B31412] transition-colors shadow-sm"
                  >
                    Yes, Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
