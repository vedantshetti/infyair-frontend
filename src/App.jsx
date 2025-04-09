import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";

// Components
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import GeographyPage from "./pages/GeographyPage";
import ProductDetail from "./components/products/ProductDetail";

// Main layout for authenticated pages
const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box
  component="main"
  sx={{
    flexGrow: 1,
    padding: 3,
    paddingLeft: 0, // Remove left padding
    marginTop: "64px",
    // marginLeft: "2px", // This correctly aligns with sidebar width
    width: "calc(100% - 240px)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white !important",
    overflow: "auto",
    position: "relative",
    zIndex: 1,
  }}
>



        <Box sx={{ flex: 1 }}>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProductsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProductDetail />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/geography"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <GeographyPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
