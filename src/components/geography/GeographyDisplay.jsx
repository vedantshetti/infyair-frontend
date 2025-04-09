import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import PieChart from '../charts/PieChart';
import DonutChart from '../charts/DonutChart';
import LineChart from '../charts/LineChart';
import { getGeographicData } from '../../services/geography.service';
import { formatPieData, formatLineData, groupDataByField } from '../../utils/chartUtils';

const GeographyDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [geoData, setGeoData] = useState([]);
  const [selectedView, setSelectedView] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getGeographicData();
        
        if (response.success) {
          setGeoData(response.data);
          
          // Extract unique regions
          const uniqueRegions = [...new Set(response.data.map(item => item.region))].filter(Boolean);
          setRegions(uniqueRegions);
        } else {
          setError('Failed to load geographic data');
        }
      } catch (err) {
        setError('Error fetching geographic data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleViewChange = (event, newValue) => {
    setSelectedView(newValue);
  };
  
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };
  
  // Filter data by selected region
  const filteredData = selectedRegion === 'All' 
    ? geoData 
    : geoData.filter(item => item.region === selectedRegion);
  
  // Prepare chart data
  const regionData = formatPieData(
    Object.entries(groupDataByField(geoData, 'region'))
      .map(([region, locations]) => ({
        region,
        count: locations.length,
      })),
    'region',
    'count'
  );
  
  const stateData = formatDonutData(
    Object.entries(groupDataByField(filteredData, 'state'))
      .map(([state, locations]) => ({
        state,
        count: locations.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    'state',
    'count'
  );
  
  const cityData = formatLineData(
    Object.entries(groupDataByField(filteredData, 'city'))
      .map(([city, locations]) => ({
        city,
        count: locations.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15),
    'city',
    'count'
  );

  // Helper function for donut chart data
  function formatDonutData(data, labelField, valueField) {
    return {
      labels: data.map(item => item[labelField]),
      datasets: [
        {
          data: data.map(item => item[valueField]),
          backgroundColor: generateColors(data.length),
          borderWidth: 1,
        },
      ],
    };
  }
  
  // Generate random colors
  function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colors;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Geographic Data
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedView}
          onChange={handleViewChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Regions" />
          <Tab label="States" />
          <Tab label="Cities" />
        </Tabs>
      </Paper>
      
      {selectedView !== 0 && (
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Region</InputLabel>
            <Select
              value={selectedRegion}
              onChange={handleRegionChange}
              label="Filter by Region"
            >
              <MenuItem value="All">All Regions</MenuItem>
              {regions.map(region => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      
      <Grid container spacing={3}>
        {selectedView === 0 && (
          <Grid item xs={12}>
            <PieChart data={regionData} title="Distribution by Region" />
          </Grid>
        )}
        
        {selectedView === 1 && (
          <Grid item xs={12}>
            <DonutChart 
              data={stateData} 
              title={selectedRegion === 'All' 
                ? "Top 10 States" 
                : `Top 10 States in ${selectedRegion}`
              } 
            />
          </Grid>
        )}
        
        {selectedView === 2 && (
          <Grid item xs={12}>
            <LineChart 
              data={cityData} 
              title={selectedRegion === 'All' 
                ? "Top 15 Cities by Data Count" 
                : `Top 15 Cities in ${selectedRegion}`
              } 
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default GeographyDisplay;
