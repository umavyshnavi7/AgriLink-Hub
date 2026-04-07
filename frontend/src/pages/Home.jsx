import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

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
          <div style={{ background: "url('https://images.unsplash.com/photo-1523348837708-15d4a6cf8d2e?w=800&q=80') center/cover", borderRadius: 30, minHeight: 300, boxShadow: '0 20px 30px -10px rgba(60,90,40,0.3)' }} />
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
