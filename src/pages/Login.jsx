import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container glass auth-form">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(255,102,0,0.1)', borderRadius: '50%', color: 'var(--primary)' }}>
          <LogIn size={32} />
        </div>
      </div>
      <h2>Welcome Back</h2>
      
      {error && <div className="error-banner">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><Mail size={14} style={{ marginRight: '5px' }} /> Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label><Lock size={14} style={{ marginRight: '5px' }} /> Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Create one</Link>
      </p>
    </div>
  );
};

export default Login;
