import React from 'react';
import { Box } from '@mui/material';
import GeographyDisplay from '../components/geography/GeographyDisplay';

const GeographyPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <GeographyDisplay />
    </Box>
  );
};

export default GeographyPage;
