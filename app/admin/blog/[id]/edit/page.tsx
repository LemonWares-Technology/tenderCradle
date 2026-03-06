"use client";

import { use } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="p-2 -ml-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-normal text-[#202124]">Edit Post</h1>
          <p className="text-sm text-[#5F6368] mt-0.5 line-clamp-1">Editing: {post.title}</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Details */}
        <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-base font-medium text-[#202124]">Post Details</h2>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Title</label>
            <input
              type="text"
              defaultValue={post.title}
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Excerpt / Summary</label>
            <textarea
              rows={3}
              defaultValue={post.excerpt}
              className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5F6368] mb-1">Category</label>
              <select defaultValue={post.category.toLowerCase().replace(" ", "-")} className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer">
                <option value="montessori">Montessori</option>
                <option value="child-development">Child Development</option>
                <option value="parenting">Parenting</option>
                <option value="nutrition">Nutrition</option>
                <option value="school-readiness">School Readiness</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5F6368] mb-1">Status</label>
              <select defaultValue={post.status.toLowerCase()} className="w-full px-4 py-2 bg-white border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm appearance-none cursor-pointer">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-base font-medium text-[#202124]">Content</h2>
          <div>
            <label className="block text-sm font-medium text-[#5F6368] mb-1">Article Body</label>
            <textarea
              rows={20}
              defaultValue={post.body.join("\n\n")}
              className="w-full px-4 py-3 bg-[#F8F9FA] border border-[#DADCE0] rounded focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all text-[#202124] text-sm font-mono resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Link href="/admin/blog" className="px-6 py-2.5 rounded text-sm font-medium text-[#5F6368] hover:bg-[#F1F3F4] transition-colors">
            Discard Changes
          </Link>
          <button type="submit" className="px-6 py-2.5 rounded text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#185ABC] transition-colors shadow-sm">
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
