import { useState, useRef, useEffect } from 'react';

const responses = {
  pest: 'For pest control: 1) Neem oil spray (10ml/liter), 2) Introduce ladybugs for aphids, 3) Yellow sticky traps for whiteflies, 4) Bacillus thuringiensis for caterpillars, 5) Crop rotation prevents buildup.',
  soil: 'Soil health: 1) NPK ratio - Vegetables: 19-19-19, Rice: 20-10-10, 2) Add 5-10 tons compost/hectare, 3) Test pH every 6 months (ideal 6-7), 4) Use vermicompost, 5) Apply gypsum for saline soil.',
  water: 'Irrigation: 1) Drip irrigation saves 40-60% water, 2) Water requirement: Rice 1200-1500mm, Wheat 450-650mm, 3) Mulching reduces evaporation by 50%, 4) Check soil moisture 6 inches deep.',
  crop: 'Crop selection: 1) Kharif (June-Oct): Rice, Cotton, Maize, 2) Rabi (Nov-Mar): Wheat, Mustard, Chickpea, 3) High-yield: Rice-IR64, Wheat-HD2967, 4) Seed rate: Rice 20-25kg/acre, Wheat 40-50kg/acre.',
  market: 'Market tips: 1) MSP 2024: Wheat ₹2125/quintal, Rice ₹2183/quintal, 2) Check agmarknet.gov.in daily, 3) Sell during festivals for 10-15% premium, 4) Join FPO for better bargaining.',
  disease: 'Disease management: 1) Fungal: Mancozeb, Copper oxychloride, 2) Bacterial: Streptocycline 9%, 3) Preventive spray every 15 days in monsoon, 4) Seed treatment with Trichoderma.',
  weather: 'Weather tips: 1) Check 7-day forecast before spraying, 2) Sow after 2-3 good rains (50mm+), 3) Heatwave: Irrigate evening, use shade nets, 4) Use IMD Meghdoot app for agro-advisories.',
  organic: 'Organic farming: 1) Certification via NPOP (2-3 years), 2) FYM 10 tons/acre, Vermicompost 2 tons/acre, 3) Bio-pesticides: Neem, Bt, NPV, 4) 20-30% price premium.',
  loan: 'Government schemes: 1) PM-KISAN: ₹6,000/year, 2) KCC loan: 7% interest up to ₹3 lakh, 3) Drip irrigation subsidy: 55-90%, 4) PMFBY crop insurance: 2% premium.',
  storage: 'Storage: 1) Keep moisture below 12% for grains, 2) Hermetic bags prevent insects, 3) Cold storage: Vegetables 0-4°C, 4) Fumigation: Aluminum phosphide for large storage.',
  profit: 'Profit: 1) Rice: Cost ₹25,000/acre, Income ₹45,000, Profit ₹20,000, 2) Wheat: Cost ₹20,000, Income ₹35,000, Profit ₹15,000, 3) Vegetables: 3-4x profit but higher risk.',
};

function getResponse(q) {
  q = q.toLowerCase();
  if (q.includes('pest') || q.includes('insect') || q.includes('bug')) return responses.pest;
  if (q.includes('soil') || q.includes('fertilizer') || q.includes('nutrient')) return responses.soil;
  if (q.includes('water') || q.includes('irrigation')) return responses.water;
  if (q.includes('crop') || q.includes('seed') || q.includes('plant')) return responses.crop;
  if (q.includes('price') || q.includes('market') || q.includes('sell')) return responses.market;
  if (q.includes('disease') || q.includes('fungus') || q.includes('blight')) return responses.disease;
  if (q.includes('weather') || q.includes('rain') || q.includes('climate')) return responses.weather;
  if (q.includes('organic') || q.includes('natural')) return responses.organic;
  if (q.includes('loan') || q.includes('subsidy') || q.includes('scheme')) return responses.loan;
  if (q.includes('storage') || q.includes('warehouse')) return responses.storage;
  if (q.includes('profit') || q.includes('income') || q.includes('cost')) return responses.profit;
  return 'I can help with: Pest control, Soil & fertilizers, Irrigation, Crop selection, Market prices, Disease management, Weather, Organic farming, Government schemes, Storage, Profit calculation. Please ask a specific farming question!';
}

export default function AiExpert() {
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hello! I\'m your AI agricultural assistant. Ask me anything about farming!' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { from: 'user', text: userMsg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: getResponse(userMsg) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ background: 'linear-gradient(135deg, #1f4f2b, #2b7a2b)', color: 'white', padding: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>🤖 AI Agricultural Expert</h2>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.85 }}>Ask me anything about farming, crops, pests, or soil health</p>
        </div>
        <div style={{ height: 480, overflowY: 'auto', padding: '1.5rem', background: '#f9f7eb', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '75%', padding: '0.9rem 1.2rem', borderRadius: 15, background: msg.from === 'user' ? '#1f4f2b' : 'white', color: msg.from === 'user' ? 'white' : '#2e3b2e', border: msg.from === 'bot' ? '2px solid #deecce' : 'none', lineHeight: 1.6 }}>
                {msg.from === 'bot' && <strong>🤖 AI Expert: </strong>}{msg.text}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex' }}>
              <div style={{ background: 'white', border: '2px solid #deecce', borderRadius: 15, padding: '0.9rem 1.2rem', color: '#888' }}>🤖 Typing...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div style={{ display: 'flex', padding: '1rem', background: 'white', borderTop: '2px solid #deecce', gap: '0.5rem' }}>
          <input
            style={{ flex: 1, padding: '0.8rem', border: '2px solid #deecce', borderRadius: 12, fontSize: '1rem' }}
            placeholder="Ask your farming question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button onClick={send} style={{ padding: '0.8rem 1.5rem', background: '#1f4f2b', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>
            Send ✈️
          </button>
        </div>
      </div>
    </div>
  );
}
