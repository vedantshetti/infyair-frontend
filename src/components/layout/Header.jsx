import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Chip 
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    // <AppBar position="static">
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/dashboard"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            Dashboard App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={RouterLink}
              to="/dashboard"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/products"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Products
            </Button>
            <Button
              component={RouterLink}
              to="/geography"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Geography
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && (
              <>
                <Chip
                  label={`${user.username} (${user.role})`}
                  color={isAdmin ? 'secondary' : 'primary'}
                  variant="outlined"
                  sx={{ 
                    mr: 2, 
                    color: 'white',
                    borderColor: 'white'
                  }}
                />
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
