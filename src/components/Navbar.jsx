import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Layout, Bookmark, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <Link to="/" className="nav-logo">
        <Layout size={24} />
        <span>HN Scraper</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Top Stories
        </Link>
        
        {user ? (
          <>
            <Link to="/bookmarks" className={location.pathname === '/bookmarks' ? 'active' : ''}>
              <Bookmark size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Bookmarks
            </Link>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              Hi, {user.name}
            </span>
            <button onClick={handleLogout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogIn size={18} />
              Login
            </Link>
            <Link to="/signup" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white' }}>
              <UserPlus size={18} />
              Join
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
