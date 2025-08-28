'use client'

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/**
 * Apple‑Style Homepage — Solid Clear Sky background (Pantone 14-4123 TCX ≈ #9BBCD8)
 *
 * Keeps your original wording. Removes Pricing/Packages.
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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function AppleStyleHomepage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 backdrop-blur bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-[#9BBCD8]" aria-hidden />
            <span className="text-sm font-semibold tracking-tight">Your Brand</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
            <a className="hover:text-neutral-900" href="#features">Features</a>
            <a className="hover:text-neutral-900" href="#gallery">Work</a>
          </nav>
          <a href="#cta" className="rounded-full px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition">Get started</a>
        </div>
      </header>

      {/* Hero — Solid Clear Sky background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#9BBCD8]" />
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
          <motion.div variants={stagger} initial="hidden" animate="show" className="text-neutral-900">
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Apple‑clean design for content that converts.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg/7 text-neutral-800">
              Minimal layout, premium feel, and a system that lets your work speak.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
              <a href="#cta" className="rounded-full px-5 py-3 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition shadow-sm">Book a demo</a>
              <a href="#features" className="rounded-full px-5 py-3 text-sm font-medium border border-neutral-900/20 text-neutral-900 hover:bg-white/70">Explore features</a>
            </motion.div>

            {/* Hero visual frame */}
            <motion.div variants={fadeUp} className="mt-16">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white/60 ring-1 ring-neutral-900/10" />
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
            { title: "Clear Sky brand", copy: "Pantone 14‑4123 TCX as the steady background." },
            { title: "Premium typography", copy: "SF‑style hierarchy for instant readability." },
            { title: "Subtle depth", copy: "Soft shadows, rounded corners, and clean cards that float." },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
              <div className="h-10 w-10 rounded-xl bg-[#9BBCD8] mb-4" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{f.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-white">
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
              <motion.div key={n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="group overflow-hidden rounded-2xl bg-white border border-neutral-200">
                <div className="aspect-[4/3] w-full bg-neutral-100" />
                <div className="p-4">
                  <h3 className="text-base font-semibold">Project {n}</h3>
                  <p className="mt-1 text-sm text-neutral-600">Short one‑liner about impact/results.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="rounded-3xl bg-neutral-900 text-white p-10 md:p-14 overflow-hidden relative">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to look premium?</h2>
            <p className="mt-3 max-w-2xl text-neutral-300">Tell us your goals. We’ll design a minimal, Apple‑style site that makes your work feel inevitable.</p>
            <form className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input className="rounded-full px-5 py-3 text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none" placeholder="Your email" />
              <input className="rounded-full px-5 py-3 text-sm text-neutral-900 bg-white placeholder:text-neutral-400 focus:outline-none" placeholder="What do you need?" />
              <button type="button" className="rounded-full px-5 py-3 text-sm font-medium text-neutral-900 bg-white hover:bg-white/90">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/70">
        <div className="mx-auto max-w-6xl px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-[#9BBCD8]" />
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
