import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import InventoryIcon from '@mui/icons-material/Inventory';
import CodeIcon from '@mui/icons-material/Code';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { getProductById } from '../../services/product.service';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        
        if (response.success) {
          setProduct(response.data);
        } else {
          setError('Failed to load product details');
        }
      } catch (err) {
        setError('Error fetching product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ p: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack} 
          variant="outlined"
          sx={{ mb: 2, borderRadius: '20px' }}
        >
          Back to Products
        </Button>
        
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2,
            borderRadius: '8px'
          }}
          action={
            <Button color="inherit" size="small" onClick={handleBack}>
              GO BACK
            </Button>
          }
        >
          {error || 'Product not found'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/products"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ShoppingBasketIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Products
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <InventoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Product Details
          </Typography>
        </Breadcrumbs>
      </Box>
      
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBack}
        variant="contained"
        color="primary"
        sx={{ 
          mb: 3,
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
        }}
      >
        Back to Products
      </Button>
      
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 3 },
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}
        elevation={4}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main
              }}
            >
              {product.product_name}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3}
              sx={{ 
                borderRadius: '10px',
                height: '100%',
                background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
              }}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold'
                  }}
                >
                  <InventoryIcon sx={{ mr: 1 }} />
                  Product Information
                </Typography>
                
                <Box sx={{ mb: 3, mt: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 0.5 
                    }}
                  >
                    <CodeIcon fontSize="small" sx={{ mr: 1 }} />
                    Product ID
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      pl: 3,
                      py: 1,
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: '500'
                    }}
                  >
                    {product.product_id}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 0.5 
                    }}
                  >
                    <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
                    Category
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Chip 
                      label={product.category} 
                      color="primary" 
                      sx={{ 
                        borderRadius: '16px',
                        fontWeight: '500',
                        boxShadow: '0 2px 5px rgba(25, 118, 210, 0.2)'
                      }} 
                    />
                  </Box>
                </Box>
                
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 0.5 
                    }}
                  >
                    <ClassIcon fontSize="small" sx={{ mr: 1 }} />
                    Sub-Category
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      pl: 3,
                      py: 1,
                      backgroundColor: 'rgba(0, 0, 0, 0.03)',
                      borderRadius: '4px'
                    }}
                  >
                    {product.sub_category}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              elevation={3}
              sx={{ 
                borderRadius: '10px',
                height: '100%',
                background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
              }}
            >
              <CardContent>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold'
                  }}
                >
                  <ShoppingBasketIcon sx={{ mr: 1 }} />
                  Product Overview
                </Typography>
                
                <Box sx={{ my: 2 }}>
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{ lineHeight: 1.7 }}
                  >
                    This product belongs to the <strong>{product.category}</strong> category 
                    and <strong>{product.sub_category}</strong> sub-category.
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body2" color="text.secondary">
                    Product specifications and additional details can be found in the
                    product catalog. For more information, please contact the sales department.
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 3
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleBack}
                    sx={{ 
                      borderRadius: '20px',
                      mr: 1
                    }}
                  >
                    Go Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ 
                      borderRadius: '20px',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                    }}
                  >
                    Related Products
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetail;
