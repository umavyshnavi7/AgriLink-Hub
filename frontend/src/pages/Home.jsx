import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  // Farmer Portal Home
  if (user.isLoggedIn && user.role === 'farmer') {
    return (
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem' }}>

        {/* Welcome Banner */}
        <div style={{ background: 'linear-gradient(135deg, #1f4f2b, #2b7a2b)', color: 'white', padding: '2.5rem', borderRadius: 24, marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>🌾 Welcome back, {user.name}!</h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.85, fontSize: '1.1rem' }}>Your AgriLink Farmer Portal — everything you need in one place</p>
        </div>

        {/* Quick Access Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🚜', label: 'Rental Tools', desc: 'Book farming equipment', to: '/farmer', bg: '#e4f2da', color: '#1f4f2b' },
            { icon: '🛒', label: 'Marketplace', desc: 'Connect with buyers', to: '/marketplace', bg: '#fff3cd', color: '#856404' },
            { icon: '📚', label: 'Resources', desc: 'Guides & knowledge', to: '/resources', bg: '#d1ecf1', color: '#0c5460' },
            { icon: '🤖', label: 'AI Expert', desc: 'Ask farming questions', to: '/ai-expert', bg: '#f8d7da', color: '#721c24' },
            { icon: '📅', label: 'Initiatives', desc: 'Govt schemes & funding', to: '/initiatives', bg: '#e2d9f3', color: '#4a235a' },
          ].map(c => (
            <Link key={c.label} to={c.to} style={{ background: c.bg, borderRadius: 20, padding: '1.5rem', textDecoration: 'none', display: 'block', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <h3 style={{ color: c.color, margin: '0 0 0.3rem', fontSize: '1.1rem' }}>{c.label}</h3>
              <p style={{ color: c.color, opacity: 0.8, margin: 0, fontSize: '0.85rem' }}>{c.desc}</p>
            </Link>
          ))}
        </div>

        {/* Tips Section */}
        <div style={{ background: '#f9f7eb', borderRadius: 20, padding: '2rem' }}>
          <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>💡 Today's Farming Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              { tip: 'Check soil moisture before irrigating to save 30% water', icon: '💧' },
              { tip: 'MSP 2024: Wheat ₹2,125/quintal — sell at government centers', icon: '💰' },
              { tip: 'Apply neem oil spray early morning for best pest control', icon: '🌿' },
              { tip: 'Use Meghdoot app for 5-day weather forecast before sowing', icon: '🌦️' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'white', padding: '1rem 1.2rem', borderRadius: 12, display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                <p style={{ color: '#364a36', margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default Home (not logged in or other roles)
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(115deg, #e2f0da 0%, #c8e0c0 100%)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.8rem', color: '#1d3e1d', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Inspire society, empower farmers, connect sectors
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#2b532b', marginBottom: '2rem' }}>
              A digital ecosystem where farmers, experts, and communities grow together.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/login" style={{ background: '#1f4f2b', color: 'white', padding: '0.8rem 1.8rem', borderRadius: 40, textDecoration: 'none', fontWeight: 600 }}>
                I'm a Farmer →
              </Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', minHeight: 340 }}>
            <div style={{ background: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80') center/cover", borderRadius: 20 }} />
            <div style={{ background: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80') center/cover", borderRadius: 20 }} />
            <div style={{ background: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80') center/cover", borderRadius: 20 }} />
            <div style={{ background: "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80') center/cover", borderRadius: 20 }} />
          </div>
        </div>
      </section>

      {/* Roles */}
      <div style={{ maxWidth: 1280, margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#1d4b1d', marginBottom: '2rem' }}>Who we serve</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {[
            { icon: '🚜', title: 'Farmer', desc: 'Access resources, connect with buyers & experts.', tag: '3,200+ active', role: 'farmer' },
            { icon: '🛡️', title: 'Admin', desc: 'Oversee content, verify experts, manage platform.', tag: 'coordinators', role: 'admin' }
          ].map(card => (
            <Link to="/login" key={card.role} style={{ background: 'white', borderRadius: 28, padding: '2rem', boxShadow: '0 10px 25px -8px rgba(0,40,0,0.1)', textAlign: 'center', textDecoration: 'none', color: 'inherit', border: '1px solid #deecce', display: 'block' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.icon}</div>
              <h3 style={{ color: '#1f4f2b', marginBottom: '0.5rem' }}>{card.title}</h3>
              <p style={{ color: '#3f5a3f', fontSize: '0.95rem', marginBottom: '1rem' }}>{card.desc}</p>
              <span style={{ background: '#f5edda', color: '#1f4f2b', padding: '0.3rem 1rem', borderRadius: 40, fontSize: '0.8rem', fontWeight: 600 }}>{card.tag}</span>
            </Link>
          ))}
        </div>

        {/* Features */}
        <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#1d4b1d', margin: '3rem 0 2rem' }}>Platform pillars</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { icon: '📚', title: 'Resource Library', desc: 'Guides, videos, market prices, pest management.' },
            { icon: '🤝', title: 'Expert Connect', desc: 'Direct Q&A and verified advice from agronomists.' },
            { icon: '🌾', title: 'Sector Marketplace', desc: 'Link farmers with buyers and fair-trade opportunities.' },
            { icon: '📅', title: 'Initiatives', desc: 'Government schemes, workshops, and funding.' }
          ].map(f => (
            <div key={f.title} style={{ background: '#fafcf8', borderRadius: 20, padding: '2rem', borderLeft: '8px solid #4c7a4c' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{f.icon}</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: '#2b3f2b' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #2b5e2b 0%, #1f4f2b 100%)', color: 'white', padding: '4rem 2rem', textAlign: 'center', borderRadius: '60px 60px 0 0', marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Farming feeds the world — be part of the story</h2>
        <p style={{ maxWidth: 600, margin: '0 auto 1.5rem' }}>Explore articles, success stories, and volunteer opportunities.</p>
        <Link to="/login" style={{ background: '#ffde9e', color: '#1d4b1d', padding: '0.8rem 2.5rem', borderRadius: 40, textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>Get Started</Link>
      </div>
    </div>
  );
}
