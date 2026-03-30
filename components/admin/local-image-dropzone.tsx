import { useRef, useState } from "react";
import { UploadCloud, CheckCircle2, X } from "lucide-react";

const MAX_BYTES = 5 * 1024 * 1024;

export interface LocalImageDropzoneProps {
  /** Preview URL (blob: or remote http(s)). */
  previewUrl: string | null;
  /** Shown when a new file is staged (not for remote-only preview). */
  pendingLabel?: string | null;
  onFile: (file: File) => void;
  onClearPending?: () => void;
  /** True when the preview is from a local file not yet uploaded. */
  hasPendingFile?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  onValidationError?: (message: string) => void;
}

export function LocalImageDropzone({
  previewUrl,
  pendingLabel,
  onFile,
  onClearPending,
  hasPendingFile,
  emptyTitle = "Drag and drop an image, or click to browse",
  emptySubtitle = "JPEG, PNG, WebP, or GIF up to 5MB. Image uploads when you save.",
  onValidationError,
}: LocalImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const validateAndEmit = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onValidationError?.("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      onValidationError?.("Image must be 5MB or smaller.");
      return;
    }
    onFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    validateAndEmit(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          validateAndEmit(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <div className="relative">
        <button
          type="button"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors cursor-pointer text-left
            ${dragActive ? "border-[#1A73E8] bg-[#E8F0FE]" : "border-[#DADCE0] bg-[#F8F9FA] hover:bg-[#F1F3F4]"}`}
        >
          {previewUrl ? (
            <div className="flex flex-col items-center text-center w-full max-w-lg">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#DADCE0] mb-3 bg-white">
                <img src={previewUrl} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-center text-[#1E8E3E]">
                <CheckCircle2 className="w-7 h-7 mb-1" />
                <p className="text-sm font-medium">{hasPendingFile ? pendingLabel || "Ready to upload on save" : "Current image"}</p>
                <p className="text-xs text-[#5F6368] mt-1">Click or drop to replace</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center pointer-events-none py-4">
              <UploadCloud className="w-10 h-10 text-[#5F6368] mb-3" />
              <p className="text-sm font-medium text-[#202124]">{emptyTitle}</p>
              <p className="text-xs text-[#5F6368] mt-1 max-w-sm">{emptySubtitle}</p>
            </div>
          )}
        </button>
        {hasPendingFile && onClearPending && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClearPending();
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white border border-[#DADCE0] shadow-sm text-[#5F6368] hover:text-[#D93025] hover:border-[#D93025] transition-colors"
            title="Remove selected image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
