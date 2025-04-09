import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ data, title }) => {
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
          No data available for line chart
        </Typography>
      </Paper>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
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
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        usePointStyle: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: theme.palette.divider
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 6
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    animation: {
      duration: 1000
    },
    hover: {
      mode: 'index',
      intersect: false
    }
  };

  // Enhance the dataset with gradient fill
  const enhancedData = {
    ...data,
    datasets: data.datasets.map(dataset => {
      const gradient = {
        ...dataset,
        borderWidth: 2,
        pointBackgroundColor: dataset.borderColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 3,
        fill: true,
        tension: 0.4
      };
      return gradient;
    })
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
        <Line 
          data={enhancedData} 
          options={options} 
          plugins={[{
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart) => {
              const ctx = chart.canvas.getContext('2d');
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            }
          }]}
        />
      </Box>
    </Box>
  );
};

export default LineChart;
