import api from './api';

export const getAllProducts = async () => {
  try {
    console.log('Fetching products...');
    const response = await api.get('/products');
    console.log('Products response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};


export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, error: 'Network error' };
  }
};
