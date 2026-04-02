import { useState, useEffect } from "react";
import { 
  getAllGalleryImages,
  createGalleryImage, 
  updateGalleryImage, 
  deleteGalleryImage,
  uploadImages,
  GalleryImage 
} from "@/lib/api/gallery";
import { Loader2, Plus, Trash2, Edit2, Upload, X, Image as ImageIcon, Eye, EyeOff } from "lucide-react";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);

  // Form state for creating/editing gallery entries
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    isActive: true,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const data = await getAllGalleryImages();
      // Ensure data is always an array
      setImages(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load gallery images");
      setImages([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}. Only JPEG, PNG, WebP, and GIF images are allowed.`);
      e.target.value = '';
      return;
    }

    // Validate file sizes (max 5MB per file)
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setError(`File(s) too large: ${oversizedFiles.map(f => f.name).join(', ')}. Maximum size is 5MB per file.`);
      e.target.value = '';
      return;
    }

    // Limit to 10 files
    const limitedFiles = files.slice(0, 10);
    
    if (files.length > 10) {
      setError(`Only the first 10 files will be uploaded. ${files.length - 10} file(s) were excluded.`);
    } else {
      setError(null);
    }

    setSelectedFiles(limitedFiles);

    // Generate previews
    const previews = limitedFiles.map(file => URL.createObjectURL(file));
    setUploadPreviews(previews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsUploading(true);
      setError(null);
      
      // Step 1: Upload files
      console.log('Uploading files:', selectedFiles.length);
      const uploadResponse = await uploadImages(selectedFiles);
      console.log('Upload response:', uploadResponse);
      
      const urls = uploadResponse.urls;
      
      if (!urls || urls.length === 0) {
        throw new Error("No URLs returned from upload");
      }
      
      console.log('Creating gallery entries for URLs:', urls);
      
      // Step 2: Create gallery entries for each uploaded image
      const promises = urls.map((imageUrl, index) => 
        createGalleryImage({
          title: `Gallery Image ${images.length + index + 1}`,
          description: "",
          image: imageUrl,
          category: "General",
          isActive: true,
          order: images.length + index,
        })
      );

      await Promise.all(promises);
      
      // Cleanup
      uploadPreviews.forEach(preview => URL.revokeObjectURL(preview));
      setSelectedFiles([]);
      setUploadPreviews([]);
      setShowUploadModal(false);
      
      // Refresh gallery
      await fetchImages();
      setError(null);
      setSuccessMessage(`Successfully uploaded and added ${urls.length} image${urls.length > 1 ? 's' : ''} to gallery!`);
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Upload error:', err);
      
      let errorMessage = "Failed to upload images";
      
      if (err.message) {
        if (err.message.includes('JPEG') || err.message.includes('PNG') || err.message.includes('allowed')) {
          errorMessage = "Invalid file format. Only JPEG, PNG, WebP, and GIF images are allowed.";
        } else if (err.message.includes('size') || err.message.includes('large')) {
          errorMessage = "One or more files are too large. Maximum size is 5MB per file.";
        } else if (err.message.includes('network') || err.message.includes('Network')) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (err.message.includes('401') || err.message.includes('unauthorized')) {
          errorMessage = "Session expired. Please log in again.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || "",
      category: image.category || "",
      isActive: image.isActive,
    });
  };

  const handleUpdate = async () => {
    if (!editingImage) return;

    try {
      await updateGalleryImage(editingImage.id, formData);
      setEditingImage(null);
      setFormData({ title: "", description: "", category: "", isActive: true });
      await fetchImages();
      setError(null);
      setSuccessMessage("Gallery entry updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update gallery entry");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery entry? The image file will remain in uploads.")) return;

    try {
      await deleteGalleryImage(id);
      await fetchImages();
      setError(null);
      setSuccessMessage("Gallery entry deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to delete gallery entry");
    }
  };

  const toggleActive = async (image: GalleryImage) => {
    try {
      await updateGalleryImage(image.id, { isActive: !image.isActive });
      await fetchImages();
      setSuccessMessage(`Gallery entry ${!image.isActive ? 'activated' : 'deactivated'}!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  };

  const removeSelectedFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = uploadPreviews.filter((_, i) => i !== index);
    
    URL.revokeObjectURL(uploadPreviews[index]);
    setSelectedFiles(newFiles);
    setUploadPreviews(newPreviews);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#1976D2]" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#202124] mb-2">Gallery Management</h1>
          <p className="text-[#5F6368]">Manage gallery entries • {Array.isArray(images) ? images.length : 0} total • {Array.isArray(images) ? images.filter(i => i.isActive).length : 0} active</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#1976D2] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Upload & Add Images
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-700 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
            <span className="text-red-600 text-xs font-bold">!</span>
          </div>
          <p className="text-red-600 flex-1">{error}</p>
          <button
            onClick={() => setError(null)}
            className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(images) && images.map((image) => (
          <div
            key={image.id}
            className={`bg-white rounded-lg border border-[#DADCE0] overflow-hidden hover:shadow-lg transition-shadow ${!image.isActive ? 'opacity-60' : ''}`}
          >
            <div className="relative aspect-[4/3] bg-[#F8F9FA]">
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleActive(image)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-[#F8F9FA] transition-colors"
                  title={image.isActive ? "Deactivate" : "Activate"}
                >
                  {image.isActive ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(image)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-[#F8F9FA] transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-[#1976D2]" />
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              {!image.isActive && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Inactive</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#202124] mb-1">{image.title}</h3>
              {image.description && (
                <p className="text-sm text-[#5F6368] mb-2 line-clamp-2">{image.description}</p>
              )}
              {image.category && (
                <span className="inline-block px-2 py-1 bg-[#E8F0FE] text-[#1976D2] text-xs rounded-full">
                  {image.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {(!Array.isArray(images) || images.length === 0) && (
        <div className="text-center py-16">
          <ImageIcon className="w-16 h-16 text-[#DADCE0] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#202124] mb-2">No gallery entries yet</h3>
          <p className="text-[#5F6368] mb-6">Upload images and create gallery entries to get started</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1976D2] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Upload & Add Images
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#DADCE0] flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-[#202124]">Upload & Add to Gallery</h2>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFiles([]);
                  uploadPreviews.forEach(preview => URL.revokeObjectURL(preview));
                  setUploadPreviews([]);
                }}
                className="p-2 hover:bg-[#F8F9FA] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Error Display in Modal */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <span className="text-red-600 text-xs font-bold">!</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* File Input */}
              <label className="block mb-6">
                <div className="border-2 border-dashed border-[#DADCE0] rounded-lg p-8 text-center hover:border-[#1976D2] hover:bg-[#F8F9FA] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-[#5F6368] mx-auto mb-4" />
                  <p className="text-[#202124] font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-[#5F6368] mb-1">JPEG, PNG, WebP, or GIF</p>
                  <p className="text-xs text-[#5F6368]">Max 5MB per file, up to 10 files</p>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </label>

              {/* Preview Grid */}
              {uploadPreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {uploadPreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-[#DADCE0]">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeSelectedFile(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFiles([]);
                    uploadPreviews.forEach(preview => URL.revokeObjectURL(preview));
                    setUploadPreviews([]);
                  }}
                  className="flex-1 px-6 py-3 border border-[#DADCE0] text-[#5F6368] rounded-lg hover:bg-[#F8F9FA] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="flex-1 px-6 py-3 bg-[#1976D2] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>Upload & Add {selectedFiles.length} {selectedFiles.length === 1 ? 'Image' : 'Images'}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6 border-b border-[#DADCE0]">
              <h2 className="text-2xl font-bold text-[#202124]">Edit Gallery Entry</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#202124] mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-[#DADCE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202124] mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#DADCE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#202124] mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-[#DADCE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                  placeholder="e.g., Classroom, Playground, Events"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-[#1976D2] border-[#DADCE0] rounded focus:ring-[#1976D2]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-[#202124]">
                  Active (visible on public gallery)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setEditingImage(null);
                    setFormData({ title: "", description: "", category: "", isActive: true });
                  }}
                  className="flex-1 px-6 py-3 border border-[#DADCE0] text-[#5F6368] rounded-lg hover:bg-[#F8F9FA] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-6 py-3 bg-[#1976D2] text-white rounded-lg hover:bg-[#1565C0] transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
