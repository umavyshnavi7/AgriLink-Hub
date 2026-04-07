import { useNavigate } from 'react-router-dom';

const staticResources = [
  { slug: 'soil-health',          icon: '🌱', color: '#4c7a4c', title: 'Soil Health Management',         meta: 'Guide • 15 min read', desc: 'Learn soil testing, pH balance, organic matter, and nutrient management for better yields.' },
  { slug: 'water-conservation',   icon: '💧', color: '#2b7a2b', title: 'Water Conservation Techniques',   meta: 'Guide • 20 min read', desc: 'Drip irrigation, rainwater harvesting, and efficient water usage methods.' },
  { slug: 'pest-control',         icon: '🐛', color: '#8B5A2B', title: 'Organic Pest Control',             meta: 'Guide • 12 min read', desc: 'Natural pest management using neem, companion planting, and biological controls.' },
  { slug: 'crop-planning',        icon: '📊', color: '#e9b741', title: 'Crop Planning & Rotation',         meta: 'Guide • 18 min read', desc: 'Seasonal planning, crop rotation benefits, and maximizing land productivity.' },
  { slug: 'fertilizers',          icon: '🧪', color: '#c44545', title: 'Organic Fertilizers Guide',        meta: 'Guide • 10 min read', desc: 'Compost making, vermicompost, green manure, and natural fertilizer recipes.' },
  { slug: 'weather-farming',      icon: '🌦️', color: '#4a90e2', title: 'Weather-Based Farming',           meta: 'Guide • 15 min read', desc: 'Using weather forecasts, climate adaptation, and seasonal strategies.' },
  { slug: 'government-schemes',   icon: '💰', color: '#7b68ee', title: 'Government Schemes & Subsidies',  meta: 'Guide • 8 min read',  desc: 'PM-KISAN, crop insurance, loan schemes, and subsidy application process.' },
  { slug: 'farming-equipment',    icon: '🚜', color: '#ff6b6b', title: 'Modern Farming Equipment',        meta: 'Guide • 25 min read', desc: 'Tractors, tillers, harvesters - selection, maintenance, and cost-effective usage.' },
  { slug: 'marketing',            icon: '🛒', color: '#20b2aa', title: 'Marketing Your Produce',          meta: 'Guide • 14 min read', desc: 'Finding buyers, pricing strategies, direct marketing, and online selling.' },
  { slug: 'organic-certification',icon: '🍎', color: '#32cd32', title: 'Organic Farming Certification',   meta: 'Guide • 12 min read', desc: 'Steps to get organic certification, benefits, and premium pricing opportunities.' },
  { slug: 'cooperatives',         icon: '👥', color: '#ff8c00', title: 'Farmer Cooperatives',              meta: 'Guide • 10 min read', desc: 'Forming FPOs, collective bargaining, shared resources, and group benefits.' },
  { slug: 'digital-tools',        icon: '📱', color: '#9370db', title: 'Digital Tools for Farmers',       meta: 'Guide • 18 min read', desc: 'Mobile apps for weather, market prices, soil testing, and expert advice.' },
];

const categoryColors = {
  'Soil Health': '#4c7a4c', 'Pest Control': '#8B5A2B', 'Irrigation': '#2b7a2b',
  'Crop Planning': '#e9b741', 'Fertilizers': '#c44545', 'Weather': '#4a90e2',
  'Market': '#20b2aa', 'Organic Farming': '#32cd32'
};

export default function Resources() {
  const navigate = useNavigate();
  const expertContents = JSON.parse(localStorage.getItem('expertContents') || '[]');

  return (
    <div style={{ maxWidth: 1280, margin: '2rem auto', padding: '0 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#1d4b1d', marginBottom: '0.5rem' }}>📚 Resource Library</h1>
        <p style={{ color: '#3f5a3f', fontSize: '1.1rem' }}>Free guides, videos, and expert knowledge for every farmer</p>
      </div>

      {/* Expert Published Content */}
      {expertContents.length > 0 && (
        <>
          <h2 style={{ color: '#1a3a5c', marginBottom: '1.5rem', fontSize: '1.5rem' }}>👨🔬 Expert Published Content</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {expertContents.map((c) => (
              <div key={c.id} style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,32,0,0.1)', transition: 'transform 0.2s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ background: categoryColors[c.category] || '#1a3a5c', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  👨🔬
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#1d4b1d', marginBottom: '0.4rem', fontSize: '1.1rem' }}>{c.title}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#6a7e6a', marginBottom: '0.8rem' }}>
                    👤 {c.author} · {c.date} · {c.category}
                  </div>
                  <p style={{ color: '#364a36', fontSize: '0.95rem', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                    {c.content.substring(0, 120)}{c.content.length > 120 ? '...' : ''}
                  </p>
                  <button
                    onClick={() => navigate(`/resources/expert/${c.id}`)}
                    style={{ background: '#1a3a5c', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: 40, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '2px solid #deecce', marginBottom: '3rem' }} />
        </>
      )}

      {/* Static Guides */}
      <h2 style={{ color: '#1d4b1d', marginBottom: '1.5rem', fontSize: '1.5rem' }}>📖 Farming Guides</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {staticResources.map((r) => (
          <div key={r.title} style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,32,0,0.1)', transition: 'transform 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ background: r.color, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
              {r.icon}
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h4 style={{ color: '#1d4b1d', marginBottom: '0.4rem', fontSize: '1.1rem' }}>{r.title}</h4>
              <div style={{ fontSize: '0.85rem', color: '#6a7e6a', marginBottom: '0.8rem' }}>📖 {r.meta}</div>
              <p style={{ color: '#364a36', fontSize: '0.95rem', marginBottom: '1.2rem', lineHeight: 1.6 }}>{r.desc}</p>
              <button onClick={() => navigate(`/resources/${r.slug}`)} style={{ background: '#1f4f2b', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: 40, cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                Read Guide →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
