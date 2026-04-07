import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { useLocation } from 'react-router-dom';

const categories = ['Tractor', 'Harvester', 'Sprayer', 'Tiller', 'Irrigation', 'Other'];
const empty = { name: '', category: '', price: '', stock: '', description: '' };
const statusColors = { Confirmed: '#2b7a2b', Pending: '#e9b741', Cancelled: '#c62828' };

const defaultBookings = [
  { toolName: 'Tractor - John Deere 5050D', farmerName: 'Rajesh Kumar', farmerPhone: '+91 98765 43210', farmerAddress: 'Village Rampur, Dist. Meerut, UP', bookingDate: '2024-01-15', days: 3, status: 'Pending', cancelReason: '' },
  { toolName: 'Combine Harvester', farmerName: 'Priya Sharma', farmerPhone: '+91 87654 32109', farmerAddress: 'Khasra 245, Tehsil Karnal, Haryana', bookingDate: '2024-01-18', days: 5, status: 'Pending', cancelReason: '' },
  { toolName: 'Drip Irrigation System', farmerName: 'Suresh Patel', farmerPhone: '+91 76543 21098', farmerAddress: 'Plot 12, Anand District, Gujarat', bookingDate: '2024-01-20', days: 7, status: 'Pending', cancelReason: '' },
  { toolName: 'Rotary Tiller', farmerName: 'Amit Singh', farmerPhone: '+91 65432 10987', farmerAddress: 'Mohalla Sadar, Ludhiana, Punjab', bookingDate: '2024-01-22', days: 2, status: 'Confirmed', cancelReason: '' },
];

export default function AdminPortal() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname === '/admin/bookings' ? 'bookings' : 'tools');

  useEffect(() => {
    setTab(location.pathname === '/admin/bookings' ? 'bookings' : 'tools');
  }, [location.pathname]);
  const [tools, setTools] = useState(() => JSON.parse(localStorage.getItem('farmingTools') || '[]'));
  const [form, setForm] = useState(empty);
  const [editIndex, setEditIndex] = useState(null);
  const [bookings, setBookings] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('equipmentBookings') || '[]');
    return saved.length > 0 ? saved : defaultBookings;
  });

  // Cancel modal state
  const [cancelModal, setCancelModal] = useState({ open: false, index: null, reason: '' });

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
  const handleFormCancel = () => { setForm(empty); setEditIndex(null); };

  const confirmBooking = (i) => {
    const updated = [...bookings];
    updated[i] = { ...updated[i], status: 'Confirmed' };
    setBookings(updated);
    localStorage.setItem('equipmentBookings', JSON.stringify(updated));
    showToast(`Booking confirmed for ${updated[i].farmerName}`, 'success');
  };

  const openCancelModal = (i) => setCancelModal({ open: true, index: i, reason: '' });

  const submitCancel = () => {
    if (!cancelModal.reason.trim()) {
      showToast('Please enter a cancellation reason.', 'error');
      return;
    }
    const updated = [...bookings];
    updated[cancelModal.index] = { ...updated[cancelModal.index], status: 'Cancelled', cancelReason: cancelModal.reason };
    setBookings(updated);
    localStorage.setItem('equipmentBookings', JSON.stringify(updated));
    showToast('Booking cancelled.', 'warning');
    setCancelModal({ open: false, index: null, reason: '' });
  };

  // Sort: Pending first, then Confirmed, then Cancelled — keep original index
  const sortedBookings = bookings
    .map((b, i) => ({ ...b, _origIndex: i }))
    .sort((a, b) => {
      const order = { Pending: 0, Confirmed: 1, Cancelled: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 2rem' }}>

      {/* Cancel Reason Modal */}
      {cancelModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ color: '#c62828', marginBottom: '0.5rem' }}>❌ Cancel Booking</h3>
            <p style={{ color: '#666', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
              Cancelling booking for <strong>{bookings[cancelModal.index]?.farmerName}</strong> — <strong>{bookings[cancelModal.index]?.toolName}</strong>
            </p>
            <label style={{ display: 'block', fontWeight: 600, color: '#2e3b2e', marginBottom: '0.5rem' }}>
              Reason for Cancellation <span style={{ color: '#c62828' }}>*</span>
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Tool not available on requested date, farmer unreachable, etc."
              value={cancelModal.reason}
              onChange={e => setCancelModal(m => ({ ...m, reason: e.target.value }))}
              style={{ width: '100%', padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box', marginBottom: '1.2rem' }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={submitCancel} style={{ flex: 1, background: '#c62828', color: 'white', border: 'none', padding: '0.8rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
                Confirm Cancellation
              </button>
              <button onClick={() => setCancelModal({ open: false, index: null, reason: '' })} style={{ flex: 1, background: '#eee', color: '#333', border: 'none', padding: '0.8rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

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
          { label: 'Pending', value: pendingCount, color: '#e9b741' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', padding: '1.5rem', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ color: '#6a7e6a', fontSize: '0.9rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs - hidden, navigation handled by navbar */}

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
                  <button type="button" onClick={handleFormCancel} style={{ background: '#eee', color: '#333', padding: '0.8rem 2rem', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                )}
              </div>
            </form>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>📦 Current Inventory ({tools.length})</h2>
            {tools.length === 0 ? (
              <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No tools added yet.</p>
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
          <h2 style={{ color: '#1f4f2b', marginBottom: '0.5rem' }}>📋 All Orders & Bookings</h2>
          <p style={{ color: '#6a7e6a', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Pending orders shown first — confirm or cancel each order</p>

          {sortedBookings.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No bookings yet.</p>
          ) : sortedBookings.map((b) => {
            const realIndex = b._origIndex;
            const isPending = b.status === 'Pending';
            return (
              <div key={realIndex} style={{ background: isPending ? '#fffbf0' : '#f9f7eb', padding: '1.5rem', borderRadius: 15, marginBottom: '1rem', border: isPending ? '2px solid #e9b741' : '2px solid transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  {isPending && <div style={{ background: '#e9b741', color: '#1f4f2b', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.7rem', borderRadius: 20, display: 'inline-block', marginBottom: '0.5rem' }}>⏳ ACTION REQUIRED</div>}
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
                  {b.status === 'Cancelled' && b.cancelReason && (
                    <div style={{ marginTop: '0.6rem', background: '#fdecea', padding: '0.7rem 1rem', borderRadius: 10, fontSize: '0.9rem', color: '#c62828' }}>
                      <strong>Reason:</strong> {b.cancelReason}
                    </div>
                  )}
                </div>

                {/* Only show action buttons for Pending */}
                {isPending && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 130 }}>
                    <button onClick={() => confirmBooking(realIndex)} style={{ background: '#2b7a2b', color: 'white', padding: '0.6rem 1rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>✅ Confirm</button>
                    <button onClick={() => openCancelModal(realIndex)} style={{ background: '#c62828', color: 'white', padding: '0.6rem 1rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>❌ Cancel</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const inp = { padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
