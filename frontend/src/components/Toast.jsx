import { useState, useEffect } from 'react';

let toastFn = null;
export const showToast = (message, type = 'success') => toastFn?.(message, type);

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    toastFn = (message, type) => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3500);
    };
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
    <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, background: s.bg, color: s.color, padding: '1rem 1.5rem', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 500, maxWidth: 320 }}>
      <span>{s.icon}</span><span>{toast.message}</span>
    </div>
  );
}
