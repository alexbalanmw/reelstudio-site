'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function Page() {
  return (
    <main>
      {/* Your existing hero content (headline, buttons, etc.) */}

      <HeroShowcase
        videos={[
          { type: 'embed', src: 'https://www.instagram.com/reel/DAAJfITRWl5/' },
          { type: 'embed', src: 'https://www.instagram.com/reel/DHqyszSxJCt/' },
          { type: 'embed', src: 'https://www.instagram.com/reel/CmP9pInAjP3/' }, // FB-viral is fine
        ]}
        stats={[
          { label: 'Total views generated', value: 100_000_000, suffix: '+' },
          { label: 'Targeted followers gained', value: 100_000, suffix: '+' },
          { label: 'Avg. watch-through lift', value: 25, suffix: '%' },
        ]}
      />
    </main>
  );
}

const DURATION_MS = 2500;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatCompact(n: number) {
  return Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

function useInViewOnce<T extends Element>(ref: React.RefObject<T>, rootMargin = '0px') {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
      },
      { root: null, rootMargin, threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, seen, rootMargin]);
  return seen;
}

function HeroShowcase({
  videos,
  stats,
}: {
  videos: Array<{ src: string; poster?: string; type?: 'mp4' | 'embed' }>;
  stats: Array<{ label: string; value: number; suffix?: string }>;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(wrapRef, '-20% 0px');

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  return (
    <section ref={wrapRef} aria-label="Reel examples and performance highlights" style={styles.section}>
      {/* Phones row */}
      <div style={styles.phonesRow}>
        {videos.slice(0, 3).map((v, i) => (
          <Phone key={i} tilt={i === 0 ? -6 : i === 2 ? 6 : 0}>
            <ReelMedia media={v} paused={!inView || prefersReducedMotion} />
          </Phone>
        ))}
      </div>

      {/* Stats row */}
      <ul style={styles.statsRow}>
        {stats.map((s, idx) => (
          <li key={idx} style={styles.statItem}>
            <AnimatedNumber
              value={s.value}
              durationMs={DURATION_MS}
              easing={easeOutCubic}
              play={inView && !prefersReducedMotion}
              style={styles.statValue}
            />
            <span style={styles.statSuffix}>{s.suffix ?? ''}</span>
            <div style={styles.statLabel}>{s.label}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Phone({ children, tilt = 0 }: { children: React.ReactNode; tilt?: number }) {
  return (
    <div style={{ ...styles.phone, transform: `rotate(${tilt}deg)` }}>
      <div style={styles.phoneBezel}>
        <div style={styles.phoneNotch} />
        <div style={styles.phoneScreen}>{children}</div>
      </div>
      <div style={styles.phoneShadow} />
    </div>
  );
}

function ReelMedia({
  media,
  paused,
}: {
  media: { src: string; poster?: string; type?: 'mp4' | 'embed' };
  paused?: boolean;
}) {
  // Decide mode up front
  const isEmbed = media.type === 'embed' || (!media.type && !media.src.endsWith('.mp4'));

  // Hooks must be unconditional
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (isEmbed) return; // no video to control
    const el = videoRef.current;
    if (!el) return;
    if (paused) el.pause();
    else el.play().catch(() => {});
  }, [paused, isEmbed]);

  if (isEmbed) {
    const embedSrc = media.src.includes('/embed')
      ? media.src
      : media.src.replace(/\/reel\/([^/?#]+)/, '/reel/$1/embed');
    return (
      <iframe
        src={embedSrc}
        style={styles.embed}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        title="Instagram Reel"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster}
      muted
      playsInline
      loop
      preload="metadata"
      style={styles.video}
      aria-label="Reel preview"
    />
  );
}

function AnimatedNumber({
  value,
  durationMs,
  easing,
  play,
  style,
}: {
  value: number;
  durationMs: number;
  easing: (t: number) => number;
  play: boolean;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!play) { setDisplay(value); return; }

    let start: number | null = null;
    function step(ts: number) {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / durationMs);
      const eased = easing(t);
      setDisplay(Math.round(value * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [play, value, durationMs, easing]);

  return <span style={style}>{formatCompact(display)}</span>;
}

const styles: Record<string, React.CSSProperties> = {
  section: { padding: '40px 0 24px', display: 'grid', gap: 32 },
  phonesRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 20,
    alignItems: 'end',
    maxWidth: 1100,
    margin: '0 auto',
  },
  phone: {
    position: 'relative',
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))',
    transition: 'transform 400ms ease',
  },
  phoneBezel: {
    position: 'relative',
    borderRadius: 32,
    background: 'linear-gradient(180deg, #0f1115, #1b1f26)',
    padding: 10,
    border: '1px solid rgba(255,255,255,0.08)',
    aspectRatio: '9/19.5',
  },
  phoneNotch: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 100,
    height: 16,
    background: '#0b0d12',
    borderRadius: 10,
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 24,
    background: '#000',
    display: 'grid',
    placeItems: 'center',
  },
  video: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  phoneShadow: {
    position: 'absolute',
    inset: 0,
    borderRadius: 32,
    boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset, 0 30px 50px rgba(0,0,0,0.18)',
    pointerEvents: 'none',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 16,
    alignItems: 'center',
    maxWidth: 900,
    margin: '-8px auto 0',
  },
  statItem: { textAlign: 'center' },
  statValue: { fontSize: 48, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.1 },
  statSuffix: { fontSize: 28, fontWeight: 700, marginLeft: 6 },
  statLabel: { marginTop: 6, fontSize: 14, opacity: 0.8 },
  embed: { width: '100%', height: '100%', border: 0, background: '#000' },
};

/* 
  For the site-wide gradient background, add this to src/app/globals.css:

  html, body { min-height: 100%; }
  body {
    background: linear-gradient(180deg, #ffffff 0%, #f1f7fd 50%, #ffffff 100%);
    background-attachment: fixed;
  }
*/
