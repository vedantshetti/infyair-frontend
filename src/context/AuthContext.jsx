// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Make sure to use the correct import
import { login as loginService, logout as logoutService, validateToken } from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status on initial load and refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verify token validity
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            // Token expired
            handleTokenExpiration();
          } else {
            // Token still valid, restore user
            const userStr = localStorage.getItem('user');
            if (userStr) {
              setUser(JSON.parse(userStr));
              
              // Optional: validate with server to ensure token is still accepted
              const isValid = await validateToken();
              if (!isValid) {
                handleTokenExpiration();
              }
            }
            
            // Set up token expiration timer
            setupExpirationTimer(decodedToken.exp);
          }
        } catch (error) {
          console.error('Token validation error:', error);
          handleTokenExpiration();
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);
  
  // Handle token expiration
  const handleTokenExpiration = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  
  // Set up token expiration timer
  const setupExpirationTimer = (expirationTime) => {
    const currentTime = Date.now() / 1000;
    const timeUntilExpiration = (expirationTime - currentTime) * 1000; // Convert to milliseconds
    
    if (timeUntilExpiration > 0) {
      // Set a timer to log out when token expires
      const timer = setTimeout(() => {
        logout();
        alert('Your session has expired. Please log in again.');
      }, timeUntilExpiration);
      
      // Clear the timer when component unmounts
      return () => clearTimeout(timer);
    }
  };

  const login = async (username, password) => {
    try {
      setLoading(true);
      const result = await loginService(username, password);
      
      if (result.success) {
        setUser(result.data.user);
        
        // Set up expiration timer for the new token
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setupExpirationTimer(decodedToken.exp);
        }
        
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.error || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
