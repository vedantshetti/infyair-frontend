// src/services/auth.service.js
import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const validateToken = async () => {
  try {
    const response = await api.get('/auth/validate');
    return response.data.success;
  } catch (error) {
    // Handle token validation failure
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
  }
};
