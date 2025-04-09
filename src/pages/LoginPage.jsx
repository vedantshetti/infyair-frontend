import React from 'react';
import { Container, Box } from '@mui/material';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <Login />
      </Box>
    </Container>
  );
};

export default LoginPage;
