import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AiExpert from './pages/AiExpert';
import AskExpert from './pages/AskExpert';
import FarmerDashboard from './pages/FarmerDashboard';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Marketplace from './pages/Marketplace';
import Initiatives from './pages/Initiatives';
import AdminPortal from './pages/AdminPortal';
import ExpertDashboard from './pages/ExpertDashboard';
import PublicDashboard from './pages/PublicDashboard';
import ExpertContentDetail from './pages/ExpertContentDetail';

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
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminPortal /></ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminPortal /></ProtectedRoute>
          } />
          <Route path="/initiatives" element={
            <ProtectedRoute><Initiatives /></ProtectedRoute>
          } />
          <Route path="/marketplace" element={
            <ProtectedRoute><Marketplace /></ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute><Resources /></ProtectedRoute>
          } />
          <Route path="/resources/:slug" element={
            <ProtectedRoute><ResourceDetail /></ProtectedRoute>
          } />
          <Route path="/resources/expert/:id" element={
            <ProtectedRoute><ExpertContentDetail /></ProtectedRoute>
          } />
          <Route path="/ai-expert" element={
            <ProtectedRoute><AiExpert /></ProtectedRoute>
          } />
          <Route path="/ask-expert" element={
            <ProtectedRoute allowedRoles={['farmer']}><AskExpert /></ProtectedRoute>
          } />
          <Route path="/farmer" element={
            <ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute>
          } />
          <Route path="/expert" element={
            <ProtectedRoute allowedRoles={['expert']}><ExpertDashboard /></ProtectedRoute>
          } />
          <Route path="/public" element={
            <ProtectedRoute allowedRoles={['public']}><PublicDashboard /></ProtectedRoute>
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
