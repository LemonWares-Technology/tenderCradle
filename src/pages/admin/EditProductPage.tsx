import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { UploadProductForm } from "@/components/admin/upload-product-form";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-sm text-[#5F6368]">
        Invalid product. <Link to="/admin/products" className="text-[#1A73E8] hover:underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/products" className="p-2 -ml-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-colors flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Update Product</h1>
          <p className="text-sm text-[#5F6368] mt-1">Editing product ID: {id}</p>
        </div>
      </div>
      <UploadProductForm isEdit productId={id} />
    </div>
  );
}
