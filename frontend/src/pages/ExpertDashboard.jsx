import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const emptyContent = { title: '', category: '', content: '' };
const categories = ['Soil Health', 'Pest Control', 'Irrigation', 'Crop Planning', 'Fertilizers', 'Weather', 'Market', 'Organic Farming'];

export default function ExpertDashboard() {
  const { user } = useAuth();
  const [contents, setContents] = useState(() => JSON.parse(localStorage.getItem('expertContents') || '[]'));
  const [form, setForm] = useState(emptyContent);
  const [questions] = useState([
    { farmer: 'Rajesh Kumar', question: 'What is the best fertilizer for sandy soil wheat crop?', time: '2 hours ago' },
    { farmer: 'Priya Sharma', question: 'How to control aphids organically in cotton?', time: '5 hours ago' },
    { farmer: 'Suresh Patel', question: 'When should I start drip irrigation for tomatoes?', time: '1 day ago' },
  ]);
  const [answer, setAnswer] = useState({ open: false, index: null, text: '' });

  const handlePost = (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.content) { showToast('Fill all fields.', 'error'); return; }
    const updated = [{ ...form, author: user.name, date: new Date().toLocaleDateString(), id: Date.now() }, ...contents];
    setContents(updated);
    localStorage.setItem('expertContents', JSON.stringify(updated));
    setForm(emptyContent);
    showToast('Content published successfully!', 'success');
  };

  const handleAnswer = (i) => {
    if (!answer.text.trim()) { showToast('Please write an answer.', 'error'); return; }
    showToast(`Answer sent to ${questions[i].farmer}!`, 'success');
    setAnswer({ open: false, index: null, text: '' });
  };

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 2rem' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c, #2b6cb0)', color: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>👨‍🔬 Expert Dashboard</h1>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.85 }}>Welcome, {user.name} — Guide farmers & share knowledge</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Content Posted', value: contents.length, color: '#1a3a5c' },
          { label: 'Questions', value: questions.length, color: '#2b6cb0' },
          { label: 'Farmers Helped', value: 120, color: '#2b7a2b' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', padding: '1.5rem', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ color: '#6a7e6a', fontSize: '0.9rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Create Content */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#1a3a5c', marginBottom: '1.5rem' }}>📝 Create Educational Content</h2>
        <form onSubmit={handlePost}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <input style={inp} placeholder="Content Title" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <select style={inp} required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <textarea style={{ ...inp, width: '100%', boxSizing: 'border-box', resize: 'vertical', marginBottom: '1rem' }} rows={5} placeholder="Write your guidance, tips, or educational content here..." required value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
          <button type="submit" style={{ background: '#1a3a5c', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
            🚀 Publish Content
          </button>
        </form>
      </div>

      {/* Farmer Questions */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#1a3a5c', marginBottom: '1.5rem' }}>❓ Farmer Questions</h2>
        {questions.map((q, i) => (
          <div key={i} style={{ background: '#f0f7ff', padding: '1.2rem', borderRadius: 12, marginBottom: '1rem', borderLeft: '4px solid #2b6cb0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <strong style={{ color: '#1a3a5c' }}>👤 {q.farmer}</strong>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>{q.time}</span>
            </div>
            <p style={{ color: '#364a36', margin: '0 0 0.8rem' }}>{q.question}</p>
            {answer.open && answer.index === i ? (
              <div>
                <textarea style={{ ...inp, width: '100%', boxSizing: 'border-box', resize: 'vertical', marginBottom: '0.5rem' }} rows={3} placeholder="Write your answer..." value={answer.text} onChange={e => setAnswer(a => ({ ...a, text: e.target.value }))} />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleAnswer(i)} style={{ background: '#2b7a2b', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Send Answer</button>
                  <button onClick={() => setAnswer({ open: false, index: null, text: '' })} style={{ background: '#eee', color: '#333', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAnswer({ open: true, index: i, text: '' })} style={{ background: '#2b6cb0', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>💬 Answer</button>
            )}
          </div>
        ))}
      </div>

      {/* My Published Content */}
      {contents.length > 0 && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1a3a5c', marginBottom: '1.5rem' }}>📚 My Published Content ({contents.length})</h2>
          {contents.map(c => (
            <div key={c.id} style={{ background: '#f9f7eb', padding: '1.2rem', borderRadius: 12, marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h4 style={{ color: '#1a3a5c', margin: 0 }}>{c.title}</h4>
                <span style={{ background: '#2b6cb0', color: 'white', padding: '0.2rem 0.8rem', borderRadius: 20, fontSize: '0.8rem' }}>{c.category}</span>
              </div>
              <p style={{ color: '#364a36', margin: 0, fontSize: '0.9rem' }}>{c.content.substring(0, 150)}{c.content.length > 150 ? '...' : ''}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inp = { padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem' };
