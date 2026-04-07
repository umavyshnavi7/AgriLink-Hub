import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/api';
import { showToast } from '../components/Toast';

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', captcha: '' });
  const captchaRef = useRef(generateCaptcha());
  const [captchaDisplay, setCaptchaDisplay] = useState(captchaRef.current);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const refreshCaptcha = () => {
    captchaRef.current = generateCaptcha();
    setCaptchaDisplay(captchaRef.current);
    setForm(f => ({ ...f, captcha: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.captcha.trim().toUpperCase() !== captchaRef.current) {
      showToast('Incorrect CAPTCHA! Please try again.', 'error');
      refreshCaptcha();
      return;
    }
    setLoading(true);
    try {
      await AuthService.signup(form.name, form.email, form.password, form.role);
      showToast('Account created! Redirecting to login...', 'success');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      showToast(err.message, 'error');
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const s = styles;
  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>🌱</div>
        <h2 style={s.title}>Join AgriLink Hub</h2>
        <form onSubmit={handleSubmit}>
          {[['name','Full Name','text'],['email','Email','email'],['password','Password','password']].map(([id, label, type]) => (
            <div key={id} style={s.group}>
              <label style={s.label}>{label}</label>
              <input style={s.input} type={type} required value={form[id]} onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))} />
            </div>
          ))}
          <div style={s.group}>
            <label style={s.label}>I am a</label>
            <select style={s.input} required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
              <option value="">Select your role</option>
              <option value="farmer">🚜 Farmer — Access tools, resources & marketplace</option>
              <option value="expert">👨‍🔬 Agricultural Expert — Guide farmers & create content</option>
              <option value="public">🌍 Public — Explore farming content & discussions</option>
              <option value="admin">🛡️ Admin — Manage platform & bookings</option>
            </select>
          </div>
          <div style={s.group}>
            <label style={s.label}>Verify you're human</label>
            <div style={s.captchaBox}>
              <span style={s.captchaCode}>{captchaDisplay}</span>
              <input style={s.captchaInput} type="text" placeholder="Enter letters" autoComplete="off" required value={form.captcha} onChange={e => setForm(f => ({ ...f, captcha: e.target.value }))} />
              <button type="button" onClick={refreshCaptcha} style={s.captchaRefresh}>🔄</button>
            </div>
          </div>
          <button type="submit" disabled={loading} style={s.btn}>
            {loading ? '⏳ Please wait...' : 'Sign Up'}
          </button>
        </form>
        <div style={s.links}>
          <p>Already have an account? <Link to="/login" style={s.a}>Login</Link></p>
          <p><Link to="/" style={s.a}>Back to Home</Link></p>
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
