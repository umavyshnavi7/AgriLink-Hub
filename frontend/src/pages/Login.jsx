import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', captcha: '' });
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const refreshCaptcha = () => { setCaptchaCode(generateCaptcha()); setForm(f => ({ ...f, captcha: '' })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.captcha.toUpperCase() !== captchaCode) {
      showToast('Incorrect CAPTCHA! Please try again.', 'error');
      refreshCaptcha();
      return;
    }
    setLoading(true);
    try {
      const data = await AuthService.login(form.email, form.password);
      login(data);
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => navigate(AuthService.getDashboard(data.role)), 1200);
    } catch (err) {
      showToast(err.message, 'error');
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>🌱</div>
        <h2 style={styles.title}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Verify you're human</label>
            <div style={styles.captchaBox}>
              <span style={styles.captchaCode}>{captchaCode}</span>
              <input style={styles.captchaInput} type="text" placeholder="Enter letters" autoComplete="off" required value={form.captcha} onChange={e => setForm(f => ({ ...f, captcha: e.target.value }))} />
              <button type="button" onClick={refreshCaptcha} style={styles.captchaRefresh}>🔄</button>
            </div>
          </div>
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? '⏳ Please wait...' : 'Login'}
          </button>
        </form>
        <div style={styles.links}>
          <p>Don't have an account? <Link to="/signup" style={styles.a}>Sign Up</Link></p>
          <p><Link to="/" style={styles.a}>Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #e2f0da 0%, #c8e0c0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  card: { background: 'white', padding: '3rem', borderRadius: 30, boxShadow: '0 20px 60px rgba(0,40,0,0.15)', width: '100%', maxWidth: 420 },
  logo: { textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' },
  title: { fontFamily: 'serif', color: '#1f4f2b', textAlign: 'center', marginBottom: '2rem' },
  group: { marginBottom: '1.5rem' },
  label: { display: 'block', marginBottom: '0.5rem', color: '#2e3b2e', fontWeight: 500 },
  input: { width: '100%', padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', boxSizing: 'border-box' },
  captchaBox: { background: '#f9f7eb', border: '2px solid #deecce', borderRadius: 12, padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' },
  captchaCode: { background: '#1f4f2b', color: 'white', padding: '0.4rem 0.8rem', borderRadius: 8, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 3, flexShrink: 0 },
  captchaInput: { flex: 1, minWidth: 0, padding: '0.5rem', border: '2px solid #deecce', borderRadius: 8, fontSize: '0.95rem', textAlign: 'center' },
  captchaRefresh: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 },
  btn: { width: '100%', background: 'linear-gradient(135deg, #e9b741 0%, #dda52d 100%)', color: '#1f4f2b', padding: '1rem', border: 'none', borderRadius: 12, fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' },
  links: { textAlign: 'center', marginTop: '1.5rem' },
  a: { color: '#1f4f2b', fontWeight: 500 }
};
