import { useState } from 'react';
import { showToast } from '../components/Toast';

const buyers = [
  {
    icon: '🏬', name: 'Agri Traders Co.', type: 'Wholesale Buyer', typeColor: '#e9b741',
    location: 'Bangalore, Karnataka', rating: '4.8', deals: 250, verified: true,
    buying: 'Rice, Wheat, Maize, Ragi, Jowar', quantity: '50–500 quintals', payment: 'Within 7 days',
    phone: '+91-9876543210'
  },
  {
    icon: '🏭', name: 'Fresh Vegetables Export', type: 'Export Company', typeColor: '#20b2aa',
    location: 'Mumbai, Maharashtra', rating: '4.9', deals: 180, verified: true,
    buying: 'Tomato, Potato, Onion, Cabbage, Cauliflower', quantity: '100–1000 kg daily', payment: 'Immediate payment',
    phone: '+91-9876543211'
  },
  {
    icon: '🌿', name: 'Organic Foods Ltd.', type: 'Organic Buyer', typeColor: '#32cd32',
    location: 'Delhi NCR', rating: '5.0', deals: 95, verified: true,
    buying: 'Organic Rice, Wheat, Pulses, Vegetables', quantity: '20–200 quintals', payment: 'Premium prices + Advance',
    phone: '+91-9876543212'
  },
  {
    icon: '🌶️', name: 'Spice Merchants', type: 'Spice Trader', typeColor: '#ff6b6b',
    location: 'Kochi, Kerala', rating: '4.7', deals: 320, verified: true,
    buying: 'Cardamom, Pepper, Turmeric, Ginger, Chili', quantity: '10–100 kg', payment: 'Within 3 days',
    phone: '+91-9876543213'
  },
  {
    icon: '🍎', name: 'Fruit Processing Unit', type: 'Processing Company', typeColor: '#ff8c00',
    location: 'Nashik, Maharashtra', rating: '4.6', deals: 150, verified: true,
    buying: 'Mango, Banana, Grapes, Pomegranate, Orange', quantity: '500–5000 kg', payment: 'Within 10 days',
    phone: '+91-9876543214'
  },
  {
    icon: '🐄', name: 'Dairy & Feed Suppliers', type: 'Feed Buyer', typeColor: '#7b68ee',
    location: 'Anand, Gujarat', rating: '4.8', deals: 200, verified: true,
    buying: 'Maize, Bajra, Jowar, Fodder crops', quantity: '100–1000 quintals', payment: 'Within 5 days',
    phone: '+91-9876543215'
  },
];

export default function Marketplace() {
  const [search, setSearch] = useState('');

  const filtered = buyers.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.buying.toLowerCase().includes(search.toLowerCase()) ||
    b.type.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#1d4b1d', marginBottom: '0.5rem' }}>🏪 Marketplace</h1>
        <p style={{ color: '#3f5a3f', fontSize: '1.1rem' }}>Connect with verified buyers, traders, and suppliers</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by crop, buyer name, or location..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.9rem 1.2rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem', marginBottom: '2rem', boxSizing: 'border-box' }}
      />

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6a7e6a' }}>No buyers found for "{search}"</div>
      )}

      {filtered.map((b) => (
        <div key={b.name} style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '1.5rem', boxShadow: '0 8px 20px rgba(0,20,0,0.08)', borderLeft: '5px solid #4c7a4c' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f4f2b' }}>{b.icon} {b.name}</div>
            <span style={{ background: b.typeColor, color: '#1f4f2b', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600 }}>{b.type}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginBottom: '1rem' }}>
            <span style={{ color: '#3f5a3f' }}>📍 {b.location}</span>
            <span style={{ color: '#3f5a3f' }}>⭐ {b.rating} ({b.deals} deals)</span>
            <span style={{ color: '#2b7a2b', fontWeight: 600 }}>✅ Verified Buyer</span>
          </div>

          <div style={{ background: '#f9f7eb', padding: '1rem', borderRadius: 12, marginBottom: '1rem', lineHeight: 1.8 }}>
            <div><strong>🌾 Buying:</strong> {b.buying}</div>
            <div><strong>📦 Quantity:</strong> {b.quantity}</div>
            <div><strong>💳 Payment:</strong> {b.payment}</div>
          </div>

          <button
            onClick={() => showToast(`📞 Contact ${b.name}: ${b.phone}`, 'info')}
            style={{ background: '#2b7a2b', color: 'white', padding: '0.7rem 1.8rem', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
          >
            📞 Contact Buyer
          </button>
        </div>
      ))}
    </div>
  );
}
