import React from 'react';
import { Box } from '@mui/material';
import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ProductList />
    </Box>
  );
};

export default ProductsPage;
