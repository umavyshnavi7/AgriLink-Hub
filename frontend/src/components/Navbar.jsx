import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  const close = () => setMenuOpen(false);

  const renderLinks = (isMobile = false) => {
    const s = isMobile ? mob : styles;
    if (user.isLoggedIn && user.role === 'admin') return (
      <>
        <Link to="/admin"          style={s.link} onClick={close}>🛠️ Manage Tools</Link>
        <Link to="/admin/bookings" style={s.link} onClick={close}>📋 Orders & Bookings</Link>
      </>
    );
    if (user.isLoggedIn && user.role === 'farmer') return (
      <>
        <Link to="/resources"   style={s.pill} onClick={close}>Resources</Link>
        <Link to="/marketplace" style={s.pill} onClick={close}>Marketplace</Link>
        <Link to="/ai-expert"   style={s.pill} onClick={close}>AI Expert</Link>
        <Link to="/initiatives" style={s.pill} onClick={close}>Initiatives</Link>
        <Link to="/farmer"      style={s.pill} onClick={close}>🚜 Rental Tools</Link>
        <Link to="/ask-expert"  style={s.pill} onClick={close}>Ask Expert</Link>
      </>
    );
    if (user.isLoggedIn && user.role === 'expert') return (
      <>
        <Link to="/expert"      style={s.link} onClick={close}>👨🔬 My Dashboard</Link>
        <Link to="/resources"   style={s.link} onClick={close}>Resources</Link>
        <Link to="/ai-expert"   style={s.link} onClick={close}>AI Expert</Link>
        <Link to="/initiatives" style={s.link} onClick={close}>Initiatives</Link>
      </>
    );
    if (user.isLoggedIn && user.role === 'public') return (
      <>
        <Link to="/public"      style={s.link} onClick={close}>🌍 Explore</Link>
        <Link to="/resources"   style={s.link} onClick={close}>Resources</Link>
        <Link to="/marketplace" style={s.link} onClick={close}>Marketplace</Link>
        <Link to="/ai-expert"   style={s.link} onClick={close}>AI Expert</Link>
        <Link to="/initiatives" style={s.link} onClick={close}>Initiatives</Link>
      </>
    );
    return (
      <>
        <Link to="/"            style={s.link} onClick={close}>Home</Link>
        <Link to="/resources"   style={s.link} onClick={close}>Resources</Link>
        <Link to="/marketplace" style={s.link} onClick={close}>Marketplace</Link>
        <Link to="/ai-expert"   style={s.link} onClick={close}>AI Expert</Link>
        <Link to="/initiatives" style={s.link} onClick={close}>Initiatives</Link>
      </>
    );
  };

  return (
    <nav style={styles.nav}>
      {/* Main bar */}
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>🌱 AgriLink Hub</Link>

        {/* Desktop links */}
        <div style={styles.desktopLinks}>
          {renderLinks()}
          {user.isLoggedIn ? (
            <>
              <span style={styles.userName}>👤 {user.name}</span>
              <button onClick={handleLogout} style={styles.btn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"  style={{ ...styles.btn, background: 'transparent', border: '2px solid #f5edda', color: '#f5edda' }}>Login</Link>
              <Link to="/signup" style={styles.btn}>Join</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button style={styles.hamburger} onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {renderLinks(true)}
          {user.isLoggedIn ? (
            <>
              <span style={{ color: '#f5edda', padding: '0.5rem 0', fontSize: '0.9rem' }}>👤 {user.name}</span>
              <button onClick={handleLogout} style={mob.btn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"  style={mob.btn} onClick={close}>Login</Link>
              <Link to="/signup" style={mob.btn} onClick={close}>Join</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: { background: '#1f4f2b', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 12px rgba(0,40,0,0.15)' },
  container: { maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' },
  logo: { color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 700, flexShrink: 0 },
  desktopLinks: { display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto',
    '@media(max-width:640px)': { display: 'none' }
  },
  link: { color: '#f0f7e6', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap' },
  pill: { background: '#4CAF50', color: 'white', padding: '0.35rem 0.9rem', borderRadius: 40, fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap', textDecoration: 'none' },
  btn: { background: '#e9b741', color: '#1f4f2b', padding: '0.4rem 1rem', borderRadius: 40, fontWeight: 600, textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '0.88rem', whiteSpace: 'nowrap' },
  userName: { color: '#f5edda', fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'nowrap' },
  hamburger: { display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', padding: '0.3rem', lineHeight: 1 },
  mobileMenu: { display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' },
};

const mob = {
  link: { color: 'white', textDecoration: 'none', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: 10, fontSize: '0.95rem', fontWeight: 500 },
  pill: { color: 'white', textDecoration: 'none', padding: '0.6rem 1rem', background: '#4CAF50', borderRadius: 10, fontSize: '0.95rem', fontWeight: 600 },
  btn:  { background: '#e9b741', color: '#1f4f2b', padding: '0.6rem 1rem', borderRadius: 10, fontWeight: 600, textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', textAlign: 'left' },
};
