import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { BlogEditor } from "@/components/admin/blog-editor";
import { LocalImageDropzone } from "@/components/admin/local-image-dropzone";
import { getBlog, updateBlog, type Blog } from "@/lib/api/blog";
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

function inferCategory(tags: string[]): string {
  const found = CATEGORIES.find((c) => tags.includes(c.value));
  return found?.value ?? (tags[0] && !["draft", "published"].includes(tags[0]) ? tags[0] : "");
}

function inferStatus(tags: string[]): "draft" | "published" {
  return tags.includes("published") ? "published" : "draft";
}

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  /** Current image URL from the server (unchanged until save with a new file). */
  const [savedImageUrl, setSavedImageUrl] = useState("");
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

  useEffect(() => {
    if (!id) {
      setLoadError("Missing post id.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getBlog(id);
        if (cancelled) return;
        setPost(data);
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setAuthor(data.author);
        setRole(data.role);
        setSavedImageUrl(data.image || "");
        setCoverFile(null);
        setCoverPreview(null);
        setContentHtml(data.content);
        setCategory(inferCategory(data.tags || []) || "montessori");
        setStatus(inferStatus(data.tags || []));
        setLoadError(null);
      } catch (err: unknown) {
        if (cancelled) return;
        const msg = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Failed to load post.";
        setLoadError(msg);
        setPost(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

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
    if (!id || !post) return;
    setError(null);

    if (!title.trim() || !excerpt.trim() || !author.trim() || !role.trim()) {
      setError("Title, excerpt, author, and role are required.");
      return;
    }
    if (isBodyEmpty(contentHtml)) {
      setError("Article body cannot be empty.");
      return;
    }

    const tags = [category, status === "published" ? "published" : "draft"];

    try {
      setSaving(true);
      let imageUrl = savedImageUrl.trim() || DEFAULT_COVER;
      if (coverFile) {
        imageUrl = await uploadAdminImage(coverFile);
      }
      await updateBlog(id, {
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
      const msg = err && typeof err === "object" && "message" in err ? String((err as { message: string }).message) : "Failed to update post.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[40vh] gap-3 text-[#5F6368]">
        <Loader2 className="w-6 h-6 animate-spin text-[#1A73E8]" />
        <span className="text-sm">Loading post…</span>
      </div>
    );
  }

  if (loadError || !post || !id) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-[#1A73E8] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>
        <div className="rounded-lg border border-[#DADCE0] bg-white p-6 text-[#5F6368] text-sm">{loadError || "Post not found."}</div>
      </div>
    );
  }

  const coverDisplayUrl = coverPreview ?? (savedImageUrl ? savedImageUrl : null);

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
          <h1 className="text-2xl font-normal text-[#202124]">Edit Post</h1>
          <p className="text-sm text-[#5F6368] mt-0.5 line-clamp-1">Editing: {title}</p>
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
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Excerpt / Summary</label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Cover image</label>
            <p className="text-xs text-[#5F6368] mb-2">
              Stays on the server until you pick a replacement; new file uploads when you click Update Post.
            </p>
            <LocalImageDropzone
              previewUrl={coverDisplayUrl}
              pendingLabel={coverFile?.name ?? null}
              onFile={handleCoverFile}
              onClearPending={clearCoverPending}
              hasPendingFile={!!coverFile}
              emptySubtitle="No cover yet — add one before save or the existing URL will be kept."
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
          <BlogEditor mountKey={post.id} initialHtml={post.content} onChange={setContentHtml} placeholder="Write your article…" />
        </div>
        <div className="flex items-center justify-end gap-4 pt-2">
          <Link
            to="/admin/blog"
            className="px-6 py-2.5 rounded text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] transition-colors"
          >
            Discard Changes
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
