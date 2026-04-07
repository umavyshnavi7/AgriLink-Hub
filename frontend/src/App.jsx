import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AiExpert from './pages/AiExpert';
import FarmerDashboard from './pages/FarmerDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toast />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/ai-expert" element={
            <ProtectedRoute><AiExpert /></ProtectedRoute>
          } />
          <Route path="/farmer" element={
            <ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '4rem', color: '#1f4f2b' }}>
              <h2>404 - Page Not Found</h2>
              <a href="/" style={{ color: '#1f4f2b' }}>Go Home</a>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
