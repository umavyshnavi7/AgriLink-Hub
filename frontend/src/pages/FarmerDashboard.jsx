import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const equipment = [
  { icon: '🚜', name: 'Tractors',           price: '₹800-1800/day',  desc: 'Heavy-duty tractors for plowing and tilling' },
  { icon: '🌱', name: 'Tillers',            price: '₹400-600/day',   desc: 'Soil preparation and seedbed making' },
  { icon: '✂️', name: 'Harvesters',         price: '₹800-3500/day',  desc: 'Efficient crop harvesting machines' },
  { icon: '💧', name: 'Sprayers',           price: '₹100-2000/day',  desc: 'Pesticide and fertilizer application' },
  { icon: '🚿', name: 'Irrigation',         price: '₹300-500/day',   desc: 'Water pumps and irrigation systems' },
  { icon: '🚛', name: 'Transport Vehicles', price: '₹800-1500/day',  desc: 'Crop transportation and logistics' },
];

const emptyForm = { phone: '', address: '', date: '', days: '1' };

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [modal, setModal] = useState({ open: false, tool: null });
  const [form, setForm] = useState(emptyForm);
  const [myBookings, setMyBookings] = useState(() => JSON.parse(localStorage.getItem('equipmentBookings') || '[]').filter(b => b.farmerName === user.name));
  const [question, setQuestion] = useState('');
  const [myQuestions, setMyQuestions] = useState(() => JSON.parse(localStorage.getItem('farmerQuestions') || '[]').filter(q => q.farmer === user.name));

  const openModal = (tool) => { setModal({ open: true, tool }); setForm(emptyForm); };
  const closeModal = () => setModal({ open: false, tool: null });

  const handleBook = (e) => {
    e.preventDefault();
    if (!form.phone || !form.address || !form.date || !form.days) {
      showToast('Please fill all fields.', 'error');
      return;
    }
    const booking = {
      toolName: modal.tool.name,
      farmerName: user.name,
      farmerPhone: form.phone,
      farmerAddress: form.address,
      bookingDate: form.date,
      days: form.days,
      status: 'Pending',
      cancelReason: ''
    };
    const all = JSON.parse(localStorage.getItem('equipmentBookings') || '[]');
    all.push(booking);
    localStorage.setItem('equipmentBookings', JSON.stringify(all));
    setMyBookings(all.filter(b => b.farmerName === user.name));
    showToast(`✅ Booking request sent for ${modal.tool.name}!`, 'success');
    closeModal();
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const q = { farmer: user.name, question: question.trim(), time: new Date().toLocaleString(), answered: false };
    const all = JSON.parse(localStorage.getItem('farmerQuestions') || '[]');
    all.unshift(q);
    localStorage.setItem('farmerQuestions', JSON.stringify(all));
    setMyQuestions(all.filter(q => q.farmer === user.name));
    setQuestion('');
    showToast('✅ Question sent to experts!', 'success');
  };

  return (
    <div style={{ maxWidth: 1280, margin: '2rem auto', padding: '0 2rem' }}>

      {/* Booking Modal */}
      {modal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ color: '#1f4f2b', marginBottom: '0.3rem' }}>📋 Book {modal.tool?.name}</h3>
            <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{modal.tool?.price}</p>
            <form onSubmit={handleBook}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={lbl}>Phone Number</label>
                <input style={inp} type="tel" placeholder="+91 XXXXX XXXXX" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={lbl}>Address / Farm Location</label>
                <textarea style={{ ...inp, resize: 'vertical' }} rows={2} placeholder="Village, District, State" required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={lbl}>Booking Date</label>
                  <input style={inp} type="date" required min={new Date().toISOString().split('T')[0]} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <label style={lbl}>Number of Days</label>
                  <input style={inp} type="number" min="1" max="30" required value={form.days} onChange={e => setForm(f => ({ ...f, days: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ flex: 1, background: '#1f4f2b', color: 'white', border: 'none', padding: '0.9rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Confirm Booking</button>
                <button type="button" onClick={closeModal} style={{ flex: 1, background: '#eee', color: '#333', border: 'none', padding: '0.9rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1f4f2b, #2b7a2b)', color: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>🚜 Welcome, {user.name}!</h1>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.85 }}>Rental Tools & Equipment Services</p>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/ai-expert" style={quickBtn}>🤖 Ask AI Expert</Link>
        <Link to="/marketplace" style={quickBtn}>🛒 Marketplace</Link>
        <Link to="/resources" style={quickBtn}>📚 Resources</Link>
      </div>

      {/* Equipment Grid */}
      <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>🛠️ Available Rental Equipment</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {equipment.map(eq => (
          <div key={eq.name} style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{eq.icon}</div>
            <h3 style={{ color: '#1f4f2b', marginBottom: '0.5rem' }}>{eq.name}</h3>
            <p style={{ color: '#666', marginBottom: '0.8rem' }}>{eq.desc}</p>
            <div style={{ background: '#f9f7eb', padding: '0.8rem', borderRadius: 10, marginBottom: '1rem', fontWeight: 600, color: '#1f4f2b' }}>{eq.price}</div>
            <button onClick={() => openModal(eq)} style={{ width: '100%', background: '#e9b741', color: '#1f4f2b', border: 'none', padding: '0.8rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Ask Expert Section */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color: '#1f4f2b', marginBottom: '0.5rem' }}>👨🔬 Ask an Agricultural Expert</h2>
        <p style={{ color: '#6a7e6a', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Your question will be answered by a verified expert within 24 hours</p>
        <form onSubmit={handleAskQuestion} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            style={{ flex: 1, minWidth: 200, padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', boxSizing: 'border-box' }}
            placeholder="e.g. What fertilizer is best for sandy soil wheat?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          <button type="submit" style={{ background: '#1f4f2b', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            📨 Send Question
          </button>
        </form>

        {/* My Questions */}
        {myQuestions.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ color: '#1f4f2b', marginBottom: '1rem' }}>My Questions</h4>
            {myQuestions.map((q, i) => (
              <div key={i} style={{ background: '#f9f7eb', padding: '1rem', borderRadius: 12, marginBottom: '0.8rem', borderLeft: `4px solid ${q.answered ? '#2b7a2b' : '#e9b741'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <p style={{ margin: 0, color: '#364a36', fontWeight: 500 }}>{q.question}</p>
                  <span style={{ background: q.answered ? '#2b7a2b' : '#e9b741', color: q.answered ? 'white' : '#1f4f2b', padding: '0.2rem 0.8rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {q.answered ? '✅ Answered' : '⏳ Pending'}
                  </span>
                </div>
                <span style={{ color: '#888', fontSize: '0.8rem' }}>{q.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Bookings */}
      {myBookings.length > 0 && (
        <>
          <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>📋 My Bookings</h2>
          {myBookings.map((b, i) => (
            <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: 15, marginBottom: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h4 style={{ color: '#1f4f2b', marginBottom: '0.3rem' }}>🚜 {b.toolName}</h4>
                <div style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  <div>📅 {b.bookingDate} · ⏱️ {b.days} days</div>
                  <div>📍 {b.farmerAddress}</div>
                </div>
                {b.status === 'Cancelled' && b.cancelReason && (
                  <div style={{ marginTop: '0.5rem', background: '#fdecea', padding: '0.5rem 0.8rem', borderRadius: 8, fontSize: '0.85rem', color: '#c62828' }}>
                    <strong>Reason:</strong> {b.cancelReason}
                  </div>
                )}
              </div>
              <span style={{ background: b.status === 'Confirmed' ? '#2b7a2b' : b.status === 'Cancelled' ? '#c62828' : '#e9b741', color: b.status === 'Pending' ? '#1f4f2b' : 'white', padding: '0.4rem 1rem', borderRadius: 20, fontWeight: 600, fontSize: '0.85rem' }}>
                {b.status}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const quickBtn = { background: '#e4f2da', color: '#1f4f2b', padding: '0.7rem 1.5rem', borderRadius: 40, textDecoration: 'none', fontWeight: 600 };
const lbl = { display: 'block', marginBottom: '0.4rem', fontWeight: 500, color: '#2e3b2e', fontSize: '0.9rem' };
const inp = { width: '100%', padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', boxSizing: 'border-box' };
