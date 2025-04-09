import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import PieChart from '../charts/PieChart';
import DonutChart from '../charts/DonutChart';
import LineChart from '../charts/LineChart';
import { getAllProducts } from '../../services/product.service';
import { getGeographicData } from '../../services/geography.service';
import { formatPieData, formatLineData, groupDataByField } from '../../utils/chartUtils';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productResponse = await getAllProducts();
        if (productResponse.success) {
          setProductData(productResponse.data);
        }
        
        // Fetch geographic data
        const geoResponse = await getGeographicData();
        if (geoResponse.success) {
          setGeoData(geoResponse.data);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error loading dashboard data');
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Prepare chart data
  const categoryChartData = productData ? formatPieData(
    Object.entries(groupDataByField(productData, 'category'))
      .map(([category, products]) => ({
        category,
        count: products.length,
      })),
    'category',
    'count'
  ) : null;
  
  const regionChartData = geoData ? formatPieData(
    Object.entries(groupDataByField(geoData, 'region'))
      .map(([region, locations]) => ({
        region,
        count: locations.length,
      })),
    'region',
    'count'
  ) : null;
  
  const stateDistributionData = geoData ? formatLineData(
    Object.entries(groupDataByField(geoData, 'state'))
      .map(([state, locations]) => ({
        state,
        count: locations.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    'state',
    'count'
  ) : null;

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
        Admin Dashboard
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Welcome to the admin dashboard. You have full access to all data and visualizations.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <PieChart data={categoryChartData} title="Product Categories" />
        </Grid>
        <Grid item xs={12} md={6}>
          <DonutChart data={regionChartData} title="Geographic Regions" />
        </Grid>
        <Grid item xs={12}>
          <LineChart data={stateDistributionData} title="Top 10 States by Data Count" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
