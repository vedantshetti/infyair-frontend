import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Collapse,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PublicIcon from "@mui/icons-material/Public";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;
const collapsedDrawerWidth = 72;

const Sidebar = () => {
  const { isAdmin } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { name: "Products", path: "/products", icon: <ShoppingBasketIcon /> },
    { name: "Geography", path: "/geography", icon: <PublicIcon /> },
    ...(isAdmin
      ? [
          {
            name: "Admin Panel",
            path: "/admin",
            icon: <AdminPanelSettingsIcon />,
          },
        ]
      : []),
  ];

  // Determine if an item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawerContent = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          p: 2,
        }}
      >
        {open && (
          <Typography variant="h6" component="div" noWrap>
            Navigation
          </Typography>
        )}
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <Tooltip
            key={item.name}
            title={!open ? item.name : ""}
            placement="right"
            arrow
          >
            <ListItem
              component={NavLink}
              to={item.path}
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: open ? "initial" : "center",
                "&.active": {
                  backgroundColor: "primary.light",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                "&:hover": {
                  backgroundColor: isActive(item.path)
                    ? "primary.main"
                    : "rgba(25, 118, 210, 0.08)",
                },
                borderRadius: "4px",
                mx: 1,
                mb: 0.5,
              }}
              className={isActive(item.path) ? "active" : ""}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: isActive(item.path) ? "white" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Collapse in={open} orientation="horizontal">
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    noWrap: true,
                  }}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: open ? "block" : "none",
                  }}
                />
              </Collapse>
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      {open && (
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {isAdmin ? "Admin Access" : "Viewer Access"}
          </Typography>
        </Box>
      )}
    </>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={isMobile ? toggleDrawer : undefined}
      sx={{
        width: open ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedDrawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          zIndex: 1000, // Lower than AppBar's default z-index (1100)
          marginTop: "64px", // Match the header height
          height: "calc(100% - 64px)", // Adjust height to account for header
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        },
      }}
      anchor="left"
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
