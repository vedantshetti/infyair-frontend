import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!data || !data.labels || !data.datasets) {
    return (
      <Paper 
        sx={{ 
          p: 3, 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No data available for pie chart
        </Typography>
      </Paper>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: true
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000
    }
  };

  // Add hover effects to the dataset
  const enhancedData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverBorderWidth: 4,
      hoverBorderColor: '#ffffff',
      hoverOffset: 10
    }))
  };

  return (
    <Box 
      sx={{ 
        height: isMobile ? 300 : 400, 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {title && !options.plugins.title.display && (
        <Typography 
          variant="h6" 
          gutterBottom 
          component="div" 
          align="center"
          sx={{ 
            fontWeight: 'medium',
            mb: 2,
            color: theme.palette.primary.main
          }}
        >
          {title}
        </Typography>
      )}
      
      <Box 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexGrow: 1
        }}
      >
        <Pie data={enhancedData} options={options} />
      </Box>
    </Box>
  );
};

export default PieChart;
