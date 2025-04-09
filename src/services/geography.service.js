import api from './api';

export const getGeographicData = async () => {
  try {
    const response = await api.get('/geography');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};

export const getPostalCodes = async () => {
  try {
    const response = await api.get('/geography/postal-codes');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};

export const getRegions = async () => {
  try {
    const response = await api.get('/geography/regions');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};

export const getStates = async () => {
  try {
    const response = await api.get('/geography/states');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};

export const getCities = async () => {
  try {
    const response = await api.get('/geography/cities');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};
