import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import ProductList from '../components/products/ProductList';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const ProductsPage = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        backgroundColor: '#f7f9fc',
        pb: 4
      }}
    >
      <Paper 
        elevation={0}
        sx={{ 
          borderRadius: 0, 
          mb: 3, 
          py: 2,
          px: 3,
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}
      >
        <Container maxWidth="xl">
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ShoppingBasketIcon 
              sx={{ 
                fontSize: 36, 
                color: 'primary.main',
                mr: 2
              }} 
            />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse all products in our catalog
              </Typography>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="xl">
        <ProductList />
      </Container>
    </Box>
  );
};

export default ProductsPage;
