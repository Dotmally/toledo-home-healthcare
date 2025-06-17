import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CareersPage from './pages/CareersPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* We'll add more pages here later */}
      </Routes>
    </Router>
  );
}

export default App;

