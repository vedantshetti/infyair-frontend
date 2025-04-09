import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
  if (!data || !data.labels || !data.datasets) {
    return (
      <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No data available for pie chart
        </Typography>
      </Paper>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      {title && (
        <Typography variant="h6" gutterBottom component="div" align="center">
          {title}
        </Typography>
      )}
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Pie data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default PieChart;
