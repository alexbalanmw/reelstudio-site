"use client";

import { motion } from "framer-motion";
import { Camera, Film, Megaphone, BarChart3, ArrowRight } from "lucide-react";
import type { Variants } from "framer-motion";


// --- AEB Media Logo (wordmark + icon) ---
function LogoAEB({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Monogram icon */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="shrink-0">
        <rect x="2" y="2" width="24" height="24" rx="6" fill="#000"/>
        {/* Stylized AEB */}
        <path d="M8 18L11 10H12.5L15.5 18H14L13.2 16H10.8L10 18H8Z" fill="white"/>
        <rect x="16" y="10" width="2.6" height="8" fill="white"/>
        <path d="M20 10H23C24.1 10 25 10.9 25 12C25 13.1 24.1 14 23 14H21.2V18H20V10ZM23 12H21.2V13H23C23.55 13 24 12.55 24 12C24 11.45 23.55 11 23 11Z" fill="white"/>
      </svg>
      {/* Wordmark */}
      <span className="font-semibold tracking-tight">AEB Media</span>
    </div>
  );
}

// Apple‑style, minimal, high‑contrast landing page starter
// Stack assumptions
// - Next.js or Vite + React
// - Tailwind CSS configured
// - framer-motion & lucide-react installed
//   npm i framer-motion lucide-react
//   npm i -D tailwindcss postcss autoprefixer
//
// How to use in Next.js (App Router):
// 1) Place this file as app/page.tsx (rename to .tsx) or components/Landing.tsx and import it in app/page.tsx
// 2) Ensure Tailwind is set up and globals.css includes Tailwind base/components/utilities
// 3) Run: npm run dev

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};




export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">
      <SiteBg />
      <Header />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Proof />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function SiteBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_60%)]" />
      
      {/* faint overlay (noise placeholder, but safe now) */}
      <div className="absolute inset-0 opacity-[0.03]" />
    </div>
  );
}


function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center"><LogoAEB /></a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#work" className="hover:opacity-70">Work</a>
            <a href="#services" className="hover:opacity-70">Services</a>
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center rounded-full bg-black px-4 py-2 text-white text-sm font-medium hover:opacity-90">
            Get proposal <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h1 variants={fadeUp} className="text-balance text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
            Done‑for‑you Reels that drive sales
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg text-gray-600">
            Strategy, scripting, filming, editing, ads and sales systems. We make modern marketing hands off for busy owners — and focused on revenue.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center rounded-full bg-black px-6 py-3 text-white font-medium hover:opacity-90">
              Talk to us <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#work" className="inline-flex items-center rounded-full border border-black/10 px-6 py-3 font-medium hover:bg-black/5">
              See work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Cinematic content",
      text: "High‑quality Reels and Stories designed to capture attention fast.",
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: "End‑to‑end production",
      text: "We handle strategy, scripting, filming and editing so you stay focused.",
    },
    {
      icon: <Megaphone className="h-6 w-6" />,
      title: "Ads that scale",
      text: "Facebook and Google Ads to amplify reach and generate steady leads.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Sales systems",
      text: "Front desk and sales team enablement to turn attention into revenue.",
    },
  ];

  return (
    <section id="services" className="border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="rounded-2xl border border-black/10 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-black text-white p-2">{item.icon}</div>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="work" className="border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Work that looks good and sells</h2>
          <p className="mt-4 text-gray-600">Swap the image with your best case study. Keep it simple, high contrast and product‑first.</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-gray-50 to-white">
          {/* Replace with <Image /> or video */}
          <div className="aspect-[16/9] w-full bg-[url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1740&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const logos = ["Wellness Co", "Lymph Spa", "Clean Pro", "Dentist 360", "Fit Studio"];
  return (
    <section id="about" className="border-y border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-gray-500">Trusted by AEB Media clients</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {logos.map((l, i) => (
            <div key={i} className="text-center text-gray-500 text-sm border border-black/5 rounded-xl py-4">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-black text-white p-10 md:p-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(600px_200px_at_50%_-20%,rgba(255,255,255,0.35),transparent)]" />
          <div className="relative">
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">Let’s make your marketing hands off and revenue‑focused</h3>
            <p className="mt-4 text-white/80 max-w-2xl">Send us your goals. We’ll bring the strategy, content and systems to hit them.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:hello@AEBMedia.co" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-black font-medium hover:opacity-90">
                Get proposal <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#work" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 font-medium hover:bg-white/10">
                See work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} AEB Media. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:opacity-70">Privacy</a>
          <a href="#" className="hover:opacity-70">Terms</a>
        </div>
      </div>
    </footer>
  );
}
