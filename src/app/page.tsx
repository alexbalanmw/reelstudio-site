'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Page() {
  return (
    <main>
      {/* === Your existing hero content stays here === */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 20 }}>
          Done-for-you Reels that drive sales
        </h1>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button style={styles.button}>Book a demo</button>
          <button style={styles.buttonSecondary}>Explore features</button>
        </div>
      </section>

      {/* === Numbers Section === */}
      <StatsSection
        stats={[
          { label: 'Total views generated', value: 100_000_000, suffix: '+' },
          { label: 'Targeted followers gained', value: 100_000, suffix: '+' },
          { label: 'Avg. watch-through lift', value: 25, suffix: '%' },
        ]}
      />
    </main>
  );
}

// ----------------- Stats Section -----------------
function StatsSection({
  stats,
}: {
  stats: Array<{ label: string; value: number; suffix?: string }>;
}) {
  return (
    <section style={styles.statsSection}>
      <ul style={styles.statsRow}>
        {stats.map((s, idx) => (
          <li key={idx} style={styles.statItem}>
            <AnimatedNumber
              value={s.value}
              durationMs={2500}
              easing={(t) => 1 - Math.pow(1 - t, 3)}
              play={true}
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

// ----------------- Animated Number -----------------
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
    if (!play) {
      setDisplay(value);
      return;
    }
    let start: number | null = null;
    function step(ts: number) {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / durationMs);
      const eased = easing(t);
      setDisplay(Math.round(value * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [play, value, durationMs, easing]);

  return (
    <span style={style}>
      {Intl.NumberFormat(undefined, {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(display)}
    </span>
  );
}

// ----------------- Styles -----------------
const styles: Record<string, React.CSSProperties> = {
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: 8,
    border: 'none',
    background: '#111',
    color: '#fff',
    cursor: 'pointer',
  },
  buttonSecondary: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: 8,
    border: '1px solid #111',
    background: 'transparent',
    cursor: 'pointer',
  },
  statsSection: {
    padding: '60px 20px',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 32,
    maxWidth: 900,
    margin: '0 auto',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: 48,
    fontWeight: 800,
    letterSpacing: -0.5,
    lineHeight: 1.1,
  },
  statSuffix: {
    fontSize: 28,
    fontWeight: 700,
    marginLeft: 6,
  },
  statLabel: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.8,
  },
};

/*
  Add this to src/app/globals.css for the site-wide gradient background:

  html, body { min-height: 100%; }
  body {
    background: linear-gradient(180deg, #ffffff 0%, #f1f7fd 50%, #ffffff 100%);
    background-attachment: fixed;
  }
*/
