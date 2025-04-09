import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, title }) => {
  if (!data || !data.labels || !data.datasets) {
    return (
      <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No data available for donut chart
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
    cutout: '70%', // This makes it a donut chart
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      {title && (
        <Typography variant="h6" gutterBottom component="div" align="center">
          {title}
        </Typography>
      )}
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Doughnut data={data} options={options} />
      </Box>
    </Paper>
  );
};

export default DonutChart;
