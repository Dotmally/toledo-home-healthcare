import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import DashboardPage from './pages/DashboardPage';
import JobDetailsPage from './pages/JobDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin-auth') === 'true');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/job/:id" element={<JobDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminLoginPage setIsAdmin={setIsAdmin} />} />
        <Route
          path="/dashboard"
          element={isAdmin ? <DashboardPage /> : <Navigate to="/admin" state={{ from: '/dashboard' }} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

