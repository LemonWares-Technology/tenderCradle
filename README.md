# 🧸 Tender Cradle — Premium Nursery & Childcare Platform

Tender Cradle is a high-end, editorial-style web platform designed for a modern nursery and childcare centre. Built with **Next.js 15**, **Framer Motion**, and **Tailwind CSS**, it combines a sophisticated "Montessori-inspired" aesthetic with a powerful administrative backend.

---

## ✨ Core Features

### 🎨 Premium Landing Page
- **Immersive Hero Section**: Parallax typography and scroll-linked image scaling.
- **Dynamic Stats**: Animated count-up numbers with progress reveals.
- **Editorial Gallery**: Dual-track horizontal marquee with reverse-scroll animations.
- **Interactive FAQ**: Smooth accordion transitions for parent inquiries.
- **Social Proof**: Staggered "Meet the Team" and "Trusted Partners" sections.
- **Engagement**: Animated Newsletter signup and persistent "Enroll Now" CTAs.

### 📝 Integrated Blog System
- **Listing Page (`/blog`)**: Featured article hero with a responsive grid of editorial cards.
- **Detail Pages (`/blog/[id]`)**: Full-width readability, metadata tracking, and related post suggestions.
- **Centralized Data**: A single source of truth in `lib/blog-data.ts` for easy content management.

### 🛍️ E-commerce Preview
- **Shop Preview**: Curated product cards on the landing page.
- **Individual Product Pages**: Detailed views for premium nursery essentials.
- **Global Shopping Cart**: Persistent sliding cart with real-time total calculations.

### 🔐 Admin Dashboard (`/admin`)
- **Rich Analytics Overview**: Visualized revenue charts (hover tooltips), active order tracking, and sales trends.
- **Activity Feed**: Real-time log of orders, customer registrations, and blog updates.
- **Inventory & Orders**: Dedicated management views for processing nursery stock and parent orders.
- **Content Management**: Full CRUD interface for the blog system.

---

## 🚀 UI/UX Highlights

- **Custom Navigation**: A glassmorphism Navbar that adapts as you scroll.
- **Premium Scroll-to-Top**: A floating button with an integrated SVG scroll-progress ring and dynamic direction-aware arrow rotation.
- **Branded Scrollbar**: A slim, primary-colored scrollbar that matches the platform's palette.
- **Fluid Animations**: Staggered entry reveals, spring-based interactions, and scroll-linked parallax throughout.
- **Full Responsiveness**: Every section is hand-optimized for mobile, tablet, and desktop viewing.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Logic**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) & [Nunito](https://fonts.google.com/specimen/Nunito)
- **Deployment**: Optimized for Vercel

---

## 🏃 Getting Started

1. **Clone & Install**:
   ```bash
   git clone <repository-url>
   cd tender-cradle
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/sections/`: High-level landing page components (Hero, Stats, etc.).
- `components/pages/`: Content components for individual pages (Blog, Shop).
- `components/ui/`: Reusable UI primitives (Buttons, Navbar, Scroll-to-Top).
- `lib/`: Utility functions and shared data sources.
- `public/`: Static assets, images, and branding.

---

## 📐 Design Philosophy

Tender Cradle follows an **Editorial Montessori** design logic. We prioritize whitespace, high-quality photography, and serif typography to evoke a sense of calm, structure, and premium care. Every interaction is designed to feel "alive" through subtle micro-animations that respond to the user's focus.
