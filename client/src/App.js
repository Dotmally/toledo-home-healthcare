import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import DashboardPage from './pages/DashboardPage';
import JobDetailsPage from './pages/JobDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  const isAdmin = localStorage.getItem('admin-auth') === 'true';
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/job/:id" element={<JobDetailsPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/dashboard"
          element={isAdmin ? <DashboardPage /> : <Navigate to="/admin" />}
        />
        {/* We'll add more pages here later */}
      </Routes>
    </Router>
  );
}

export default App;

