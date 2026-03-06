"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Edit, Trash2, Plus, MoreHorizontal } from "lucide-react";

type Post = {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft" | "Archived";
  date: string;
  readTime: string;
  views: number;
};

const posts: Post[] = [
  { id: "montessori-at-home", title: "5 Montessori activities you can set up at home this weekend", category: "Montessori", status: "Published", date: "Feb 28, 2026", readTime: "4 min", views: 1240 },
  { id: "screen-time-guide", title: "The research-backed guide to screen time for children under 5", category: "Child Development", status: "Published", date: "Feb 20, 2026", readTime: "6 min", views: 893 },
  { id: "choosing-first-school", title: "What to look for when choosing your child's very first school", category: "Parenting", status: "Published", date: "Feb 14, 2026", readTime: "5 min", views: 2100 },
  { id: "bilingual-benefits", title: "The surprising cognitive benefits of bilingual early education", category: "Child Development", status: "Draft", date: "Mar 3, 2026", readTime: "7 min", views: 0 },
  { id: "play-based-learning", title: "Why unstructured play is the most important part of your child's day", category: "Montessori", status: "Draft", date: "Mar 5, 2026", readTime: "5 min", views: 0 },
];

const statusColors: Record<Post["status"], string> = {
  Published: "bg-[#E6F4EA] text-[#1E8E3E]",
  Draft: "bg-[#FEF7E0] text-[#B5770D]",
  Archived: "bg-[#F1F3F4] text-[#5F6368]",
};

export default function AdminBlogPage() {
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-normal text-[#202124]">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: "5" },
          { label: "Published", value: "3" },
          { label: "Drafts", value: "2" },
          { label: "Total Views", value: "4,233" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#DADCE0] rounded-lg px-5 py-4 shadow-sm">
            <p className="text-sm text-[#5F6368] mb-1">{s.label}</p>
            <p className="text-2xl font-medium text-[#202124]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#DADCE0] flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <h2 className="text-sm font-medium text-[#202124]">All Posts</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-56 pl-4 pr-4 py-2 text-sm border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#F1F3F4]">
            <thead className="bg-[#F8F9FA]">
              <tr>
                {["Title", "Category", "Status", "Views", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-bold text-[#5F6368] uppercase tracking-wider whitespace-nowrap last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4]">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 max-w-xs">
                    <div>
                      <p className="text-sm font-medium text-[#202124] line-clamp-1">{post.title}</p>
                      <p className="text-xs text-[#5F6368] mt-0.5">{post.readTime} read</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#5F6368]">{post.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[post.status]}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#202124]">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5F6368]">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.id}`}
                        target="_blank"
                        className="text-[#5F6368] hover:text-[#1A73E8] p-1 rounded-full hover:bg-[#E8F0FE] transition-colors"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
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
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === post.id ? null : post.id)}
                          className="text-[#5F6368] hover:text-[#202124] p-1 rounded-full hover:bg-[#F1F3F4] transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        {openDropdownId === post.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} />
                            <div className="absolute right-0 mt-1 w-44 bg-white border border-[#DADCE0] rounded shadow-lg z-20 py-1 text-left">
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">
                                {post.status === "Published" ? "Unpublish" : "Publish"}
                              </button>
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#202124] hover:bg-[#F1F3F4] text-left">
                                Duplicate
                              </button>
                              <div className="border-t border-[#F1F3F4] my-1" />
                              <button onClick={() => setOpenDropdownId(null)} className="w-full px-4 py-2 text-sm text-[#5F6368] hover:bg-[#F1F3F4] text-left">
                                Archive
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPostToDelete(null)} />
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FCE8E6] text-[#D93025] flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-medium text-[#202124]">Delete Post?</h2>
              <p className="text-sm text-[#5F6368]">
                &ldquo;{postToDelete.title.slice(0, 50)}...&rdquo; will be permanently deleted.
              </p>
            </div>
            <div className="p-4 border-t border-[#DADCE0] bg-[#F8F9FA] rounded-b-lg flex justify-end gap-3">
              <button onClick={() => setPostToDelete(null)} className="px-4 py-2 rounded text-sm font-medium hover:bg-[#E8EAED] text-[#202124] transition-colors">
                Cancel
              </button>
              <button onClick={() => setPostToDelete(null)} className="px-4 py-2 rounded text-sm font-medium bg-[#D93025] text-white hover:bg-[#B31412] transition-colors">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
