import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import PieChart from '../charts/PieChart';
import DonutChart from '../charts/DonutChart';
import { getAllProducts } from '../../services/product.service';
import { getGeographicData } from '../../services/geography.service';
import { formatPieData, groupDataByField } from '../../utils/chartUtils';

const ViewerDashboard = () => {
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
        console.log('Product response received:', productResponse);
        
        if (productResponse.success) {
          setProductData(productResponse.data);
          console.log('Product data set:', productResponse.data);
        } else {
          console.error('Product response not successful:', productResponse);
        }
        
        // Fetch geographic data
        const geoResponse = await getGeographicData();
        console.log('Geography response received:', geoResponse);
        
        if (geoResponse.success) {
          setGeoData(geoResponse.data);
          console.log('Geography data set:', geoResponse.data);
        } else {
          console.error('Geography response not successful:', geoResponse);
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
  
  // Add this code right after your useEffect
  useEffect(() => {
    if (productData) {
      console.log('Grouped product data:', groupDataByField(productData, 'category'));
      
      const chartData = formatPieData(
        Object.entries(groupDataByField(productData, 'category'))
          .map(([category, products]) => ({
            category,
            count: products.length,
          })),
        'category',
        'count'
      );
      
      console.log('Category chart data:', chartData);
    }
    
    if (geoData) {
      console.log('Grouped geo data:', groupDataByField(geoData, 'region'));
      
      const chartData = formatPieData(
        Object.entries(groupDataByField(geoData, 'region'))
          .map(([region, locations]) => ({
            region,
            count: locations.length,
          })),
        'region',
        'count'
      );
      
      console.log('Region chart data:', chartData);
    }
  }, [productData, geoData]);
  
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
        Viewer Dashboard
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        Welcome to the viewer dashboard. You have access to basic data visualizations.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <PieChart data={categoryChartData} title="Product Categories" />
        </Grid>
        <Grid item xs={12} md={6}>
          <DonutChart data={regionChartData} title="Geographic Regions" />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="body2" color="text.secondary">
          Note: For additional visualizations and detailed reports, please contact an administrator.
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewerDashboard;
