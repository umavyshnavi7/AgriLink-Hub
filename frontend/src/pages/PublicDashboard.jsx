import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const discussions = [
  { title: 'How does crop rotation benefit soil health?', author: 'Dr. Amina', replies: 12, category: 'Soil Health' },
  { title: 'Best practices for water conservation in dry regions', author: 'Expert Ravi', replies: 8, category: 'Irrigation' },
  { title: 'Organic vs chemical fertilizers — pros and cons', author: 'Dr. Patil', replies: 15, category: 'Fertilizers' },
  { title: 'How to identify and treat common crop diseases?', author: 'Expert Meena', replies: 6, category: 'Pest Control' },
];

const articles = [
  { icon: '🌱', title: 'The Future of Sustainable Farming', desc: 'How modern techniques are transforming agriculture worldwide.', category: 'Sustainability' },
  { icon: '💧', title: 'Water Crisis & Agriculture', desc: 'Understanding the impact of water scarcity on food production.', category: 'Water' },
  { icon: '🌾', title: 'Women in Farming — Success Stories', desc: 'Inspiring stories of women leading agricultural change.', category: 'Community' },
  { icon: '🤖', title: 'AI & Technology in Modern Farming', desc: 'How drones, sensors, and AI are revolutionizing agriculture.', category: 'Technology' },
];

export default function PublicDashboard() {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [posted, setPosted] = useState([]);

  const handlePost = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setPosted(p => [{ text: question, time: 'Just now' }, ...p]);
    setQuestion('');
    showToast('Your question has been posted!', 'success');
  };

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 2rem' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #4a235a, #7b2d8b)', color: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>🌍 Public Dashboard</h1>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.85 }}>Welcome, {user.name} — Explore farming content & join discussions</p>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: '📚', label: 'Resources', to: '/resources', bg: '#e4f2da' },
          { icon: '🛒', label: 'Marketplace', to: '/marketplace', bg: '#fff3cd' },
          { icon: '🤖', label: 'AI Expert', to: '/ai-expert', bg: '#f8d7da' },
          { icon: '📅', label: 'Initiatives', to: '/initiatives', bg: '#e2d9f3' },
        ].map(c => (
          <Link key={c.label} to={c.to} style={{ background: c.bg, borderRadius: 16, padding: '1.2rem', textDecoration: 'none', textAlign: 'center', display: 'block' }}>
            <div style={{ fontSize: '2rem' }}>{c.icon}</div>
            <div style={{ color: '#1f4f2b', fontWeight: 600, marginTop: '0.4rem' }}>{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Ask a Question */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#4a235a', marginBottom: '1rem' }}>💬 Ask the Community</h2>
        <form onSubmit={handlePost} style={{ display: 'flex', gap: '1rem' }}>
          <input
            style={{ flex: 1, padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem' }}
            placeholder="Ask a farming question..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          <button type="submit" style={{ background: '#4a235a', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Post</button>
        </form>
        {posted.map((p, i) => (
          <div key={i} style={{ background: '#f9f0ff', padding: '0.8rem 1rem', borderRadius: 10, marginTop: '0.8rem', color: '#4a235a' }}>
            <strong>You:</strong> {p.text} <span style={{ color: '#888', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{p.time}</span>
          </div>
        ))}
      </div>

      {/* Discussions */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#4a235a', marginBottom: '1.5rem' }}>🗣️ Active Discussions</h2>
        {discussions.map((d, i) => (
          <div key={i} style={{ background: '#f9f0ff', padding: '1.2rem', borderRadius: 12, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h4 style={{ color: '#4a235a', margin: '0 0 0.3rem' }}>{d.title}</h4>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>by {d.author} · {d.replies} replies</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ background: '#7b2d8b', color: 'white', padding: '0.2rem 0.8rem', borderRadius: 20, fontSize: '0.8rem' }}>{d.category}</span>
              <button onClick={() => showToast('Joining discussion...', 'info')} style={{ background: '#4a235a', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>Join</button>
            </div>
          </div>
        ))}
      </div>

      {/* Articles */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#4a235a', marginBottom: '1.5rem' }}>📰 Featured Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {articles.map((a, i) => (
            <div key={i} style={{ background: '#f9f0ff', padding: '1.5rem', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{a.icon}</div>
              <h4 style={{ color: '#4a235a', marginBottom: '0.4rem' }}>{a.title}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.8rem' }}>{a.desc}</p>
              <span style={{ background: '#7b2d8b', color: 'white', padding: '0.2rem 0.8rem', borderRadius: 20, fontSize: '0.8rem' }}>{a.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
