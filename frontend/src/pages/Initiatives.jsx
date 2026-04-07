import { showToast } from '../components/Toast';

const schemes = [
  { title: 'PM-KISAN', status: 'Active', benefit: '₹6,000 per year in 3 installments', eligibility: 'All landholding farmers', how: 'Online through PM-KISAN portal or nearest CSC', btn: 'Apply Now', link: 'https://pmkisan.gov.in' },
  { title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', status: 'Active', benefit: 'Crop insurance against natural calamities', eligibility: 'Premium: 2% Kharif, 1.5% Rabi', how: 'Full sum insured for crop loss', btn: 'Get Insurance', link: 'https://pmfby.gov.in' },
  { title: 'Kisan Credit Card (KCC)', status: 'Active', benefit: 'Easy credit up to ₹3 lakh at 4% interest', eligibility: 'All farmers with land records', how: 'Seeds, fertilizers, equipment purchase', btn: 'Apply for KCC', link: 'https://www.nabard.org/content1.aspx?id=572' },
  { title: 'Soil Health Card Scheme', status: 'Active', benefit: 'Free soil testing and nutrient recommendations', eligibility: 'All farmers', how: 'Every 3 years — optimize fertilizer use', btn: 'Request Soil Test', link: 'https://soilhealth.dac.gov.in' },
  { title: 'PM Krishi Sinchayee Yojana (PMKSY)', status: 'Active', benefit: 'Subsidy on drip/sprinkler irrigation up to 90%', eligibility: 'All categories of farmers', how: 'Apply through state agriculture department', btn: 'Apply for Subsidy', link: 'https://pmksy.gov.in' },
  { title: 'National Mission for Sustainable Agriculture', status: 'Active', benefit: 'Training, equipment subsidy, organic farming support', eligibility: 'All farmers', how: 'Technical guidance and financial assistance', btn: 'Learn More', link: 'https://nmsa.dac.gov.in' },
];

const workshops = [
  { title: 'Organic Farming Workshop', status: 'Registration Open', date: 'March 15–17, 2025', venue: 'District Agriculture Office', topics: 'Composting, natural pest control, certification process', fee: 'Free for registered farmers' },
  { title: 'Modern Irrigation Techniques', status: 'Registration Open', date: 'March 20, 2025', venue: 'Krishi Vigyan Kendra', topics: 'Drip irrigation, water management, subsidy schemes', fee: 'Free' },
];

const seasons = [
  {
    icon: '🌾', title: 'Kharif Season (June–Oct)',
    crops: ['Rice (Paddy) — High demand', 'Maize — Good market price', 'Cotton — Export potential', 'Jowar — Drought resistant', 'Bajra — Low water requirement'],
    best: 'Monsoon regions, irrigated land'
  },
  {
    icon: '🌻', title: 'Rabi Season (Nov–Mar)',
    crops: ['Wheat — Stable market', 'Mustard — Oil seed demand', 'Chickpea — Protein crop', 'Potato — High returns', 'Onion — Year-round demand'],
    best: 'Winter crops, cool climate'
  },
  {
    icon: '☀️', title: 'Zaid Season (Mar–June)',
    crops: ['Watermelon — Summer fruit', 'Cucumber — Quick harvest', 'Muskmelon — High profit', 'Tomato — Vegetable demand', 'Green vegetables — Fast growing'],
    best: 'Summer crops, irrigated areas'
  },
];

export default function Initiatives() {
  return (
    <div style={{ maxWidth: 960, margin: '2rem auto', padding: '0 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#1d4b1d', marginBottom: '0.5rem' }}>📅 Farming Initiatives & Crop Guidance</h1>
        <p style={{ color: '#3f5a3f', fontSize: '1.1rem' }}>Government schemes, seasonal crop recommendations, and funding opportunities</p>
      </div>

      {/* Seasonal Crop Recommendations */}
      <div style={{ background: 'linear-gradient(135deg, #e4f2da, #d4e8c4)', padding: '2rem', borderRadius: 20, marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#1f4f2b', marginBottom: '0.5rem' }}>🌱 Seasonal Crop Recommendations</h2>
        <p style={{ color: '#3f5a3f', marginBottom: '1.5rem' }}>Based on current season, soil type, and market demand</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {seasons.map(s => (
            <div key={s.title} style={{ background: 'white', padding: '1.5rem', borderRadius: 15, borderLeft: '4px solid #4c7a4c' }}>
              <h3 style={{ color: '#1f4f2b', marginBottom: '1rem' }}>{s.icon} {s.title}</h3>
              <strong>Recommended Crops:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', lineHeight: 2, color: '#364a36' }}>
                {s.crops.map(c => <li key={c}>{c}</li>)}
              </ul>
              <p style={{ marginTop: '1rem', color: '#2b7a2b', fontWeight: 600 }}>✅ Best for: {s.best}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 15, marginTop: '1.5rem' }}>
          <h4 style={{ color: '#1f4f2b', marginBottom: '0.8rem' }}>💡 Smart Crop Selection Tips</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', color: '#364a36' }}>
            {['Check soil pH before planting', 'Consider water availability', 'Research current market prices', 'Rotate crops for soil health', 'Choose disease-resistant varieties'].map(t => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Government Schemes */}
      <h2 style={{ color: '#1f4f2b', marginBottom: '1.5rem' }}>🏛️ Government Schemes & Initiatives</h2>
      {schemes.map(s => (
        <div key={s.title} style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '1.5rem', boxShadow: '0 8px 20px rgba(0,20,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ color: '#1f4f2b', margin: 0 }}>{s.title}</h3>
            <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.3rem 1rem', borderRadius: 20, fontWeight: 600, fontSize: '0.85rem' }}>✅ {s.status}</span>
          </div>
          <div style={{ lineHeight: 2, color: '#364a36' }}>
            <div><strong>💰 Benefit:</strong> {s.benefit}</div>
            <div><strong>👤 Eligibility:</strong> {s.eligibility}</div>
            <div><strong>📋 Details:</strong> {s.how}</div>
          </div>
          <button
            onClick={() => showToast(`Apply for ${s.title} at: ${s.link}`, 'info', s.link)}
            style={{ marginTop: '1rem', background: '#e9b741', color: '#1f4f2b', border: 'none', padding: '0.7rem 1.8rem', borderRadius: 40, cursor: 'pointer', fontWeight: 600 }}
          >
            {s.btn}
          </button>
        </div>
      ))}

      {/* Workshops */}
      <h2 style={{ color: '#1f4f2b', margin: '2rem 0 1.5rem' }}>📚 Upcoming Workshops & Training</h2>
      {workshops.map(w => (
        <div key={w.title} style={{ background: 'white', padding: '2rem', borderRadius: 20, marginBottom: '1.5rem', boxShadow: '0 8px 20px rgba(0,20,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ color: '#1f4f2b', margin: 0 }}>{w.title}</h3>
            <span style={{ background: '#fff3cd', color: '#856404', padding: '0.3rem 1rem', borderRadius: 20, fontWeight: 600, fontSize: '0.85rem' }}>📝 {w.status}</span>
          </div>
          <div style={{ lineHeight: 2, color: '#364a36' }}>
            <div><strong>📅 Date:</strong> {w.date}</div>
            <div><strong>📍 Venue:</strong> {w.venue}</div>
            <div><strong>📖 Topics:</strong> {w.topics}</div>
            <div><strong>💳 Fee:</strong> {w.fee}</div>
          </div>
          <button
            onClick={() => showToast(`Registered for "${w.title}" successfully!`, 'success')}
            style={{ marginTop: '1rem', background: '#1f4f2b', color: 'white', border: 'none', padding: '0.7rem 1.8rem', borderRadius: 40, cursor: 'pointer', fontWeight: 600 }}
          >
            Register Now
          </button>
        </div>
      ))}
    </div>
  );
}
