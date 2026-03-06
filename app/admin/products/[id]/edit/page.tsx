import { UploadProductForm } from "@/components/admin/upload-product-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/products"
          className="p-2 -ml-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Update Product</h1>
          <p className="text-sm text-[#5F6368] mt-1">Editing product ID: {id}</p>
        </div>
      </div>

      <UploadProductForm isEdit={true} />
    </div>
  );
}
