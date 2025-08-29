'use client'

import React, { useEffect, useRef, useState } from 'react'

const CLEAR_SKY = '#9BBCD8'

// Intersection observer
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

// Counter component
function Counter({ to, from = 0, duration = 2000, suffix = '', className = '' }: {
  to: number
  from?: number
  duration?: number
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
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(from + (to - from) * eased)
      setVal(current)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString()}{suffix}
    </span>
  )
}

export default function AppleStyleHomepage() {
  return (
    <div className="min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white 
      bg-gradient-to-b from-white via-[#9BBCD8]/30 to-white">
      
      {/* Nav ... same as before */}

      {/* Hero */}
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

          {/* --- Moved Stats directly under Hero CTA --- */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="rounded-2xl border border-neutral-200 p-6 bg-white/70 backdrop-blur">
              <div className="text-3xl font-semibold text-[#0B1320]">
                <Counter to={10_000_000} suffix="+" />
              </div>
              <div className="mt-1 text-sm text-neutral-600">Views</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6 bg-white/70 backdrop-blur">
              <div className="text-3xl font-semibold text-[#0B1320]">
                <Counter to={100_000} suffix="+" />
              </div>
              <div className="mt-1 text-sm text-neutral-600">New Followers</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6 bg-white/70 backdrop-blur">
              <div className="text-3xl font-semibold text-[#0B1320]">
                <Counter to={35} suffix="%" />
              </div>
              <div className="mt-1 text-sm text-neutral-600">Conversion Rate</div>
            </div>
          </div>

          {/* video placeholder */}
          <div className="mt-16">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white/60 ring-1 ring-neutral-900/10" />
          </div>
        </div>
      </section>

      {/* Features, Highlights, Testimonials, CTA, Footer ... keep same */}
    </div>
  )
}
