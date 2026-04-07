// AgriLink Hub - Reusable API Service with JWT Auth

const API_BASE = 'http://localhost:8080/api';

// ─── Toast Notification ───────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  let toast = document.getElementById('agri-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'agri-toast';
    toast.style.cssText = `
      position: fixed; top: 1.5rem; right: 1.5rem; z-index: 9999;
      padding: 1rem 1.5rem; border-radius: 12px; font-family: 'Inter', sans-serif;
      font-size: 0.95rem; font-weight: 500; max-width: 320px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15); transition: all 0.3s ease;
      display: flex; align-items: center; gap: 0.6rem;
    `;
    document.body.appendChild(toast);
  }
  const styles = {
    success: { bg: '#1f4f2b', color: '#fff', icon: '✅' },
    error:   { bg: '#c0392b', color: '#fff', icon: '❌' },
    warning: { bg: '#e9b741', color: '#1f4f2b', icon: '⚠️' },
    info:    { bg: '#2980b9', color: '#fff', icon: 'ℹ️' }
  };
  const s = styles[type] || styles.info;
  toast.style.background = s.bg;
  toast.style.color = s.color;
  toast.innerHTML = `<span>${s.icon}</span><span>${message}</span>`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
  }, 3500);
}

// ─── Loading Button State ─────────────────────────────────────────────────────
function setLoading(btn, loading) {
  if (loading) {
    btn.disabled = true;
    btn._originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait...';
    btn.style.opacity = '0.75';
  } else {
    btn.disabled = false;
    btn.innerHTML = btn._originalText || btn.innerHTML;
    btn.style.opacity = '1';
  }
}

// ─── JWT Token Helpers ────────────────────────────────────────────────────────
const TokenService = {
  set(token) {
    sessionStorage.setItem('authToken', token);
    // Decode payload to store expiry
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      sessionStorage.setItem('tokenExp', payload.exp);
    } catch {}
  },

  get() {
    return sessionStorage.getItem('authToken');
  },

  isExpired() {
    const exp = sessionStorage.getItem('tokenExp');
    if (!exp) return true;
    return Date.now() / 1000 > parseInt(exp);
  },

  clear() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExp');
  }
};

// ─── Input Validation ─────────────────────────────────────────────────────────
const Validate = {
  email(email) {
    return /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email);
  },
  password(password) {
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
  },
  required(fields) {
    for (const [name, value] of Object.entries(fields)) {
      if (!value || !value.trim()) throw new Error(`${name} is required`);
    }
  }
};

// ─── Core API Request ─────────────────────────────────────────────────────────
async function apiRequest(endpoint, method = 'GET', body = null, requiresAuth = false) {
  const headers = { 'Content-Type': 'application/json' };

  if (requiresAuth) {
    if (TokenService.isExpired()) {
      AuthService.logout();
      throw new Error('Session expired. Please login again.');
    }
    headers['Authorization'] = `Bearer ${TokenService.get()}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${endpoint}`, options);

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Invalid server response');
  }

  if (!res.ok) {
    if (res.status === 401) {
      AuthService.logout();
      throw new Error('Session expired. Please login again.');
    }
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}

// ─── Auth API Services ────────────────────────────────────────────────────────
const AuthService = {

  async login(email, password) {
    // Frontend validation first
    Validate.required({ Email: email, Password: password });
    if (!Validate.email(email)) throw new Error('Invalid email format');
    Validate.password(password);

    try {
      return await apiRequest('/auth/login', 'POST', { email, password });
    } catch (err) {
      // Fallback to localStorage if backend not running
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error('Invalid email or password');
      return { success: true, name: user.name, role: user.role, email: user.email, token: null };
    }
  },

  async signup(name, email, password, role) {
    // Frontend validation first
    Validate.required({ Name: name, Email: email, Password: password, Role: role });
    if (!Validate.email(email)) throw new Error('Invalid email format');
    Validate.password(password);

    try {
      return await apiRequest('/auth/signup', 'POST', { name, email, password, role });
    } catch (err) {
      // Fallback to localStorage if backend not running
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) throw new Error('Email already registered');
      users.push({ name, email, password, role });
      localStorage.setItem('users', JSON.stringify(users));
      return { success: true, message: 'Account created successfully' };
    }
  },

  setSession(data) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', data.role);
    sessionStorage.setItem('userName', data.name);
    sessionStorage.setItem('userEmail', data.email);
    if (data.token) TokenService.set(data.token);
  },

  logout() {
    sessionStorage.clear();
    TokenService.clear();
    window.location.href = 'far.html';
  },

  isLoggedIn() {
    const loggedIn = !!sessionStorage.getItem('isLoggedIn');
    const token = TokenService.get();
    // If token exists, check expiry
    if (loggedIn && token && TokenService.isExpired()) {
      this.logout();
      return false;
    }
    return loggedIn;
  },

  getRole()  { return sessionStorage.getItem('userRole'); },
  getName()  { return sessionStorage.getItem('userName'); },
  getEmail() { return sessionStorage.getItem('userEmail'); },

  getDashboard(role) {
    const dashboards = {
      farmer: 'farmer-features.html',
      expert: 'expert-dashboard.html',
      admin:  'admin-portal.html',
      public: 'public-dashboard.html'
    };
    return dashboards[role] || 'far.html';
  }
};
