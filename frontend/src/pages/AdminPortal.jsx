import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

const categories = ['Tractor', 'Harvester', 'Sprayer', 'Tiller', 'Irrigation', 'Other'];
const empty = { name: '', category: '', price: '', stock: '', description: '' };
const statusColors = { Confirmed: '#2b7a2b', Pending: '#e9b741', Cancelled: '#c62828' };

const defaultBookings = [
  { toolName: 'Tractor - John Deere 5050D', farmerName: 'Rajesh Kumar', farmerPhone: '+91 98765 43210', farmerAddress: 'Village Rampur, Dist. Meerut, UP', bookingDate: '2024-01-15', days: 3, status: 'Confirmed' },
  { toolName: 'Combine Harvester', farmerName: 'Priya Sharma', farmerPhone: '+91 87654 32109', farmerAddress: 'Khasra 245, Tehsil Karnal, Haryana', bookingDate: '2024-01-18', days: 5, status: 'Confirmed' },
  { toolName: 'Drip Irrigation System', farmerName: 'Suresh Patel', farmerPhone: '+91 76543 21098', farmerAddress: 'Plot 12, Anand District, Gujarat', bookingDate: '2024-01-20', days: 7, status: 'Pending' },
  { toolName: 'Rotary Tiller', farmerName: 'Amit Singh', farmerPhone: '+91 65432 10987', farmerAddress: 'Mohalla Sadar, Ludhiana, Punjab', bookingDate: '2024-01-22', days: 2, status: 'Confirmed' },
];

export default function AdminPortal() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('tools');
  const [tools, setTools] = useState(() => JSON.parse(localStorage.getItem('farmingTools') || '[]'));
  const [form, setForm] = useState(empty);
  const [editIndex, setEditIndex] = useState(null);
  const [bookings, setBookings] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('equipmentBookings') || '[]');
    return saved.length > 0 ? saved : defaultBookings;
  });

  const saveTools = (updated) => { setTools(updated); localStorage.setItem('farmingTools', JSON.stringify(updated)); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...tools];
      updated[editIndex] = { ...form, id: tools[editIndex].id };
      saveTools(updated); setEditIndex(null);
      showToast('Tool updated successfully!', 'success');
    } else {
      saveTools([...tools, { ...form, id: Date.now() }]);
      showToast('Tool added successfully!', 'success');
    }
    setForm(empty);
  };

  const handleEdit = (i) => { setForm(tools[i]); setEditIndex(i); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleDelete = (i) => {
    if (!window.confirm('Delete this tool?')) return;
    saveTools(tools.filter((_, idx) => idx !== i));
    showToast('Tool deleted.', 'warning');
  };
  const handleCancel = () => { setForm(empty); setEditIndex(null); };

  const updateStatus = (i, status) => {
    const updated = [...bookings];
    updated[i] = { ...updated[i], status };
    setBookings(updated);
    localStorage.setItem('equipmentBookings', JSON.stringify(updated));
    showToast(`Booking marked as ${status}`, 'success');
  };

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 2rem' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1f4f2b, #2b7a2b)', color: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>🛠️ Admin Management Portal</h1>
          <p style={{ margin: '0.3rem 0 0', opacity: 0.85 }}>Welcome, {user.name} — Manage tools & bookings</p>
        </div>
        <button onClick={logout} style={{ background: '#e9b741', color: '#1f4f2b', border: 'none', padding: '0.7rem 1.5rem', borderRadius: 40, fontWeight: 600, cursor: 'pointer' }}>Logout</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Tools', value: tools.length, color: '#1f4f2b' },
          { label: 'Total Stock', value: tools.reduce((s, t) => s + Number(t.stock || 0), 0), color: '#2b7a2b' },
          { label: 'Total Orders', value: bookings.length, color: '#4a90e2' },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'Confirmed').length, color: '#e9b741' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', padding: '1.5rem', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ color: '#6a7e6a', fontSize: '0.9rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[['tools', '🛠️ Manage Tools'], ['bookings', '📋 Orders & Bookings']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ padding: '0.7rem 1.5rem', borderRadius: 40, border: 'none', cursor: 'pointer', fontWeight: 600, background: tab === key ? '#1f4f2b' : '#e4f2da', color: tab === key ? 'white' : '#1f4f2b' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Tools Tab */}
      {tab === 'tools' && (
        <>
          <div style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>{editIndex !== null ? '✏️ Edit Tool' : '➕ Add New Tool'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input style={inp} placeholder="Tool Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <select style={inp} required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input style={inp} type="number" placeholder="Price per day (₹)" required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                <input style={inp} type="number" placeholder="Available Stock" required value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
              </div>
              <textarea style={{ ...inp, width: '100%', boxSizing: 'border-box', resize: 'vertical' }} rows={3} placeholder="Tool Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ background: '#2b7a2b', color: 'white', padding: '0.8rem 2rem', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
                  {editIndex !== null ? 'Update Tool' : 'Add Tool'}
                </button>
                {editIndex !== null && (
                  <button type="button" onClick={handleCancel} style={{ background: '#eee', color: '#333', padding: '0.8rem 2rem', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                )}
              </div>
            </form>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>📦 Current Inventory ({tools.length})</h2>
            {tools.length === 0 ? (
              <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No tools added yet. Add your first tool above.</p>
            ) : tools.map((tool, i) => (
              <div key={tool.id} style={{ background: '#f9f7eb', padding: '1.5rem', borderRadius: 15, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#1f4f2b', marginBottom: '0.4rem' }}>{tool.name}</h3>
                  <p style={{ color: '#666', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{tool.description}</p>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <span style={{ background: '#e9b741', padding: '0.2rem 0.8rem', borderRadius: 12, fontSize: '0.85rem', fontWeight: 600 }}>{tool.category}</span>
                    <span style={{ color: '#2b7a2b', fontWeight: 700 }}>₹{tool.price}/day</span>
                    <span style={{ color: '#666' }}>Stock: {tool.stock}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(i)} style={{ background: '#4a90e2', color: 'white', padding: '0.5rem 1.2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                  <button onClick={() => handleDelete(i)} style={{ background: '#c62828', color: 'white', padding: '0.5rem 1.2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bookings Tab */}
      {tab === 'bookings' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>📋 All Orders & Bookings ({bookings.length})</h2>
          {bookings.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No bookings yet.</p>
          ) : bookings.map((b, i) => (
            <div key={i} style={{ background: '#f9f7eb', padding: '1.5rem', borderRadius: 15, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#1f4f2b', marginBottom: '0.5rem' }}>🚜 {b.toolName}</h3>
                <div style={{ lineHeight: 1.9, color: '#364a36' }}>
                  <div><strong>👤 Farmer:</strong> {b.farmerName}</div>
                  <div><strong>📞 Phone:</strong> {b.farmerPhone}</div>
                  <div><strong>📍 Address:</strong> {b.farmerAddress}</div>
                  <div><strong>📅 Date:</strong> {b.bookingDate}</div>
                  <div><strong>⏱️ Duration:</strong> {b.days} days</div>
                </div>
                <span style={{ background: statusColors[b.status] || '#888', color: b.status === 'Pending' ? '#1f4f2b' : 'white', padding: '0.3rem 0.9rem', borderRadius: 12, fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginTop: '0.8rem' }}>
                  {b.status}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => updateStatus(i, 'Confirmed')} style={{ background: '#2b7a2b', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>✅ Confirm</button>
                <button onClick={() => updateStatus(i, 'Pending')} style={{ background: '#e9b741', color: '#1f4f2b', padding: '0.5rem 1rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>⏳ Pending</button>
                <button onClick={() => updateStatus(i, 'Cancelled')} style={{ background: '#c62828', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>❌ Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inp = { padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
