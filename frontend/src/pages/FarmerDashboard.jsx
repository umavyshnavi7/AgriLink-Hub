import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function FarmerDashboard() {
  const { user } = useAuth();

  const equipment = [
    { icon: '🚜', name: 'Tractors', price: '₹800-1800/day', desc: 'Heavy-duty tractors for plowing and tilling' },
    { icon: '🌱', name: 'Tillers', price: '₹400-600/day', desc: 'Soil preparation and seedbed making' },
    { icon: '✂️', name: 'Harvesters', price: '₹800-3500/day', desc: 'Efficient crop harvesting machines' },
    { icon: '💧', name: 'Sprayers', price: '₹100-2000/day', desc: 'Pesticide and fertilizer application' },
    { icon: '🚿', name: 'Irrigation', price: '₹300-500/day', desc: 'Water pumps and irrigation systems' },
    { icon: '🚛', name: 'Transport', price: '₹800-1500/day', desc: 'Crop transportation and logistics' },
  ];

  return (
    <div style={{ maxWidth: 1280, margin: '2rem auto', padding: '0 2rem' }}>
      <div style={{ background: 'linear-gradient(135deg, #1f4f2b, #2b7a2b)', color: 'white', padding: '2rem', borderRadius: 20, marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>🚜 Welcome, {user.name}!</h1>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.85 }}>Equipment Rental Services</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Link to="/ai-expert" style={quickBtn}>🤖 Ask AI Expert</Link>
        <Link to="/marketplace" style={quickBtn}>🛒 Marketplace</Link>
        <Link to="/resources" style={quickBtn}>📚 Resources</Link>
      </div>

      <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>🛠️ Available Equipment</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {equipment.map(eq => (
          <div key={eq.name} style={{ background: 'white', padding: '2rem', borderRadius: 20, boxShadow: '0 5px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{eq.icon}</div>
            <h3 style={{ color: '#1f4f2b', marginBottom: '0.5rem' }}>{eq.name}</h3>
            <p style={{ color: '#666', marginBottom: '0.8rem' }}>{eq.desc}</p>
            <div style={{ background: '#f9f7eb', padding: '0.8rem', borderRadius: 10, marginBottom: '1rem', fontWeight: 600, color: '#1f4f2b' }}>{eq.price}</div>
            <button style={{ width: '100%', background: '#e9b741', color: '#1f4f2b', border: 'none', padding: '0.8rem', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const quickBtn = { background: '#e4f2da', color: '#1f4f2b', padding: '0.7rem 1.5rem', borderRadius: 40, textDecoration: 'none', fontWeight: 600 };
