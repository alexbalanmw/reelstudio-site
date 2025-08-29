'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Apple-Style Homepage — Crash-safe version
 * - No external animation libs (no framer-motion)
 * - Solid Clear Sky hero (Pantone 14-4123 ≈ #9BBCD8)
 * - Sections: Hero, Features, Stats (animated counters), Testimonials, CTA, Footer
 * - Removed: Pricing/Packages, Recent Work
 */

const CLEAR_SKY = '#9BBCD8' // Pantone 14-4123 TCX approximation

// Simple intersection observer hook
function useInView(ref: React.RefObject<Element | null>, options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current || inView) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      })
    }, { threshold: 0.4, ...options })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, options, inView])
  return inView
}

// Animated number that counts up when it enters the viewport
function Counter({ to, from = 0, duration = 3600, suffix = '', className = '' }: {
  to: number
  from?: number
  duration?: number // ms
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref)
  const [val, setVal] = useState(from)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(from + (to - from) * eased)
      setVal(current)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, from, to, duration])

  const formatted = val.toLocaleString()
  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  )
}

export default function AppleStyleHomepage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 backdrop-blur bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg" style={{ backgroundColor: CLEAR_SKY }} aria-hidden />
            <span className="text-sm font-semibold tracking-tight">AEB Media</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
            <a className="hover:text-neutral-900" href="#features">Features</a>
            <a className="hover:text-neutral-900" href="#stats">Results</a>
            <a className="hover:text-neutral-900" href="#testimonials">Testimonials</a>
          </nav>
          <a href="#cta" className="rounded-full px-4 py-2 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition">Get started</a>
        </div>
      </header>

      {/* Hero — Solid Clear Sky */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: CLEAR_SKY }} />
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Done-for-you reels that drive sales
          </h1>
          <p className="mt-5 max-w-2xl text-lg/7 text-neutral-800">
            Strategy, scripting, filming, editing, ads and sales systems. We make modern marketing hands off for busy owners — and focused on revenue.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#cta" className="rounded-full px-5 py-3 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 transition shadow-sm">Book a demo</a>
            <a href="#features" className="rounded-full px-5 py-3 text-sm font-medium border border-neutral-900/20 text-neutral-900 hover:bg-white/70">Explore features</a>
          </div>
          <div className="mt-16">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white/60 ring-1 ring-neutral-900/10" />
          </div>
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
            { title: 'Clear Sky brand', copy: 'Pantone 14-4123 TCX as the steady background.' },
            { title: 'Premium typography', copy: 'SF-style hierarchy for instant readability.' },
            { title: 'Subtle depth', copy: 'Soft shadows, rounded corners, and clean cards that float.' },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
              <div className="h-10 w-10 rounded-xl mb-4" style={{ backgroundColor: CLEAR_SKY }} />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats / Results */}
      <section id="stats" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Real results</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">Proof over promises. These numbers animate when you scroll.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-200 p-6 text-center bg-white">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: '#0B1320' }}>
              <Counter to={100_000_000} suffix="+" duration={4800} />
            </div>
            <div className="mt-2 text-sm text-neutral-600">Total views across all accounts</div>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6 text-center bg-white">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: '#0B1320' }}>
              <Counter to={100_000} suffix="+" duration={4200} />
            </div>
            <div className="mt-2 text-sm text-neutral-600">Targeted followers gained (local buyers)</div>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6 text-center bg-white">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: '#0B1320' }}>
              <Counter to={11_000_000} duration={3800} />
            </div>
            <div className="mt-2 text-sm text-neutral-600">Views on a single viral video</div>
          </div>
        </div>
      </section>

      {/* Viral Highlights — image proofs */}
      <section id="highlights" className="bg-white">
        {/* Place these images in /public/highlights/ with the filenames below */}
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Highlights</h2>
            <p className="mt-3 max-w-2xl text-neutral-600">A few posts that took off. Screenshots show actual view counts.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/highlights/viral-11m.jpg', views: '11M', caption: 'Beauty niche – single reel' },
              { src: '/highlights/cleaning-58m.jpg', views: '5.8M', caption: 'Cleaning – mold removal' },
              { src: '/highlights/massage-1m.jpg', views: '1M', caption: 'Lymphatic massage' },
              { src: '/highlights/cleaning-706k.jpg', views: '706K', caption: 'Buccal face massage' },
              { src: '/highlights/cleaning-465k.jpg', views: '465K', caption: '10 pro cleaning tips' },
              { src: '/highlights/cleaning-301k.jpg', views: '301K', caption: '5 signs you need a cleaning' },
              { src: '/highlights/cleaning-218k.jpg', views: '218K', caption: 'Bathroom in <10 minutes' },
              { src: '/highlights/cleaning-169k.jpg', views: '169K', caption: 'Clean with us' },
              { src: '/highlights/cleaning-159k.jpg', views: '159K', caption: 'Your daily motivation' },
              { src: '/highlights/cleaning-145k.jpg', views: '145K', caption: 'Clean a bathroom with us' },
              { src: '/highlights/cleaning-86k.jpg', views: '86.6K', caption: 'POV: best service in Chicago' },
            ].map((i, idx) => (
              <figure key={idx} className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <img src={i.src} alt={i.caption} className="w-full h-full object-cover aspect-[4/5]" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-white text-sm bg-gradient-to-t from-black/70 to-transparent">
                  <span className="font-semibold">{i.views}</span>
                  <span className="opacity-90">{i.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What clients say</h2>
            <p className="mt-3 max-w-2xl text-neutral-600">Short, specific quotes tied to outcomes. Swap in your own text when ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Our videos hit millions — one reached 5.8M. The phones started ringing the same week.',
                name: 'Cleaning brand, Chicago',
              },
              {
                quote: 'We booked out weeks ahead after a single Reel crossed 706K views.',
                name: 'Spa & massage studio',
              },
              {
                quote: 'Real local followers who buy — not vanity numbers. Exactly what we needed.',
                name: 'Local business owner',
              },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
                <p className="text-sm leading-6 text-neutral-800">“{t.quote}”</p>
                <div className="mt-4 text-xs font-medium text-neutral-500">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="rounded-3xl bg-neutral-900 text-white p-10 md:p-14 overflow-hidden relative">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Ready to look premium?</h2>
            <p className="mt-3 max-w-2xl text-neutral-300">Tell us your goals. We’ll design a minimal, Apple-style site that makes your work feel inevitable.</p>
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
            <div className="h-5 w-5 rounded-md" style={{ backgroundColor: CLEAR_SKY }} />
            <span>© {new Date().getFullYear()} AEB Media</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-neutral-900" href="#">Privacy</a>
            <a className="hover:text-neutral-900" href="#">Terms</a>
            <a className="hover:text-neutral-900" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

