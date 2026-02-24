// AgriLink Hub - Main JavaScript

// Console welcome message
(function() {
  console.log("🌾 AgriLink Hub – concept interface. Click any interactive button to see role-based demos.");
})();

// Role card interactions
const cards = document.querySelectorAll('.role-card');
cards.forEach(card => {
  card.addEventListener('click', (e) => {
    if(e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
    const role = card.querySelector('h3')?.innerText;
    if(role) {
      console.log(`🔍 You clicked on ${role} role. In the real app, you would see a custom dashboard.`);
    }
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and feature items
document.querySelectorAll('.role-card, .feature-item, .card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
