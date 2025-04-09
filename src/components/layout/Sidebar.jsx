import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PublicIcon from '@mui/icons-material/Public';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const Sidebar = () => {
  const { isAdmin } = useAuth();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          Navigation
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem 
        //   button 
          component={NavLink} 
          to="/dashboard"
          sx={{
            '&.active': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
            }
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        <ListItem 
        //   button 
          component={NavLink} 
          to="/products"
          sx={{
            '&.active': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
            }
          }}
        >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        
        <ListItem 
        //   button 
          component={NavLink} 
          to="/geography"
          sx={{
            '&.active': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
            }
          }}
        >
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Geography" />
        </ListItem>
        
        {isAdmin && (
          <ListItem 
            // button 
            component={NavLink} 
            to="/admin"
            sx={{
              '&.active': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </ListItem>
        )}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {isAdmin ? 'Admin Access' : 'Viewer Access'}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
