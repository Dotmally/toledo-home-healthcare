import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLoginPage.css';
import axios from 'axios';

function AdminLoginPage({ setIsAdmin }) {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/dashboard';

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/admin/login', { password });
    if (res.data.success) {
      localStorage.setItem('admin-auth', 'true');
      setIsAdmin(true);
      navigate(from);
    } else {
      alert('Incorrect password');
    }
  } catch (err) {
    console.error(err);
    alert('Login error.');
  }
};

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;