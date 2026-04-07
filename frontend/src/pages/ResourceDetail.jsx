import { useParams, Link } from 'react-router-dom';

const guides = {
  'soil-health': {
    icon: '🌱', color: '#4c7a4c', title: 'Soil Health Management', meta: 'Guide • 15 min read',
    sections: [
      { heading: 'Why Soil Health Matters', content: 'Healthy soil is the foundation of productive farming. It provides nutrients, water retention, and a habitat for beneficial microorganisms that support plant growth.' },
      { heading: 'Soil Testing', content: 'Test your soil every 6 months. Check pH (ideal 6–7), NPK levels, and organic matter. Use government-approved labs or soil health card scheme for free testing.' },
      { heading: 'pH Management', content: 'Acidic soil (pH < 6): Apply agricultural lime (2–3 tons/acre). Alkaline soil (pH > 7.5): Apply gypsum or sulfur. Neutral soil grows most crops best.' },
      { heading: 'Organic Matter', content: 'Add 5–10 tons of FYM (Farm Yard Manure) per hectare annually. Use vermicompost (2 tons/acre) for faster nutrient release. Green manure crops like Dhaincha improve soil structure.' },
      { heading: 'Nutrient Management', content: 'NPK ratios: Vegetables 19-19-19, Rice 20-10-10, Wheat 12-32-16. Apply micronutrients (Zinc, Boron, Iron) based on soil test results. Avoid over-fertilization to prevent soil degradation.' },
      { heading: 'Crop Rotation Benefits', content: 'Rotate legumes (pulses) with cereals to fix nitrogen naturally. This reduces fertilizer costs by 20–30% and breaks pest/disease cycles.' },
    ]
  },
  'water-conservation': {
    icon: '💧', color: '#2b7a2b', title: 'Water Conservation Techniques', meta: 'Guide • 20 min read',
    sections: [
      { heading: 'Drip Irrigation', content: 'Saves 40–60% water compared to flood irrigation. Cost: ₹50,000–80,000/acre. Government subsidy: 55–90% available. Ideal for vegetables, fruits, and sugarcane.' },
      { heading: 'Sprinkler Irrigation', content: 'Best for vegetables and wheat. Saves 30–40% water. Uniform coverage reduces disease. Cost: ₹25,000–40,000/acre with 50% subsidy available.' },
      { heading: 'Rainwater Harvesting', content: '1 acre catches ~40,000 liters per inch of rain. Build farm ponds (50x50x3m) to store runoff. Cost: ₹1–2 lakh with 50% government subsidy.' },
      { heading: 'Mulching', content: 'Reduces evaporation by 50%. Use crop residue, plastic mulch, or organic material. Plastic mulch cost: ₹8,000–12,000/acre. Also controls weeds.' },
      { heading: 'Critical Irrigation Stages', content: 'Rice: Transplanting, tillering, flowering. Wheat: Crown root, jointing, flowering, grain filling. Never skip irrigation at flowering stage — yield loss can be 30–50%.' },
      { heading: 'Soil Moisture Monitoring', content: 'Check moisture 6 inches deep before irrigating. Use tensiometers for precision. Water early morning or evening to reduce evaporation losses by 20%.' },
    ]
  },
  'pest-control': {
    icon: '🐛', color: '#8B5A2B', title: 'Organic Pest Control', meta: 'Guide • 12 min read',
    sections: [
      { heading: 'Neem-Based Solutions', content: 'Neem oil spray: 10ml/liter water + 2ml soap. Spray every 7–10 days. Effective against aphids, whiteflies, mites. Cost: ₹200–300/acre per spray.' },
      { heading: 'Biological Controls', content: 'Introduce ladybugs for aphids, Trichogramma wasps for borers. Use Bacillus thuringiensis (Bt) for caterpillars. NPV (Nuclear Polyhedrosis Virus) for bollworms.' },
      { heading: 'Trap Crops', content: 'Plant marigold borders to repel nematodes. Use mustard as trap crop for aphids. Sunflower attracts beneficial insects. Reduces pesticide use by 40%.' },
      { heading: 'Physical Controls', content: 'Yellow sticky traps for whiteflies and thrips (10/acre). Light traps for moths (1/acre). Pheromone traps for bollworms and stem borers (5/acre).' },
      { heading: 'Cultural Practices', content: 'Deep summer plowing kills soil-borne pests. Remove crop residues after harvest. Maintain field hygiene. Crop rotation breaks pest cycles. Proper spacing improves air circulation.' },
      { heading: 'Emergency Organic Sprays', content: 'Garlic-chili spray: 100g garlic + 50g chili in 1L water, dilute 1:10. Tobacco decoction for sucking pests. Cow urine (diluted 1:10) as general pest repellent.' },
    ]
  },
  'crop-planning': {
    icon: '📊', color: '#e9b741', title: 'Crop Planning & Rotation', meta: 'Guide • 18 min read',
    sections: [
      { heading: 'Kharif Season (June–October)', content: 'Main crops: Rice, Cotton, Maize, Soybean, Groundnut, Sugarcane. Sow after 2–3 good rains (50mm+). High water requirement season.' },
      { heading: 'Rabi Season (November–March)', content: 'Main crops: Wheat, Mustard, Chickpea, Lentil, Peas. Cool weather crops. Irrigation critical as rainfall is low. High market demand.' },
      { heading: 'Zaid Season (March–June)', content: 'Short duration crops: Watermelon, Cucumber, Muskmelon, Moong. High temperature tolerant. Good profit margins due to summer demand.' },
      { heading: 'Crop Rotation Plan', content: 'Year 1: Rice → Wheat. Year 2: Cotton → Chickpea. Year 3: Maize → Mustard. Legume every 3rd season fixes nitrogen, saving ₹3,000–5,000/acre in fertilizer.' },
      { heading: 'High-Yield Varieties', content: 'Rice: IR64, Swarna, MTU-7029. Wheat: HD2967, PBW343, GW322. Cotton: Bt varieties. Maize: NK6240, DKC9144. Always buy certified seeds from authorized dealers.' },
      { heading: 'Intercropping Benefits', content: 'Maize + Cowpea: 30% more income. Sugarcane + Garlic: Utilizes space. Cotton + Moong: Extra income of ₹8,000–10,000/acre. Reduces risk of total crop failure.' },
    ]
  },
  'fertilizers': {
    icon: '🧪', color: '#c44545', title: 'Organic Fertilizers Guide', meta: 'Guide • 10 min read',
    sections: [
      { heading: 'Farm Yard Manure (FYM)', content: 'Apply 10–15 tons/hectare. Contains N:P:K = 0.5:0.25:0.5%. Decompose for 3–4 months before use. Best applied 2–3 weeks before sowing.' },
      { heading: 'Vermicompost', content: 'Apply 2–3 tons/acre. N:P:K = 1.5:1:1.5% + micronutrients. 3x more effective than FYM. Cost: ₹4,000–6,000/ton. Can be made on-farm in 45–60 days.' },
      { heading: 'Green Manure', content: 'Grow Dhaincha, Sunhemp, or Cowpea for 45–60 days then plow in. Adds 80–100 kg N/hectare. Saves ₹4,000–6,000/acre in urea cost.' },
      { heading: 'Compost Making', content: 'Layer crop residue, animal dung, and soil (3:1:0.5 ratio). Maintain moisture (40–60%). Turn every 15 days. Ready in 90 days. Cost: ₹500–800/ton (vs ₹4,000 for chemical fertilizer).' },
      { heading: 'Bio-fertilizers', content: 'Rhizobium for pulses (fixes 50–100 kg N/ha). Azotobacter for cereals. PSB (Phosphate Solubilizing Bacteria) for phosphorus. Cost: ₹50–100/acre. Mix with seeds before sowing.' },
      { heading: 'Liquid Organic Fertilizers', content: 'Jeevamrit: 10kg dung + 10L urine + 1kg jaggery + 1kg pulse flour in 200L water. Ferment 7 days. Apply 200L/acre. Panchagavya: 5 cow products mixed, dilute 3% for foliar spray.' },
    ]
  },
  'weather-farming': {
    icon: '🌦️', color: '#4a90e2', title: 'Weather-Based Farming', meta: 'Guide • 15 min read',
    sections: [
      { heading: 'Weather Apps for Farmers', content: 'IMD Meghdoot app: Free 5-day agro-advisory. Kisan Suvidha: Weather + market prices. Damini: Lightning alerts. mKisan: SMS weather alerts. All free on Android.' },
      { heading: 'Sowing Decisions', content: 'Sow Kharif after 2–3 consecutive rains totaling 50mm+. Avoid sowing if heavy rain forecast in 3 days. Check 10-day forecast before transplanting. Soil temperature should be 20–25°C.' },
      { heading: 'Heatwave Management', content: 'Irrigate in evening (not afternoon). Use shade nets (50% shade) for vegetables. Apply kaolin clay spray to reduce leaf temperature. Harvest early morning to reduce field heat.' },
      { heading: 'Frost Protection', content: 'Light irrigation before frost (releases heat). Smoke screens in field borders. Cover nurseries with polythene. Apply potassium fertilizer to improve cold tolerance.' },
      { heading: 'Heavy Rain & Flooding', content: 'Ensure proper drainage channels (30cm deep). Stake tall crops before monsoon. Apply fungicide after flooding. Drain waterlogged fields within 24 hours to prevent root rot.' },
      { heading: 'Drought Management', content: 'Use drought-tolerant varieties. Apply mulch to conserve moisture. Reduce plant population by 20%. Foliar spray of KNO3 (1%) reduces water stress. Harvest early if drought continues.' },
    ]
  },
  'government-schemes': {
    icon: '💰', color: '#7b68ee', title: 'Government Schemes & Subsidies', meta: 'Guide • 8 min read',
    sections: [
      { heading: 'PM-KISAN', content: '₹6,000/year in 3 installments of ₹2,000. All landholding farmers eligible. Register at pmkisan.gov.in or nearest CSC. Aadhaar and bank account required.' },
      { heading: 'Kisan Credit Card (KCC)', content: 'Loan up to ₹3 lakh at 7% interest (4% with timely repayment). Covers crop, post-harvest, and allied activities. Apply at any bank with land records and Aadhaar.' },
      { heading: 'PMFBY Crop Insurance', content: 'Premium: 2% for Kharif, 1.5% for Rabi, 5% for horticulture. Government pays remaining premium. Covers drought, flood, pest, disease. Enroll before sowing through bank or CSC.' },
      { heading: 'Drip/Sprinkler Subsidy', content: 'Small farmers: 55% subsidy. SC/ST/Women: 90% subsidy. Apply through state horticulture department. Documents: Land record, Aadhaar, bank account, quotation from supplier.' },
      { heading: 'Solar Pump Scheme', content: 'PM-KUSUM: 60–90% subsidy on solar pumps. 3HP pump costs ₹1.5 lakh, farmer pays only ₹15,000–60,000. Apply through state agriculture department or DISCOM.' },
      { heading: 'FPO Formation Grant', content: '₹15 lakh grant for forming Farmer Producer Organization (10+ farmers). Additional ₹18 lakh equity grant. Apply through NABARD or SFAC. Benefits: bulk buying, better prices, credit access.' },
    ]
  },
  'farming-equipment': {
    icon: '🚜', color: '#ff6b6b', title: 'Modern Farming Equipment', meta: 'Guide • 25 min read',
    sections: [
      { heading: 'Tractor Selection', content: '20–30 HP: Small farms (<5 acres), cost ₹4–6 lakh. 40–50 HP: Medium farms, cost ₹7–10 lakh. 60+ HP: Large farms, cost ₹12–20 lakh. Subsidy: 40–50% for small farmers.' },
      { heading: 'Soil Preparation Equipment', content: 'Rotavator: ₹80,000–1.5 lakh, saves 60% time vs manual. Power tiller: ₹1–1.5 lakh for small farms. Disc harrow: ₹40,000–80,000. Rental: ₹400–800/hour.' },
      { heading: 'Sowing Equipment', content: 'Seed drill: ₹30,000–80,000, saves 20–30% seed. Zero-till drill: ₹1–1.5 lakh, saves fuel and moisture. Transplanter (rice): ₹1.5–3 lakh, plants 1 acre in 2 hours.' },
      { heading: 'Harvesting Equipment', content: 'Combine harvester: ₹20–35 lakh (rental ₹1,500–2,500/hour). Reaper: ₹80,000–1.5 lakh. Thresher: ₹50,000–1.5 lakh. Saves 70% labor cost at harvest.' },
      { heading: 'Spraying Equipment', content: 'Manual knapsack: ₹800–1,500. Power sprayer: ₹8,000–15,000. Drone sprayer: ₹5–8 lakh (rental ₹400–600/acre). Drone covers 10 acres/hour vs 1 acre manually.' },
      { heading: 'Custom Hiring Centers', content: 'Government CHCs provide equipment at 50% below market rate. Find nearest CHC at agrimachinery.nic.in. Also available through FPOs and cooperative societies.' },
    ]
  },
  'marketing': {
    icon: '🛒', color: '#20b2aa', title: 'Marketing Your Produce', meta: 'Guide • 14 min read',
    sections: [
      { heading: 'Minimum Support Price (MSP)', content: '2024 MSP: Wheat ₹2,125/quintal, Rice ₹2,183/quintal, Cotton ₹6,620/quintal, Maize ₹2,090/quintal. Sell to government procurement centers to get MSP guaranteed.' },
      { heading: 'e-NAM Platform', content: 'National Agriculture Market (enam.gov.in). Sell to buyers across India online. Register with Aadhaar + bank account. 585+ mandis connected. Get 10–15% better prices.' },
      { heading: 'Direct Marketing', content: 'Farmers markets: Sell directly, earn 30–40% more. Vegetable boxes to urban consumers. Restaurant supply contracts. Social media selling (WhatsApp groups). Reduces middlemen.' },
      { heading: 'Grading & Packaging', content: 'Grade A produce gets 20–30% premium. Use standard crates and packaging. Label with farm name and quality. Cold storage extends shelf life 3–5x. Reduces post-harvest loss from 30% to 5%.' },
      { heading: 'Contract Farming', content: 'Sign contracts with companies (ITC, Pepsi, Reliance Fresh). Guaranteed price before sowing. Company provides inputs and technical support. Reduces market risk significantly.' },
      { heading: 'Value Addition', content: 'Tomato → ketchup: 3x value. Milk → paneer/ghee: 2x value. Wheat → flour: 1.5x value. Turmeric → powder: 4x value. Small processing units cost ₹50,000–2 lakh with 50% subsidy.' },
    ]
  },
  'organic-certification': {
    icon: '🍎', color: '#32cd32', title: 'Organic Farming Certification', meta: 'Guide • 12 min read',
    sections: [
      { heading: 'Why Get Certified?', content: 'Organic produce sells at 20–50% premium. Growing urban demand. Export opportunities. Better for soil health long-term. Government support through PKVY scheme.' },
      { heading: 'Certification Process', content: '1) Apply to NPOP-accredited certifying agency. 2) Farm inspection. 3) 2–3 year conversion period. 4) Annual renewal. Cost: ₹10,000–25,000/year. Group certification cheaper.' },
      { heading: 'PKVY Scheme', content: 'Paramparagat Krishi Vikas Yojana: ₹50,000/hectare over 3 years. Covers certification cost, inputs, and training. Form groups of 50 farmers (minimum 50 acres). Apply through state agriculture dept.' },
      { heading: 'Allowed Inputs', content: 'Fertilizers: FYM, compost, vermicompost, biofertilizers. Pesticides: Neem, Bt, copper-based fungicides, pheromone traps. No synthetic chemicals, GMO seeds, or sewage sludge.' },
      { heading: 'Record Keeping', content: 'Maintain field diary: inputs used, dates, quantities. Keep purchase receipts for all inputs. Record yields and sales. Inspectors check records annually. Digital records preferred.' },
      { heading: 'Selling Organic Produce', content: 'Register on Jaivik Kheti portal (jaivikkheti.in). Sell to organic stores, supermarkets, export houses. Online platforms: BigBasket, Amazon Fresh. Farmers markets command highest premium.' },
    ]
  },
  'cooperatives': {
    icon: '👥', color: '#ff8c00', title: 'Farmer Cooperatives', meta: 'Guide • 10 min read',
    sections: [
      { heading: 'What is an FPO?', content: 'Farmer Producer Organization: A company owned by farmers. Minimum 10 members. Registered under Companies Act. Combines resources for better bargaining power and access to credit.' },
      { heading: 'Benefits of FPO', content: 'Bulk input purchase: 15–20% cheaper. Better output prices: 10–20% more. Access to credit: ₹15 lakh grant + loans. Shared equipment: Reduces individual cost by 60–70%.' },
      { heading: 'How to Form an FPO', content: '1) Gather 50–500 farmers. 2) Register with NABARD/SFAC. 3) Open bank account. 4) Elect board of directors. 5) Apply for ₹15 lakh equity grant. Process takes 3–6 months.' },
      { heading: 'Government Support', content: '₹15 lakh equity grant per FPO. ₹18 lakh additional matching equity. Credit guarantee up to ₹2 crore. Training and capacity building support. Tax exemption for first 5 years.' },
      { heading: 'Successful FPO Activities', content: 'Collective procurement of seeds, fertilizers, equipment. Common processing and storage facility. Direct marketing to retailers and exporters. Agri-tourism and farm stays. Custom hiring services.' },
      { heading: 'Finding Your FPO', content: 'Search at sfacindia.com or nabard.org. Contact district agriculture officer. Join existing FPO or form new one. ATMA (Agriculture Technology Management Agency) provides support.' },
    ]
  },
  'digital-tools': {
    icon: '📱', color: '#9370db', title: 'Digital Tools for Farmers', meta: 'Guide • 18 min read',
    sections: [
      { heading: 'Weather & Advisory Apps', content: 'Meghdoot (IMD): 5-day agro-advisory, free. Kisan Suvidha: Weather + market + expert advice. Damini: Lightning alerts. mKisan: SMS-based advisories in local language.' },
      { heading: 'Market Price Apps', content: 'Agmarknet: Real-time mandi prices across India. e-NAM: Online trading platform. Commodity Online: Price trends and forecasts. All free, available in Hindi and regional languages.' },
      { heading: 'Soil & Crop Management', content: 'Soil Health Card app: View your soil test results. Crop Insurance app: PMFBY enrollment and claims. Fertilizer app: Dosage calculator. IFFCO Kisan: Comprehensive farming app.' },
      { heading: 'Expert Consultation', content: 'Kisan Call Center: 1800-180-1551 (free, 24/7). KVK (Krishi Vigyan Kendra): Free local expert advice. AgriBazaar: Connect with agronomists. Plantix: AI-based crop disease diagnosis from photo.' },
      { heading: 'Financial Services', content: 'BHIM/UPI: Digital payments for farm transactions. PM-KISAN app: Check payment status. KCC app: Kisan Credit Card management. DigiLocker: Store land records and certificates digitally.' },
      { heading: 'Getting Started', content: 'Start with Kisan Suvidha (all-in-one). Use Plantix for disease diagnosis. Check Agmarknet before selling. Join WhatsApp farmer groups for local tips. Most apps work on basic Android phones.' },
    ]
  },
};

export default function ResourceDetail() {
  const { slug } = useParams();
  const guide = guides[slug];

  if (!guide) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#1f4f2b' }}>
        <h2>Guide not found</h2>
        <Link to="/resources" style={{ color: '#1f4f2b', fontWeight: 600 }}>← Back to Resources</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: '2rem auto', padding: '0 2rem' }}>
      <Link to="/resources" style={{ color: '#1f4f2b', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>← Back to Resources</Link>

      {/* Header */}
      <div style={{ background: guide.color, borderRadius: 20, padding: '2.5rem', textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{guide.icon}</div>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>{guide.title}</h1>
        <p style={{ opacity: 0.85, marginTop: '0.5rem' }}>📖 {guide.meta}</p>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {guide.sections.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 16, padding: '1.8rem', boxShadow: '0 4px 16px rgba(0,32,0,0.08)', borderLeft: `5px solid ${guide.color}` }}>
            <h3 style={{ color: '#1f4f2b', marginBottom: '0.8rem', fontSize: '1.1rem' }}>{s.heading}</h3>
            <p style={{ color: '#364a36', lineHeight: 1.8, margin: 0 }}>{s.content}</p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ background: '#e4f2da', borderRadius: 16, padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#1f4f2b', fontWeight: 600, marginBottom: '1rem' }}>Have more questions? Ask our AI Expert!</p>
        <Link to="/ai-expert" style={{ background: '#1f4f2b', color: 'white', padding: '0.8rem 2rem', borderRadius: 40, textDecoration: 'none', fontWeight: 600 }}>
          🤖 Ask AI Expert
        </Link>
      </div>
    </div>
  );
}
