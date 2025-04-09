import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PublicIcon from '@mui/icons-material/Public';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    handleCloseProfileMenu();
    logout();
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Products', path: '/products', icon: <ShoppingBasketIcon /> },
    { name: 'Geography', path: '/geography', icon: <PublicIcon /> },
    ...(isAdmin ? [{ name: 'Admin', path: '/admin', icon: <AdminPanelSettingsIcon /> }] : []),
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: '70%',
          maxWidth: '300px',
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={handleMobileMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      {user && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'primary.light' }}>
          <PersonIcon sx={{ color: 'white', mr: 1 }} />
          <Typography variant="subtitle1" sx={{ color: 'white' }}>
            {user.username}
          </Typography>
          <Chip 
            size="small" 
            label={user.role}
            color={isAdmin ? 'secondary' : 'default'}
            sx={{ ml: 1 }}
          />
        </Box>
      )}
      
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.name}
            component={RouterLink} 
            to={item.path}
            onClick={handleMobileMenuToggle}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        
        {user && (
          <ListItem 
            onClick={() => {
              handleMobileMenuToggle();
              logout();
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(220, 0, 78, 0.1)',
              },
              cursor: 'pointer'
            }}
          >
            <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="fixed"
        elevation={3}
        sx={{
          background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: '56px', sm: '64px' } }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/dashboard"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              <DashboardIcon sx={{ mr: 1 }} />
              Dashboard App
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    my: 2, 
                    mx: 0.5,
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  startIcon={item.icon}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* User Section */}
            {user && (
              <Box 
                sx={{ 
                  display: { xs: 'none', md: 'flex' }, 
                  alignItems: 'center',
                  mr: 1
                }}
              >
                <Chip
                  label={`${user.username} (${user.role})`}
                  color={isAdmin ? 'secondary' : 'primary'}
                  variant="outlined"
                  onClick={handleOpenProfileMenu}
                  sx={{ 
                    mr: 2, 
                    color: 'white',
                    borderColor: 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  icon={<PersonIcon style={{ color: 'white' }} />}
                />
                <Button 
                  color="inherit" 
                  onClick={logout}
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white'
                    }
                  }}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
                
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleCloseProfileMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="textSecondary">
                      Signed in as <strong>{user.username}</strong>
                    </Typography>
                  </MenuItem>
                  <Divider />
                  {isAdmin && (
                    <MenuItem 
                      component={RouterLink} 
                      to="/admin"
                      onClick={handleCloseProfileMenu}
                    >
                      Admin Panel
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}

            {/* Mobile Menu Button */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="open menu"
              onClick={handleMobileMenuToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Mobile Menu */}
      {renderMobileMenu()}
    </>
  );
};

export default Header;
