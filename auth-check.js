// Authentication check for protected pages
(function() {
  const currentPage = window.location.pathname.split('/').pop();

  const protectedPages = [
    'resources.html', 'marketplace.html', 'market-prices.html',
    'experts.html', 'ai-expert.html', 'initiatives.html',
    'crop-management.html', 'farmer-dashboard.html', 'farmer-features.html',
    'expert-dashboard.html', 'admin-dashboard.html', 'admin-portal.html',
    'tool-booking.html', 'public-dashboard.html'
  ];

  if (!protectedPages.includes(currentPage)) return;

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = 'signup.html';
    return;
  }

  // Check JWT token expiry if token exists
  const token = sessionStorage.getItem('authToken');
  const tokenExp = sessionStorage.getItem('tokenExp');
  if (token && tokenExp && Date.now() / 1000 > parseInt(tokenExp)) {
    sessionStorage.clear();
    window.location.href = 'login.html?reason=expired';
  }
})();
