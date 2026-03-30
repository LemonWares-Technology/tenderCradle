import { useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Settings, 
  Users, 
  Package,
  LogOut,
  X,
  FileText,
  MessageSquare,
  Mail,
  UserCheck,
  GraduationCap
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/lib/context/AuthContext";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Team", href: "/admin/team", icon: UserCheck },
  { name: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
  { name: "Leads", href: "/admin/leads", icon: MessageSquare },
  { name: "Newsletter", href: "/admin/newsletters", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export const AdminSidebar = ({ className = "", onCloseMobile }: AdminSidebarProps) => {
  const { pathname } = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
    <aside className={className}>
      <div className="p-6 flex items-center justify-between border-b border-[#DADCE0]">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8 text-[#1A73E8]" />
          <span className="font-bold text-lg tracking-tight text-[#202124]">Tender Admin</span>
        </div>
        {onCloseMobile && (
          <button 
            onClick={onCloseMobile}
            className="md:hidden p-2 -mr-2 text-[#5F6368] hover:bg-[#F1F3F4] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-r-full text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-[#E8F0FE] text-[#1A73E8]" 
                  : "text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#202124]"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#1A73E8]" : "text-[#5F6368]"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#DADCE0]">
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-r-full text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#D93025] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>

      {/* Logout Confirmation Modal - Moved outside of aside to fix z-index stacking context */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
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
                onClick={() => { setIsLogoutModalOpen(false); logout(); }}
                className="px-4 py-2 rounded text-sm font-medium bg-[#D93025] text-white hover:bg-[#B31412] transition-colors shadow-sm"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
