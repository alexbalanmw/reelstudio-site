'use client'

import React from "react";
import { motion } from "framer-motion";

/**
 * Apple‑Style Homepage
 *
 * Notes
 * - TailwindCSS utility classes for spacing, grid, and typography
 * - Uses your gradient palette: #3BA9FF → #9A5BFF → #FF58C4
 * - Clean, minimal, generous whitespace, subtle motion
 * - Replace placeholders (logo, images, copy) with your assets
 */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function AppleStyleHomepage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 backdrop-blur bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4]"
              aria-hidden
            />
            <span className="text-sm font-semibold tracking-tight">Your Brand</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
            <a className="hover:text-neutral-900" href="#features">Features</a>
            <a className="hover:text-neutral-900" href="#gallery">Work</a>
            <a className="hover:text-neutral-900" href="#metrics">Results</a>
            <a className="hover:text-neutral-900" href="#pricing">Pricing</a>
          </nav>
          <a
            href="#cta"
            className="rounded-full px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition"
          >
            Get started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#EAF4FF] via-white to-[#FFF0FA]" />
        <div className="mx-auto max-w-6xl px-4 py-20">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Apple‑clean design for content that converts.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg text-neutral-600">
              Minimal layout, premium feel, and a gradient system inspired by your palette:
              <span className="mx-2 font-medium text-neutral-900">#3BA9FF</span>→
              <span className="mx-2 font-medium text-neutral-900">#9A5BFF</span>→
              <span className="mx-2 font-medium text-neutral-900">#FF58C4</span>.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
              <a
                href="#cta"
                className="rounded-full px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4] shadow-sm hover:opacity-95 transition"
              >
                Book a demo
              </a>
              <a href="#features" className="rounded-full px-5 py-3 text-sm font-medium text-neutral-900 border border-neutral-200 hover:bg-neutral-50">
                Explore features
              </a>
            </motion.div>

            {/* Hero visual */}
            <motion.div variants={fadeUp} className="mt-16">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-sm">
                {/* Replace with your hero image/video */}
                <div className="h-full w-full bg-gradient-to-br from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Designed to feel effortless</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">Whitespace, crisp typography, and subtle motion—everything tuned for clarity and focus.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Gradient‑driven brand",
              copy: "Consistent blue→purple→pink accents with neutral backdrops.",
            },
            { title: "Premium typography", copy: "SF‑style hierarchy for instant readability." },
            {
              title: "Subtle depth",
              copy: "Soft shadows, rounded corners, and clean cards that float.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4] mb-4" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{f.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery / Work */}
      <section id="gallery" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Recent work</h2>
              <p className="mt-3 max-w-2xl text-neutral-600">Drop your images and case studies here. Each card supports titles and short blurbs.</p>
            </div>
            <a href="#" className="text-sm font-medium text-neutral-900 hover:opacity-70">View all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <motion.div
                key={n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group overflow-hidden rounded-2xl bg-white border border-neutral-200"
              >
                <div className="aspect-[4/3] w-full bg-neutral-100">
                  {/* Replace with <img src="..." /> */}
                  <div className="h-full w-full bg-gradient-to-br from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4] opacity-90 group-hover:opacity-100 transition" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold">Project {n}</h3>
                  <p className="mt-1 text-sm text-neutral-600">Short one‑liner about impact/results.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Real results</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">Use proof over promises. Replace with your metrics.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { k: "5.6M", v: "views on one Reel" },
            { k: "+4,000", v: "followers gained" },
            { k: "12/15", v: "Reels ranked top‑10%" },
            { k: "92%", v: "client retention" },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 p-6 text-center bg-white">
              <div className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4] bg-clip-text text-transparent">
                {m.k}
              </div>
              <div className="mt-2 text-sm text-neutral-600">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Simple pricing</h2>
            <p className="mt-3 max-w-2xl mx-auto text-neutral-600">Choose a plan and scale when you’re ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "$495", features: ["3 Reels", "1 shoot day", "Basic captions"] },
              { name: "Growth", price: "$1,295", features: ["8 Reels", "2 shoot days", "A/B hooks", "CTA testing"] },
              { name: "Pro", price: "$2,895", features: ["15 Reels", "Strategy + scripts", "Analytics dashboard"] },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <div className="text-xl font-semibold">{p.price}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800"
                >
                  Choose {p.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4] opacity-10" />
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="rounded-3xl bg-neutral-900 text-white p-10 md:p-14 overflow-hidden relative">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4] opacity-30 blur-3xl" />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to look premium?</h2>
            <p className="mt-3 max-w-2xl text-neutral-300">Tell us your goals. We’ll design a minimal, Apple‑style site that makes your work feel inevitable.</p>
            <form className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                className="rounded-full px-5 py-3 text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none"
                placeholder="Your email"
              />
              <input
                className="rounded-full px-5 py-3 text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none"
                placeholder="What do you need?"
              />
              <button
                type="button"
                className="rounded-full px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4] shadow-sm hover:opacity-95"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/70">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-[#3BA9FF] via-[#9A5BFF] to-[#FF58C4]" />
            <span>© {new Date().getFullYear()} Your Brand</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-neutral-900" href="#">Privacy</a>
            <a className="hover:text-neutral-900" href="#">Terms</a>
            <a className="hover:text-neutral-900" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
