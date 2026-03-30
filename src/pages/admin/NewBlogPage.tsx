import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { BlogEditor } from "@/components/admin/blog-editor";
import { LocalImageDropzone } from "@/components/admin/local-image-dropzone";
import { createBlog } from "@/lib/api/blog";
import { uploadAdminImage } from "@/lib/api/upload";

const DEFAULT_COVER = "https://placehold.co/1200x630/F8F9FA/1A73E8/png?text=Tender+Cradle+Blog";

const CATEGORIES = [
  { value: "montessori", label: "Montessori" },
  { value: "child-development", label: "Child Development" },
  { value: "parenting", label: "Parenting" },
  { value: "nutrition", label: "Nutrition" },
  { value: "school-readiness", label: "School Readiness" },
];

function isBodyEmpty(html: string): boolean {
  const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  return text.length === 0;
}

export default function NewBlogPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [author, setAuthor] = useState("Tender Cradle");
  const [role, setRole] = useState("Editorial Team");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [contentHtml, setContentHtml] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const handleCoverFile = (file: File) => {
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setError(null);
  };

  const clearCoverPending = () => {
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(null);
    setCoverPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!excerpt.trim()) {
      setError("Excerpt is required.");
      return;
    }
    if (!author.trim() || !role.trim()) {
      setError("Author and role are required.");
      return;
    }
    if (isBodyEmpty(contentHtml)) {
      setError("Article body cannot be empty.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }

    const tags = [category, status === "published" ? "published" : "draft"];

    try {
      setSaving(true);
      let imageUrl = DEFAULT_COVER;
      if (coverFile) {
        imageUrl = await uploadAdminImage(coverFile);
      }
      await createBlog({
        title: title.trim(),
        author: author.trim(),
        role: role.trim(),
        image: imageUrl,
        tags,
        excerpt: excerpt.trim(),
        content: contentHtml,
      });
      navigate("/admin/blog");
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Failed to save post.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/blog"
          className="p-2 -ml-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">New Blog Post</h1>
          <p className="text-sm text-[#5F6368] mt-0.5">Create a new article for the Tender Cradle blog.</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-[#D93025] bg-[#FCE8E6] px-4 py-3 text-sm text-[#D93025]">{error}</div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-base font-medium text-[#202124]">Post Details</h2>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 5 Montessori activities for a rainy day..."
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Excerpt / Summary</label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary shown in article cards and SEO descriptions..."
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Cover image</label>
            <p className="text-xs text-[#5F6368] mb-2">Choose a file now; it is stored in the browser until you click Save Post, then it uploads with the article.</p>
            <LocalImageDropzone
              previewUrl={coverPreview}
              pendingLabel={coverFile?.name ?? null}
              onFile={handleCoverFile}
              onClearPending={clearCoverPending}
              hasPendingFile={!!coverFile}
              emptySubtitle="Optional — if you skip this, a default placeholder image is used when you save."
              onValidationError={(msg) => setError(msg)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5F6368] mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5F6368] mb-1">Author role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5F6368] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select category...
                </option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5F6368] mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-base font-medium text-[#202124]">Content</h2>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Article body</label>
            <BlogEditor mountKey="new" initialHtml="" onChange={setContentHtml} placeholder="Write your article…" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 pt-2">
          <Link
            to="/admin/blog"
            className="px-6 py-2.5 rounded text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] transition-colors"
          >
            Discard
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}
