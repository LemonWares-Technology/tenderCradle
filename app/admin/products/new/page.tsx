import { UploadProductForm } from "@/components/admin/upload-product-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/products"
          className="p-2 -ml-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-normal text-[#202124]">Add New Product</h1>
      </div>

      <UploadProductForm />
    </div>
  );
}
