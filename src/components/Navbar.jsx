import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Layout, Bookmark, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar glass">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <Layout size={24} />
        <span>HN Scraper</span>
      </Link>

      <button 
        className="menu-toggle" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
          Top Stories
        </Link>
        
        {user ? (
          <>
            <Link to="/bookmarks" className={location.pathname === '/bookmarks' ? 'active' : ''} onClick={closeMenu}>
              <Bookmark size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Bookmarks
            </Link>
            <span className="user-greeting">
              Hi, {user.name}
            </span>
            <button onClick={handleLogout} className="btn-outline logout-btn">
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline login-btn" onClick={closeMenu}>
              <LogIn size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Login
            </Link>
            <Link to="/signup" className="btn-primary join-btn" onClick={closeMenu}>
              <UserPlus size={18} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Join
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
