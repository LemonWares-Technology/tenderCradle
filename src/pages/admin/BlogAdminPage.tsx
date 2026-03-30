import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash2, Plus, Loader2, AlertCircle, FileText } from "lucide-react";
import { getBlogs, deleteBlog, type Blog } from "@/lib/api/blog";
import { sanitizeText } from "@/lib/utils/sanitize";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    if (!postToDelete) return;
    try {
      setDeleting(true);
      await deleteBlog(postToDelete.id);
      setPosts(posts.filter((p) => p.id !== postToDelete.id));
      setPostToDelete(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  const filteredPosts = posts.filter((post) =>
    searchQuery ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#1A73E8] animate-spin" />
          <p className="text-sm text-[#5F6368]">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal text-[#202124]">Blog Posts</h1>
        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {error && (
        <div className="bg-[#FCE8E6] border border-[#D93025] rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#D93025] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-[#D93025]">{error}</p>
            <button onClick={fetchPosts} className="text-sm text-[#1A73E8] hover:underline mt-2">
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: posts.length.toString() },
          { label: "Published", value: posts.length.toString() },
          { label: "Drafts", value: "0" },
          { label: "Total Views", value: "—" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#DADCE0] rounded-lg px-5 py-4 shadow-sm">
            <p className="text-sm text-[#5F6368] mb-1">{s.label}</p>
            <p className="text-2xl font-medium text-[#202124]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#DADCE0] flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <h2 className="text-sm font-medium text-[#202124]">All Posts</h2>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-56 pl-4 pr-4 py-2 text-sm border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#F1F3F4]">
            <thead className="bg-[#F8F9FA]">
              <tr>
                {["Title", "Author", "Tags", "Date", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-bold text-[#5F6368] uppercase tracking-wider whitespace-nowrap last:text-right"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4]">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-[#9AA0A6] mx-auto mb-3" />
                    <p className="text-sm text-[#5F6368]">No blog posts found</p>
                    <Link to="/admin/blog/new" className="text-sm text-[#1A73E8] hover:underline mt-2 inline-block">
                      Create your first post
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm font-medium text-[#202124] line-clamp-1">{sanitizeText(post.title)}</p>
                      <p className="text-xs text-[#5F6368] mt-0.5 line-clamp-1">{sanitizeText(post.excerpt)}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                      <div>
                        <p className="font-medium text-[#202124]">{sanitizeText(post.author)}</p>
                        <p className="text-xs">{sanitizeText(post.role)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="inline-block px-2 py-0.5 bg-[#F1F3F4] rounded text-xs mr-1">
                          {sanitizeText(tag)}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/blog/${post.id}`}
                          target="_blank"
                          className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors"
                          title="View Live"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/blog/${post.id}/edit`}
                          className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setPostToDelete(post)}
                          className="text-[#5F6368] hover:text-[#D93025] p-1 rounded-full hover:bg-[#FCE8E6] transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !deleting && setPostToDelete(null)} />
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative z-10">
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-medium text-[#202124]">Delete Post?</h2>
              <p className="text-sm text-[#5F6368]">
                &ldquo;{sanitizeText(postToDelete.title.slice(0, 50))}...&rdquo; will be permanently deleted.
              </p>
            </div>
            <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] flex justify-end gap-3">
              <button
                onClick={() => setPostToDelete(null)}
                disabled={deleting}
                className="px-4 py-2 rounded text-sm font-medium hover:bg-[#E8EAED] text-[#202124] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded text-sm font-medium bg-[#D93025] text-white hover:bg-[#B31412] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
