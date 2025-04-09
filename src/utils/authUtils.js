// import jwtDecode from 'jwt-decode';
import * as jwtDecode from 'jwt-decode';


export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
  }
};

export const getUserRole = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return user.role;
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
};

export const hasAdminAccess = () => {
  return getUserRole() === 'admin';
};

export const getSessionTimeRemaining = () => {
  const token = localStorage.getItem('token');
  if (!token) return 0;
  
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Return remaining time in seconds
    return Math.max(0, decodedToken.exp - currentTime);
  } catch (error) {
    return 0;
  }
};
