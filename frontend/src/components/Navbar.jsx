import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span>🌱</span> AgriLink Hub
        </Link>
        <div style={styles.links}>
          {user.isLoggedIn && user.role === 'admin' ? (
            <>
              <Link to="/admin" style={styles.link}>🛠️ Manage Tools</Link>
              <Link to="/admin/bookings" style={styles.link}>📋 Orders & Bookings</Link>
              <span style={styles.userName}>👤 {user.name}</span>
              <button onClick={handleLogout} style={styles.btn}>Logout</button>
            </>
          ) : user.isLoggedIn && user.role === 'farmer' ? (
            <>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/farmer" style={styles.link}>🚜 Rental Tools</Link>
              <Link to="/resources" style={styles.link}>Resources</Link>
              <Link to="/marketplace" style={styles.link}>Marketplace</Link>
              <Link to="/ai-expert" style={styles.link}>AI Expert</Link>
              <Link to="/initiatives" style={styles.link}>Initiatives</Link>
              <span style={styles.userName}>👤 {user.name}</span>
              <button onClick={handleLogout} style={styles.btn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/resources" style={styles.link}>Resources</Link>
              <Link to="/marketplace" style={styles.link}>Marketplace</Link>
              <Link to="/ai-expert" style={styles.link}>AI Expert</Link>
              <Link to="/initiatives" style={styles.link}>Initiatives</Link>
              {user.isLoggedIn ? (
                <>
                  <span style={styles.userName}>👤 {user.name}</span>
                  <button onClick={handleLogout} style={styles.btn}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" style={{...styles.btn, ...styles.btnOutline}}>Login</Link>
                  <Link to="/signup" style={styles.btn}>Join</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { background: '#1f4f2b', color: 'white', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 12px rgba(0,40,0,0.1)' },
  container: { maxWidth: 1280, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' },
  logo: { color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' },
  links: { display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' },
  link: { color: '#f0f7e6', textDecoration: 'none', fontWeight: 500 },
  btn: { background: '#e9b741', color: '#1f4f2b', padding: '0.5rem 1.2rem', borderRadius: 40, fontWeight: 600, textDecoration: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem' },
  btnOutline: { background: 'transparent', border: '2px solid #f5edda', color: '#f5edda' },
  userName: { color: '#f5edda', fontWeight: 500, fontSize: '0.9rem' }
};
