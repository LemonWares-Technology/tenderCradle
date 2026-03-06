"use client";

import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const UploadProductForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      
      {/* Main Info Section */}
      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-medium text-[#202124]">General Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Product Name</label>
            <input 
              type="text" 
              placeholder="e.g., Montessori Sorting Set"
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Description</label>
            <textarea 
              rows={4}
              placeholder="Describe the product..."
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Media / Drag and Drop */}
      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-medium text-[#202124]">Media</h2>
        
        <div 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`w-full border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center transition-colors cursor-pointer
            ${dragActive ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-[#F8F9FA] hover:bg-[#F1F3F4]'}
          `}
        >
          {fileName ? (
            <div className="flex flex-col items-center text-center text-[#1E8E3E]">
              <CheckCircle2 className="w-10 h-10 mb-2" />
              <p className="text-sm font-medium">{fileName}</p>
              <p className="text-xs text-[#5F6368] mt-1">Ready for upload</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <UploadCloud className="w-10 h-10 text-[#5F6368] mb-4" />
              <p className="text-sm font-medium text-[#202124]">Drag and drop an image, or click to browse</p>
              <p className="text-xs text-[#5F6368] mt-1">High-resolution JPEG or PNG up to 5MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-medium text-[#202124]">Pricing & Inventory</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Price (₦)</label>
            <input 
              type="number" 
              placeholder="0.00"
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Stock Quantity</label>
            <input 
              type="number" 
              placeholder="0"
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Category</label>
            <select defaultValue="" className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer">
              <option value="" disabled>Select category...</option>
              <option value="apparel">Apparel & Uniforms</option>
              <option value="learning">Learning Tools</option>
              <option value="books">Books</option>
              <option value="gear">Gear & Accessories</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <button type="button" className="px-6 py-2.5 rounded text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] transition-colors border border-transparent">
          Discard
        </button>
        <button type="submit" className="px-6 py-2.5 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm">
          {isEdit ? "Update Product" : "Save Product"}
        </button>
      </div>
      

    </form>
  );
};
