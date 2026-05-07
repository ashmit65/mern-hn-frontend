import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Placeholder Pages (will be built in Phase 3)
const Home = () => <div className="page"><h1>Top Stories</h1></div>;
const Bookmarks = () => <div className="page"><h1>Your Bookmarks</h1></div>;
const Login = () => <div className="page"><h1>Login</h1></div>;
const Signup = () => <div className="page"><h1>Signup</h1></div>;

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/bookmarks" 
        element={
          <PrivateRoute>
            <Bookmarks />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {/* Navbar will go here */}
          <main>
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
