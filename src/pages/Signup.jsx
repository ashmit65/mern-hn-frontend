import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    const res = await register(formData.name, formData.email, formData.password);
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
          <UserPlus size={32} />
        </div>
      </div>
      <h2>Create Account</h2>
      
      {error && <div className="error-banner">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><User size={14} style={{ marginRight: '5px' }} /> Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

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
          <label><Lock size={14} style={{ marginRight: '5px' }} /> Password (min 6 chars)</label>
          <input 
            type="password" 
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        
        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
