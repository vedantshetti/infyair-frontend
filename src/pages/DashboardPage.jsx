import React from 'react';
import { Box } from '@mui/material';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import ViewerDashboard from '../components/dashboard/ViewerDashboard';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { isAdmin } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {isAdmin ? <AdminDashboard /> : <ViewerDashboard />}
    </Box>
  );
};

export default DashboardPage;
