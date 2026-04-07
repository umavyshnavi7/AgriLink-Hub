import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── Token Helpers ────────────────────────────────────────────────────────────
export const TokenService = {
  set(token) {
    sessionStorage.setItem('authToken', token);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      sessionStorage.setItem('tokenExp', payload.exp);
    } catch {}
  },
  get: () => sessionStorage.getItem('authToken'),
  isExpired() {
    const exp = sessionStorage.getItem('tokenExp');
    return !exp || Date.now() / 1000 > parseInt(exp);
  },
  clear() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExp');
  }
};

// ─── Validation ───────────────────────────────────────────────────────────────
export const Validate = {
  email: (email) => /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(email),
  password: (password) => {
    if (!password || password.length < 6) throw new Error('Password must be at least 6 characters');
  },
  required: (fields) => {
    for (const [name, value] of Object.entries(fields)) {
      if (!value || !value.trim()) throw new Error(`${name} is required`);
    }
  }
};

// ─── Auth Service ─────────────────────────────────────────────────────────────
export const AuthService = {
  async login(email, password) {
    Validate.required({ Email: email, Password: password });
    if (!Validate.email(email)) throw new Error('Invalid email format');
    Validate.password(password);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      return data;
    } catch (err) {
      // Fallback to localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error(err.response?.data?.message || 'Invalid email or password');
      return { success: true, name: user.name, role: user.role, email: user.email, token: null };
    }
  },

  async signup(name, email, password, role) {
    Validate.required({ Name: name, Email: email, Password: password, Role: role });
    if (!Validate.email(email)) throw new Error('Invalid email format');
    Validate.password(password);
    try {
      const { data } = await api.post('/auth/signup', { name, email, password, role });
      return data;
    } catch (err) {
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
  },

  isLoggedIn() {
    const loggedIn = !!sessionStorage.getItem('isLoggedIn');
    const token = TokenService.get();
    if (loggedIn && token && TokenService.isExpired()) {
      this.logout();
      return false;
    }
    return loggedIn;
  },

  getRole:  () => sessionStorage.getItem('userRole'),
  getName:  () => sessionStorage.getItem('userName'),
  getEmail: () => sessionStorage.getItem('userEmail'),

  getDashboard(role) {
    const map = { farmer: '/farmer', expert: '/expert-dashboard', admin: '/admin', public: '/public-dashboard' };
    return map[role] || '/';
  }
};

export default api;
