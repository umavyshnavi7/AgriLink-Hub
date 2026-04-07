import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

export default function AskExpert() {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [myQuestions, setMyQuestions] = useState(() =>
    JSON.parse(localStorage.getItem('farmerQuestions') || '[]').filter(q => q.farmer === user.name)
  );

  const save = (all) => {
    localStorage.setItem('farmerQuestions', JSON.stringify(all));
    setMyQuestions(all.filter(q => q.farmer === user.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const q = { farmer: user.name, question: question.trim(), time: new Date().toLocaleString(), answered: false };
    const all = JSON.parse(localStorage.getItem('farmerQuestions') || '[]');
    all.unshift(q);
    save(all);
    setQuestion('');
    showToast('✅ Question sent to experts!', 'success');
  };

  const handleDelete = (index) => {
    if (!confirm('Delete this question?')) return;
    const all = JSON.parse(localStorage.getItem('farmerQuestions') || '[]');
    const target = myQuestions[index];
    const globalIndex = all.findIndex(q => q.farmer === target.farmer && q.question === target.question && q.time === target.time);
    if (globalIndex !== -1) all.splice(globalIndex, 1);
    save(all);
    showToast('🗑️ Question deleted.', 'success');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(myQuestions[index].question);
  };

  const handleEditSave = (index) => {
    if (!editText.trim()) return;
    const all = JSON.parse(localStorage.getItem('farmerQuestions') || '[]');
    const target = myQuestions[index];
    const globalIndex = all.findIndex(q => q.farmer === target.farmer && q.question === target.question && q.time === target.time);
    if (globalIndex !== -1) all[globalIndex].question = editText.trim();
    save(all);
    setEditIndex(null);
    showToast('✅ Question updated!', 'success');
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 2rem' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c, #2b6cb0)', color: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌾</div>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Ask an Agricultural Expert</h1>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.85 }}>Get verified answers from agricultural experts within 24 hours</p>
      </div>

      {/* Question Form */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1a3a5c', marginBottom: '1rem', fontSize: '1.2rem' }}>💬 Post Your Question</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            style={{ width: '100%', padding: '1rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical', marginBottom: '1rem', minHeight: 120 }}
            placeholder="e.g. What is the best fertilizer for sandy soil wheat crop?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
          />
          <button type="submit" style={{ width: '100%', background: '#1a3a5c', color: 'white', border: 'none', padding: '1rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>
            📨 Send to Expert
          </button>
        </form>
      </div>

      {/* My Questions */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#1a3a5c', marginBottom: '1.5rem', fontSize: '1.2rem' }}>📋 My Questions ({myQuestions.length})</h2>
        {myQuestions.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No questions yet. Ask your first question above!</p>
        ) : myQuestions.map((q, i) => (
          <div key={i} style={{ background: q.answered ? '#f0fff4' : '#fffbf0', padding: '1.2rem', borderRadius: 12, marginBottom: '1rem', borderLeft: `4px solid ${q.answered ? '#2b7a2b' : '#e9b741'}` }}>
            {editIndex === i ? (
              <>
                <textarea
                  style={{ width: '100%', padding: '0.8rem', border: '2px solid #2b6cb0', borderRadius: 10, fontSize: '0.95rem', boxSizing: 'border-box', resize: 'vertical', marginBottom: '0.8rem' }}
                  rows={3}
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEditSave(i)} style={{ background: '#1a3a5c', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Save</button>
                  <button onClick={() => setEditIndex(null)} style={{ background: '#eee', color: '#333', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p style={{ margin: '0 0 0.6rem', color: '#364a36', fontWeight: 500, lineHeight: 1.6 }}>{q.question}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ color: '#888', fontSize: '0.82rem' }}>📅 {q.time}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ background: q.answered ? '#2b7a2b' : '#e9b741', color: q.answered ? 'white' : '#1f4f2b', padding: '0.25rem 0.8rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600 }}>
                      {q.answered ? '✅ Answered' : '⏳ Pending'}
                    </span>
                    {!q.answered && (
                      <button onClick={() => handleEdit(i)} style={{ background: '#e8f0fe', color: '#1a3a5c', border: 'none', padding: '0.25rem 0.8rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>✏️ Edit</button>
                    )}
                    <button onClick={() => handleDelete(i)} style={{ background: '#fdecea', color: '#c62828', border: 'none', padding: '0.25rem 0.8rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>🗑️ Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
