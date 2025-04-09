import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import GeographyDisplay from '../components/geography/GeographyDisplay';

const GeographyPage = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100%',
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
            <PublicIcon 
              sx={{ 
                fontSize: 40, 
                color: 'primary.main',
                mr: 2
              }} 
            />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Geographic Data
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interactive visualizations of regional, state, and city data
              </Typography>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="xl">
        <GeographyDisplay />
      </Container>
    </Box>
  );
};

export default GeographyPage;
