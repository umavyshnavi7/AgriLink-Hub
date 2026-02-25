// Authentication check for protected pages
(function() {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const userRole = sessionStorage.getItem('userRole');
  
  // Get current page
  const currentPage = window.location.pathname.split('/').pop();
  
  // List of protected pages
  const protectedPages = [
    'resources.html',
    'marketplace.html',
    'market-prices.html',
    'experts.html',
    'initiatives.html',
    'crop-management.html',
    'farmer-dashboard.html',
    'farmer-features.html',
    'expert-dashboard.html',
    'admin-dashboard.html',
    'admin-portal.html',
    'tool-booking.html',
    'public-dashboard.html'
  ];
  
  // Check if current page is protected
  if (protectedPages.includes(currentPage)) {
    if (!isLoggedIn) {
      alert('⚠️ Please sign up or login to access this page.');
      window.location.href = 'signup.html';
    }
  }
})();
