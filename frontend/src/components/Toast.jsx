import { useState, useEffect } from 'react';

export function showToast(message, type = 'success', link = null) {
  window.dispatchEvent(new CustomEvent('agri-toast', { detail: { message, type, link } }));
}

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setToast(e.detail);
      setTimeout(() => setToast(null), 5000);
    };
    window.addEventListener('agri-toast', handler);
    return () => window.removeEventListener('agri-toast', handler);
  }, []);

  if (!toast) return null;

  const colors = {
    success: { bg: '#1f4f2b', color: '#fff', icon: '✅' },
    error:   { bg: '#c0392b', color: '#fff', icon: '❌' },
    warning: { bg: '#e9b741', color: '#1f4f2b', icon: '⚠️' },
    info:    { bg: '#2980b9', color: '#fff', icon: 'ℹ️' }
  };
  const s = colors[toast.type] || colors.info;

  return (
    <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, background: s.bg, color: s.color, padding: '1rem 1.5rem', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontWeight: 500, maxWidth: 340, animation: 'slideIn 0.3s ease' }}>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span>{s.icon}</span>
        <span style={{ flex: 1 }}>{toast.message}</span>
        <span onClick={() => setToast(null)} style={{ cursor: 'pointer', opacity: 0.7, fontSize: '1rem' }}>✕</span>
      </div>
      {toast.link && (
        <a
          href={toast.link}
          target="_blank"
          rel="noreferrer"
          style={{ color: s.color, background: 'rgba(255,255,255,0.25)', padding: '0.5rem 1rem', borderRadius: 8, fontSize: '0.9rem', textDecoration: 'none', textAlign: 'center', fontWeight: 600, border: '1px solid rgba(255,255,255,0.3)' }}
        >
          🔗 Open Official Portal →
        </a>
      )}
    </div>
  );
}
