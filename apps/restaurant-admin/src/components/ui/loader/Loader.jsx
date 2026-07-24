import { useState, useEffect } from 'react';

// ============ PreLoader ============
export function PreLoader({ show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (!show) {
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    } else {
      setVisible(true);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0b1437',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '1.5rem',
        opacity: show ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: show ? 'all' : 'none',
      }}
    >
      {/* Logo ring */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid rgba(249,115,22,0.2)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: '#f97316',
          animation: 'snd-spin 1s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem',
        }}>
          🍴
        </div>
      </div>

      {/* Brand name */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Scan<span style={{ color: '#f97316' }}>&</span>Dine
        </p>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.8rem',
          color: '#707eae',
          margin: '4px 0 0',
          animation: 'snd-pulse 1.5s ease-in-out infinite',
        }}>
          Loading your dashboard...
        </p>
      </div>

      <style>{`
        @keyframes snd-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes snd-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ============ Spinner ============
export function Spinner({ size = 'md', color }) {
  const sizes = { sm: 16, md: 24, lg: 36, xl: 48 };
  const px = sizes[size] || 24;
  return (
    <div style={{
      width: px, height: px, flexShrink: 0,
      borderRadius: '50%',
      border: `2px solid rgba(249,115,22,0.2)`,
      borderTopColor: color || 'var(--dyn-accent)',
      animation: 'snd-spin 0.8s linear infinite',
      display: 'inline-block',
    }}>
      <style>{`@keyframes snd-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
