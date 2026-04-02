import { useState, useEffect } from "react";
import { getUploadedFiles, deleteUploadedFile, UploadedFile } from "@/lib/api/uploads";
import { Loader2, Trash2, ExternalLink, Image as ImageIcon, FileText, Download } from "lucide-react";

export default function AdminUploadsPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingFile, setDeletingFile] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const data = await getUploadedFiles();
      setFiles(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to load uploaded files");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingFile(filename);
      await deleteUploadedFile(filename);
      await fetchFiles();
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to delete file");
    } finally {
      setDeletingFile(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isImage = (file: UploadedFile): boolean => {
    return file.mimetype?.startsWith('image/') || 
           /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.filename);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#202124] mb-2">Uploaded Files</h1>
        <p className="text-[#5F6368]">
          Manage all uploaded files • {files.length} file{files.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Files List */}
      {files.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-[#DADCE0]">
          <ImageIcon className="w-16 h-16 text-[#DADCE0] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#202124] mb-2">No files uploaded yet</h3>
          <p className="text-[#5F6368]">Upload files through the Gallery or other upload features</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#DADCE0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#5F6368]">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#5F6368]">
                    Filename
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#5F6368]">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#5F6368]">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-[#5F6368]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                {files.map((file) => (
                  <tr key={file.filename} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F8F9FA] flex items-center justify-center">
                        {isImage(file) ? (
                          <img 
                            src={file.url} 
                            alt={file.filename}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileText className="w-8 h-8 text-[#5F6368]" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#202124] truncate max-w-xs">
                          {file.filename}
                        </span>
                        {file.mimetype && (
                          <span className="text-xs text-[#5F6368] bg-[#F8F9FA] px-2 py-1 rounded">
                            {file.mimetype.split('/')[1]?.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#5F6368]">
                        {formatFileSize(file.size)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#5F6368]">
                        {formatDate(file.uploadedAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[#1976D2] hover:bg-[#E8F0FE] rounded-lg transition-colors"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                          href={file.url}
                          download={file.filename}
                          className="p-2 text-[#1976D2] hover:bg-[#E8F0FE] rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(file.filename)}
                          disabled={deletingFile === file.filename}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete"
                        >
                          {deletingFile === file.filename ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      {files.length > 0 && (
        <div className="mt-6 p-4 bg-[#F8F9FA] rounded-lg border border-[#DADCE0]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#5F6368]">
              Total Storage: {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
            </span>
            <span className="text-[#5F6368]">
              {files.filter(isImage).length} image{files.filter(isImage).length !== 1 ? 's' : ''} • 
              {' '}{files.filter(f => !isImage(f)).length} other file{files.filter(f => !isImage(f)).length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
