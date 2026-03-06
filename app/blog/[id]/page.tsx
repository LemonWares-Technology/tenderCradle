import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { BlogDetailContent } from "@/components/pages/blog-detail-content";
import { Footer } from "@/components/sections/footer";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return {};
  return {
    title: `${post.title} — Tender Cradle Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BlogDetailContent post={post} />
      <Footer />
    </main>
  );
}
