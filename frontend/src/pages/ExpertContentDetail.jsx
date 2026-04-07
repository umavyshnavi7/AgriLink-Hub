import { useParams, Link } from 'react-router-dom';

export default function ExpertContentDetail() {
  const { id } = useParams();
  const contents = JSON.parse(localStorage.getItem('expertContents') || '[]');
  const content = contents.find(c => String(c.id) === String(id));

  if (!content) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#1f4f2b' }}>
        <h2>Content not found</h2>
        <Link to="/resources" style={{ color: '#1f4f2b', fontWeight: 600 }}>← Back to Resources</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: '2rem auto', padding: '0 2rem' }}>
      <Link to="/resources" style={{ color: '#1a3a5c', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>← Back to Resources</Link>

      <div style={{ background: 'linear-gradient(135deg, #1a3a5c, #2b6cb0)', borderRadius: 20, padding: '2.5rem', textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨🔬</div>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>{content.title}</h1>
        <p style={{ opacity: 0.85, marginTop: '0.5rem' }}>
          ✍️ {content.author} · 📅 {content.date} · 🏷️ {content.category}
        </p>
      </div>

      <div style={{ background: 'white', borderRadius: 16, padding: '2rem', boxShadow: '0 4px 16px rgba(0,32,0,0.08)', lineHeight: 1.9, color: '#364a36', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
        {content.content}
      </div>

      <div style={{ background: '#e4f2da', borderRadius: 16, padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#1f4f2b', fontWeight: 600, marginBottom: '1rem' }}>Have more questions? Ask our AI Expert!</p>
        <Link to="/ai-expert" style={{ background: '#1f4f2b', color: 'white', padding: '0.8rem 2rem', borderRadius: 40, textDecoration: 'none', fontWeight: 600 }}>
          🤖 Ask AI Expert
        </Link>
      </div>
    </div>
  );
}
