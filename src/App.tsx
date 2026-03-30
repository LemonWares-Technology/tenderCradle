import { useState, useEffect } from "react";
import { Routes, Route, Outlet, useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SEO } from "@/components/seo/SEO";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Loader2, ArrowUpRight, Clock, Calendar, Sparkles } from "lucide-react";
import "@/src/admin.css";

// ─── Section Imports (Home page) ────────────────────────
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TeamSection } from "@/components/sections/team";
import { PartnersSection } from "@/components/sections/partners";
import { OfferingsSection } from "@/components/sections/offerings";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ShopPreviewSection } from "@/components/sections/shop-preview";
import { BlogPreviewSection } from "@/components/sections/blog-preview";
import { FAQSection } from "@/components/sections/faq";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { NewsletterSection } from "@/components/sections/newsletter";
import { GallerySection } from "@/components/sections/gallery";
import { CurriculumTeaser } from "@/components/sections/curriculum-teaser";
import { SafetyTeaser } from "@/components/sections/safety-teaser";
import { EnrollmentTeaser } from "@/components/sections/enrollment-teaser";
import { EventsTeaser } from "@/components/sections/events-teaser";
import { MagicalPlaygroundSection } from "@/components/sections/magical-playground";

// ─── Page Content Imports ───────────────────────────────
import { AboutPageContent } from "@/components/pages/about-content";
import { StaffPageContent } from "@/components/pages/staff-content";
import { CurriculumPageContent } from "@/components/pages/curriculum-content";
import { EnrollmentPageContent } from "@/components/pages/enrollment-content";
import { EnrollmentFormContent } from "@/components/pages/enrollment-form-content";
import { HealthSafetyPageContent } from "@/components/pages/health-safety-content";
import ParentResourcesContent from "@/components/pages/parent-resources-content";
import { ContactPageContent } from "@/components/pages/contact-content";
import { EventsPageContent } from "@/components/pages/events-content";
import { GalleryPageContent } from "@/components/pages/gallery-content";
import { ProgramsPageContent } from "@/components/pages/programs-content";
import { DailyLifePageContent } from "@/components/pages/daily-life-content";
import { ShopPageContent } from "@/components/pages/shop-content";
import { ProductPageContent } from "@/components/pages/product-content";
import { BlogDetailContent } from "@/components/pages/blog-detail-content";
import { PrivacyPageContent } from "@/components/pages/privacy-content";
import { TermsPageContent } from "@/components/pages/terms-content";
import { NotFoundContent } from "@/components/pages/not-found-content";
import CustomerLoginPage from "@/src/pages/shop/CustomerLoginPage";
import CustomerRegisterPage from "@/src/pages/shop/CustomerRegisterPage";
import CheckoutPage from "@/src/pages/shop/CheckoutPage";
import MyOrdersPage from "@/src/pages/shop/MyOrdersPage";

// ─── Blog API ──────────────────────────────────────────
import { getBlogs, getBlog, Blog } from "@/lib/api/blog";
import { blogPosts } from "@/lib/blog-data";

// ═══════════════════════════════════════════════════════════
// Layouts
// ═══════════════════════════════════════════════════════════

function PublicLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </main>
  );
}

function AdminLayout() {
  return (
    <div className="admin-root font-admin min-h-screen bg-[#F8F9FA] text-[#202124] flex">
      <AdminLayoutWrapper>
        <Outlet />
      </AdminLayoutWrapper>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Public Pages (SEO-optimized)
// ═══════════════════════════════════════════════════════════

function HomePage() {
  return (
    <>
      <SEO
        title="Childcare That Truly Cares"
        description="Tender Cradle provides safe, nurturing, and structured childcare services. After-school care, creative programs, and holistic child development."
        canonical="/"
        jsonLd={{
          "@type": "WebSite",
          name: "Tender Cradle",
          url: "https://tendercradle.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://tendercradle.com/blog?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <HeroSection />
      <AboutSection />
      <MagicalPlaygroundSection />
      <CurriculumTeaser />
      <OfferingsSection />
      <SafetyTeaser />
      <TeamSection />
      <EnrollmentTeaser />
      <TestimonialsSection />
      <PartnersSection />
      <EventsTeaser />
      <GallerySection />
      <ShopPreviewSection />
      <BlogPreviewSection />
      <FAQSection />
      <CTABannerSection />
      <NewsletterSection />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Tender Cradle's mission to provide safe, nurturing, and structured childcare for young children."
        canonical="/about"
        jsonLd={{ "@type": "AboutPage", name: "About Tender Cradle" }}
      />
      <AboutPageContent />
    </>
  );
}

function StaffPage() {
  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the dedicated educators and specialists at Tender Cradle. Our team is committed to providing premium childcare and early development."
        canonical="/staff"
        jsonLd={[
          { "@type": "WebPage", name: "Our Team — Tender Cradle" },
          ...[
            { name: "Amaka Osei-Bonsu", jobTitle: "Lead Montessori Guide" },
            { name: "Dr. Emeka Nwosu", jobTitle: "Paediatric Development Consultant" },
            { name: "Chioma Adeyemi", jobTitle: "Early Childhood Education Specialist" },
            { name: "Babatunde Fashola", jobTitle: "Operations & Family Relations" },
          ].map((p) => ({
            "@type": "Person",
            name: p.name,
            jobTitle: p.jobTitle,
            worksFor: { "@type": "Organization", name: "Tender Cradle" },
          })),
        ]}
      />
      <StaffPageContent />
    </>
  );
}

function CurriculumPage() {
  return (
    <>
      <SEO
        title="Our Curriculum"
        description="Explore Tender Cradle's holistic curriculum designed for infants, toddlers, and preschoolers. Nurturing global citizens through sensory discovery and scientific enquiry."
        canonical="/curriculum"
        jsonLd={[
          { "@type": "Course", name: "Infants Program (3–18 Months)", description: "Nurturing foundations through sensory-rich environment.", provider: { "@type": "Organization", name: "Tender Cradle" } },
          { "@type": "Course", name: "Toddlers Program (18 Months – 3 Years)", description: "Curiosity & discovery through structured play.", provider: { "@type": "Organization", name: "Tender Cradle" } },
          { "@type": "Course", name: "Preschool Program (3 – 5 Years)", description: "Readiness & beyond — preparing for formal school.", provider: { "@type": "Organization", name: "Tender Cradle" } },
        ]}
      />
      <CurriculumPageContent />
    </>
  );
}

function EnrollmentPage() {
  return (
    <>
      <SEO
        title="Enrollment & Admissions"
        description="Join the Tender Cradle family. Learn about our simple 4-step enrollment process and required documentation."
        canonical="/enrollment"
        jsonLd={{ "@type": "Service", name: "Tender Cradle Enrollment", serviceType: "Childcare Enrollment", provider: { "@type": "Organization", name: "Tender Cradle" } }}
      />
      <EnrollmentPageContent />
    </>
  );
}

function EnrollmentFormPage() {
  return (
    <>
      <SEO
        title="Enrollment Application"
        description="Complete your enrollment application to join the Tender Cradle family."
        canonical="/enrollment/apply"
        noIndex
      />
      <EnrollmentFormContent />
    </>
  );
}

function HealthSafetyPage() {
  return (
    <>
      <SEO
        title="Health & Safety"
        description="Discover our rigorous health and safety protocols. From biometric security to HEPA air purification, your child's well-being is our foundation."
        canonical="/health-safety"
        jsonLd={{ "@type": "WebPage", name: "Health & Safety — Tender Cradle" }}
      />
      <HealthSafetyPageContent />
    </>
  );
}

function ParentResourcesPage() {
  return (
    <>
      <SEO
        title="Parent Resources"
        description="Access guides, forms, health documents, and school calendars for Tender Cradle parents."
        canonical="/parent-resources"
      />
      <ParentResourcesContent />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Tender Cradle to enroll your child or learn more about our childcare services."
        canonical="/contact"
        jsonLd={{
          "@type": "ContactPage",
          name: "Contact Tender Cradle",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Tender Cradle",
            description: "Premium childcare and child development services.",
          },
        }}
      />
      <ContactPageContent />
    </>
  );
}

function EventsPage() {
  return (
    <>
      <SEO
        title="Events"
        description="Stay up to date with the Tender Cradle community. View our upcoming workshops, showcases, and celebrations."
        canonical="/events"
      />
      <EventsPageContent />
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <SEO
        title="Facility Gallery"
        description="Take a visual tour of Tender Cradle. Explore our safe, nurturing environments, from high-tech classrooms to our organic home garden."
        canonical="/gallery"
      />
      <GalleryPageContent />
    </>
  );
}

function ProgramsPage() {
  return (
    <>
      <SEO
        title="Our Programs"
        description="Explore Tender Cradle's comprehensive childcare programs including after-school care, structured play, and holistic child development."
        canonical="/programs"
      />
      <ProgramsPageContent />
    </>
  );
}

function DailyLifePage() {
  return (
    <>
      <SEO
        title="Daily Life"
        description="Explore the daily rhythm and organic nutrition at Tender Cradle. From morning yoga to fresh communal dining, see how we shape your child's day."
        canonical="/programs/daily-life"
      />
      <DailyLifePageContent />
    </>
  );
}

function ShopPage() {
  return (
    <>
      <SEO
        title="The Boutique"
        description="Browse curated essentials, uniforms, and developmental tools from Tender Cradle."
        canonical="/shop"
      />
      <ShopPageContent />
    </>
  );
}

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <SEO
        title="Product Details"
        description="View details of our curated early years essentials."
        canonical={`/shop/${id}`}
      />
      <ProductPageContent productId={id!} />
    </>
  );
}

function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogs();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load journal entries");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-[#BE185D] animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="The Tender Journal"
        description="Reflections on early childhood, parenting tips, and magical moments from our classrooms."
        canonical="/blog"
        ogType="blog"
        jsonLd={{
          "@type": "Blog",
          name: "The Tender Journal",
          description: "Reflections on early childhood, parenting tips, and magical moments.",
          publisher: { "@type": "Organization", name: "Tender Cradle" },
        }}
      />
      {error && (
        <div className="bg-red-50 text-red-600 p-8 rounded-[40px] text-center mt-32 container mx-auto border border-red-100">
          {error}
        </div>
      )}
      <BlogListContent posts={posts} />
    </>
  );
}

function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const data = await getBlog(id);
        setPost(data);
      } catch (err: any) {
        setError(err.message || "Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-[#BE185D] animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.id}`}
        ogType="article"
        ogImage={post.image ? `https://tendercradle.com${post.image}` : undefined}
        jsonLd={{
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.createdAt,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: "Tender Cradle" },
          image: post.image,
        }}
      />
      <BlogDetailContent post={post} />
    </>
  );
}


function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read the Privacy Policy of Tender Cradle to learn how we protect and manage your data."
        canonical="/privacy"
      />
      <PrivacyPageContent />
    </>
  );
}

function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the Terms of Service for Tender Cradle childcare programs."
        canonical="/terms"
      />
      <TermsPageContent />
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <SEO title="404 Not Found" description="The page you are looking for does not exist." noIndex />
      <NotFoundContent />
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// Blog List (extracted from original app/blog/page.tsx)
// ═══════════════════════════════════════════════════════════

function BlogListContent({ posts }: { posts: Blog[] }) {
  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  const formatPost = (p: Blog) => {
    const date = new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const wordsPerMinute = 200;
    const words = p.content ? p.content.split(/\s+/).length : 0;
    const readTime = `${Math.ceil(words / wordsPerMinute)} min read`;
    const category = p.tags && p.tags.length > 0 ? p.tags[0] : "Education";
    return { ...p, date, readTime, category };
  };

  const featured = featuredPost ? formatPost(featuredPost) : null;
  const rest = restPosts.map(formatPost);

  return (
    <div className="bg-[#F8FAFC] text-foreground min-h-screen pb-32">
      {/* Hero Header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-24 container mx-auto px-6 md:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center relative">
          <div className="absolute top-0 right-[20%] w-72 h-72 bg-[#FCE7F3] rounded-full opacity-60 blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute top-1/2 left-[20%] w-64 h-64 bg-[#DBEAFE] rounded-full opacity-50 blur-2xl pointer-events-none" />

          <div className="flex justify-center items-center gap-3 mb-8 relative z-10">
            <div className="h-px w-12 bg-[#BE185D]/30" />
            <span className="inline-block px-4 py-2 bg-white text-[#BE185D] font-bold uppercase tracking-widest text-[10px] rounded-full border border-[#1A1045]/5 shadow-sm">
              Resources & Insights
            </span>
            <div className="h-px w-12 bg-[#BE185D]/30" />
          </div>
          <h1 className="relative z-10 font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter text-[#1A1045] mb-6">
            The Tender <span className="text-[#BE185D] relative inline-block">Journal
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FCE7F3" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </span>.
          </h1>
          <p className="relative z-10 text-xl text-[#1A1045]/60 font-serif italic max-w-2xl mx-auto">
            Reflections on early childhood, parenting tips, and magical moments from our classrooms.
          </p>
        </motion.div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="container mx-auto px-6 md:px-12 mb-20 md:mb-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
            <Link to={`/blog/${featured.id}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center bg-white p-6 md:p-8 rounded-[40px] shadow-2xl border border-[#1A1045]/5 hover:shadow-3xl transition-shadow duration-500">
              <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-[#F8FAFC]">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]" loading="eager" />
                <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1045] shadow-sm">{featured.category}</div>
                <div className="absolute top-6 right-6 bg-[#BE185D] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1"><Sparkles className="w-3 h-3" /> Featured</div>
              </div>
              <div className="flex flex-col justify-center gap-6 lg:pr-8 lg:py-8">
                <div className="flex items-center gap-4 text-[10px] text-[#1A1045]/60 uppercase tracking-widest font-bold bg-[#F8FAFC] self-start px-4 py-2 rounded-full border border-[#1A1045]/5">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tighter text-[#1A1045] group-hover:text-[#BE185D] transition-colors">{featured.title}</h2>
                <p className="text-[#1A1045]/70 leading-relaxed font-serif italic text-lg md:text-xl">{featured.excerpt}</p>
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#1A1045]/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8] font-serif text-xl overflow-hidden shadow-inner">{featured.author[0]}</div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1045]">{featured.author}</p>
                      <p className="text-[10px] text-[#1A1045]/50 font-bold tracking-widest uppercase">{featured.role}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white border border-[#1A1045]/10 text-[#1A1045] rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#1A1045] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="w-full bg-white py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1045] tracking-tighter relative inline-block">More Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {rest.map((post, idx) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <Link to={`/blog/${post.id}`} className="group block bg-[#F8FAFC] p-4 rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col border border-[#1A1045]/5">
                  <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-white mb-6">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]" loading="lazy" />
                    <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#1A1045] shadow-sm">{post.category}</div>
                  </div>
                  <div className="px-4 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[9px] text-[#1A1045]/50 uppercase tracking-widest font-bold mb-4">
                      <span>{post.date}</span>
                      <span className="text-[#1A1045]/20">|</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-2xl leading-snug mb-4 group-hover:text-[#3B82F6] transition-colors text-[#1A1045] tracking-tight">{post.title}</h3>
                    <p className="text-[#1A1045]/60 text-sm leading-relaxed font-serif italic line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-[#1A1045]/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 group-hover:text-[#1A1045] transition-colors">Read Article</span>
                      <ArrowUpRight className="w-4 h-4 text-[#1A1045]/30 group-hover:text-[#1A1045] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Admin Pages (lazy inline wrappers with noIndex SEO)
// ═══════════════════════════════════════════════════════════

// We'll lazily import admin pages — they stay as-is but need Link/Image migrations
import AdminLoginPage from "@/src/pages/admin/LoginPage";
import AdminDashboardPage from "@/src/pages/admin/DashboardPage";
import AdminProductsPage from "@/src/pages/admin/ProductsPage";
import AdminNewProductPage from "@/src/pages/admin/NewProductPage";
import AdminEditProductPage from "@/src/pages/admin/EditProductPage";
import AdminBlogPage from "@/src/pages/admin/BlogAdminPage";
import AdminNewBlogPage from "@/src/pages/admin/NewBlogPage";
import AdminEditBlogPage from "@/src/pages/admin/EditBlogPage";
import AdminOrdersPage from "@/src/pages/admin/OrdersPage";
import AdminCustomersPage from "@/src/pages/admin/CustomersPage";
import AdminSettingsPage from "@/src/pages/admin/SettingsPage";
import AdminLeadsPage from "@/src/pages/admin/LeadsPage";
import AdminNewsletterPage from "@/src/pages/admin/NewsletterPage";
import AdminTeamPage from "@/src/pages/admin/TeamPage";
import AdminEnrollmentsPage from "@/src/pages/admin/EnrollmentsPage";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

// ═══════════════════════════════════════════════════════════
// App
// ═══════════════════════════════════════════════════════════

export default function App() {
  return (
    <Routes>
      {/* ── Public Routes ─────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/enrollment" element={<EnrollmentPage />} />
        <Route path="/enrollment/apply" element={<EnrollmentFormPage />} />
        <Route path="/health-safety" element={<HealthSafetyPage />} />
        <Route path="/parent-resources" element={<ParentResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/daily-life" element={<DailyLifePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/login" element={<CustomerLoginPage />} />
        <Route path="/shop/register" element={<CustomerRegisterPage />} />
        <Route path="/shop/checkout" element={<CheckoutPage />} />
        <Route path="/shop/orders" element={<MyOrdersPage />} />
        <Route path="/shop/:id" element={<ProductPage />} />

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Route>

      {/* ── Admin Login (public) ─────────────────────── */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* ── Admin Routes (protected, noIndex) ────────── */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminNewProductPage />} />
        <Route path="products/:id/edit" element={<AdminEditProductPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="blog/new" element={<AdminNewBlogPage />} />
        <Route path="blog/:id/edit" element={<AdminEditBlogPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="team" element={<AdminTeamPage />} />
        <Route path="leads" element={<AdminLeadsPage />} />
        <Route path="enrollments" element={<AdminEnrollmentsPage />} />
        <Route path="newsletters" element={<AdminNewsletterPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* ── 404 ───────────────────────────────────────── */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
