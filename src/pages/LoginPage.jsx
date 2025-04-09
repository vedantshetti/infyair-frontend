import React from 'react';
import { Container, Box } from '@mui/material';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3 }
      }}
    >
      <Login />
    </Box>
  );
};

export default LoginPage;
