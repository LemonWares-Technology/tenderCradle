import { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { Google_Sans_Flex } from "next/font/google"; // Using Google Sans Flex
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import "./admin.css";

const googleSans = Google_Sans_Flex({
  variable: "--font-admin",
  subsets: ["latin"],
  display: "swap", // helps with font loading warnings
});

export const metadata: Metadata = {
  title: "Admin Dashboard — Tender Cradle",
  description: "Secure management dashboard.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`admin-root ${googleSans.variable} font-admin min-h-screen bg-[#F8F9FA] text-[#202124] flex`}>
      {/* 
        We use a Client Component wrapper to handle the Mobile Sidebar State 
        between the Topbar (hamburger menu) and Sidebar itself. 
      */}
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </div>
  );
}
