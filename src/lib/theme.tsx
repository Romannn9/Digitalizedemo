import React from "react";

// ── Тепла палітра дизайн-системи (еталон — сторінка Websites) ──────────────
export const C = {
  bg: '#FAF7F2', alt: '#F3ECE1', card: '#FFFFFF',
  ink: '#1A1613', body: '#6E655B', muted: '#9C9184', soft: '#4A423A',
  border: '#EBE2D6', border2: '#DCD2C4',
  red: '#E31E24', redDark: '#C41A20', redSoft: '#FCEBEA', redSoftBorder: '#F5D2D0',
};

export const SANS = "'Sofia Sans', sans-serif";
export const COND = "'Sofia Sans Condensed', sans-serif";

// ── Спільні стилі ─────────────────────────────────────────────────────────
export const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

export const eyebrowStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
  letterSpacing: '0.2em', color: C.red, marginBottom: 12,
};

export const h2Style: React.CSSProperties = {
  fontFamily: COND, fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 800,
  letterSpacing: '-0.005em', textTransform: 'uppercase', margin: 0,
  color: C.ink, lineHeight: 1.02,
};

// ── Дрібні елементи ───────────────────────────────────────────────────────
export const Arrow = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

export const Check = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6 9 17l-5-5" /></svg>
);

// Глобальні keyframes / hover-класи теплої теми.
// Рендериться один раз на сторінку (у Layout або в корені сторінки).
export const ThemeStyles = () => (
  <style>{`
    @keyframes dzFloaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .dz-card { transition: transform .2s, box-shadow .2s, border-color .2s; }
    .dz-svc:hover { border-color:${C.red}; box-shadow:0 24px 44px -22px rgba(60,45,30,0.28); transform:translateY(-4px); }
    .dz-work:hover { transform:translateY(-4px); box-shadow:0 26px 50px -26px rgba(60,45,30,0.4); }
    .dz-work:hover img { transform:scale(1.05); }
    .dz-btn-red:hover { background:${C.redDark} !important; }
    @media (max-width: 960px) {
      .dz-hero-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
      .dz-hero-visual { display: none !important; }
      .dz-grid-4 { grid-template-columns: 1fr 1fr !important; }
      .dz-grid-3 { grid-template-columns: 1fr !important; }
      .dz-grid-2 { grid-template-columns: 1fr !important; }
      .dz-foot-top { flex-direction: column; align-items: flex-start !important; }
    }
    @media (max-width: 560px) {
      .dz-grid-4 { grid-template-columns: 1fr !important; }
      .dz-stats { flex-wrap: wrap; gap: 22px !important; }
    }
  `}</style>
);
