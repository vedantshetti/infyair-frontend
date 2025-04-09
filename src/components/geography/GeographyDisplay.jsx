import React, { useState, useEffect } from "react";
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
  Tab,
  Card,
  CardContent,
  Alert,
  IconButton,
  Fab,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import PieChart from "../charts/PieChart";
import DonutChart from "../charts/DonutChart";
import LineChart from "../charts/LineChart";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import DownloadIcon from "@mui/icons-material/Download";
import { getGeographicData } from "../../services/geography.service";
import {
  formatPieData,
  formatLineData,
  groupDataByField,
} from "../../utils/chartUtils";

const GeographyDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [geoData, setGeoData] = useState([]);
  const [selectedView, setSelectedView] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [regions, setRegions] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getGeographicData();

      if (response.success) {
        setGeoData(response.data);

        // Extract unique regions
        const uniqueRegions = [
          ...new Set(response.data.map((item) => item.region)),
        ].filter(Boolean);
        setRegions(uniqueRegions);
      } else {
        setError("Failed to load geographic data");
      }
    } catch (err) {
      setError("Error fetching geographic data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (event, newValue) => {
    setSelectedView(newValue);
    if (newValue === 0) {
      setSelectedRegion("All");
    }
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleRefresh = () => {
    fetchData();
  };

  // Filter data by selected region
  const filteredData =
    selectedRegion === "All"
      ? geoData
      : geoData.filter((item) => item.region === selectedRegion);

  // Prepare chart data
  const regionData = formatPieData(
    Object.entries(groupDataByField(geoData, "region")).map(
      ([region, locations]) => ({
        region,
        count: locations.length,
      })
    ),
    "region",
    "count"
  );

  const stateData = formatDonutData(
    Object.entries(groupDataByField(filteredData, "state"))
      .map(([state, locations]) => ({
        state,
        count: locations.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    "state",
    "count"
  );

  const cityData = formatLineData(
    Object.entries(groupDataByField(filteredData, "city"))
      .map(([city, locations]) => ({
        city,
        count: locations.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15),
    "city",
    "count"
  );

  // Helper function for donut chart data
  function formatDonutData(data, labelField, valueField) {
    return {
      labels: data.map((item) => item[labelField]),
      datasets: [
        {
          data: data.map((item) => item[valueField]),
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 200px)",
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
        <Typography variant="h6" color="textSecondary">
          Loading Geographic Data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: "10px",
            mb: 2,
          }}
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              RETRY
            </Button>
          }
        >
          {error}
        </Alert>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <PublicIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2, opacity: 0.5 }}
          />
          <Typography variant="h6" gutterBottom>
            Couldn't Load Geographic Data
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            We encountered a problem while loading the geographic data. Please
            try again later.
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Retry Loading Data
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          mb: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Tabs
          value={selectedView}
          onChange={handleViewChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "fullWidth" : "standard"}
          centered={!isMobile}
          sx={{
            bgcolor: "background.paper",
            "& .MuiTab-root": {
              minHeight: "64px",
              fontWeight: "medium",
            },
          }}
        >
          <Tab
            label={isMobile ? "Regions" : "Regional Distribution"}
            icon={<PublicIcon />}
            iconPosition="start"
          />
          <Tab
            label={isMobile ? "States" : "State Analysis"}
            icon={<MapIcon />}
            iconPosition="start"
          />
          <Tab
            label={isMobile ? "Cities" : "City Breakdown"}
            icon={<LocationCityIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            {selectedView === 0 && <PublicIcon sx={{ mr: 1 }} />}
            {selectedView === 1 && <MapIcon sx={{ mr: 1 }} />}
            {selectedView === 2 && <LocationCityIcon sx={{ mr: 1 }} />}

            {selectedView === 0 && "Regional Distribution"}
            {selectedView === 1 && "State Analysis"}
            {selectedView === 2 && "City Breakdown"}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {selectedView === 0 && "Geographical distribution across regions"}
            {selectedView === 1 &&
              (selectedRegion === "All"
                ? "Analysis of data distribution across states"
                : `State analysis for the ${selectedRegion} region`)}
            {selectedView === 2 &&
              (selectedRegion === "All"
                ? "Breakdown of data distribution across cities"
                : `City breakdown for the ${selectedRegion} region`)}
          </Typography>
        </Box>

        {selectedView !== 0 && (
          <Box sx={{ minWidth: { xs: "100%", sm: "250px" } }}>
            <FormControl
              fullWidth
              variant="outlined"
              size={isMobile ? "small" : "medium"}
            >
              <InputLabel id="region-select-label">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FilterAltIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Filter by Region
                </Box>
              </InputLabel>
              <Select
                labelId="region-select-label"
                value={selectedRegion}
                onChange={handleRegionChange}
                label="Filter by Region"
                sx={{
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.light,
                  },
                }}
              >
                <MenuItem value="All">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PublicIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    All Regions
                  </Box>
                </MenuItem>
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    <Chip
                      label={region}
                      size="small"
                      sx={{
                        mr: 1,
                        backgroundColor: theme.palette.primary.light,
                        color: "white",
                      }}
                    />
                    {region} Region
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>

      {selectedView !== 0 && selectedRegion !== "All" && (
        <Box sx={{ mb: 3 }}>
          <Alert
            severity="info"
            variant="outlined"
            icon={<InfoIcon />}
            sx={{ borderRadius: "8px" }}
          >
            Showing data filtered for the <strong>{selectedRegion}</strong>{" "}
            region.
          </Alert>
        </Box>
      )}

      <Grid container spacing={3}>
        {selectedView === 0 && (
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                height: "100%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
                  <Typography variant="h6">Regional Distribution</Typography>
                </Box>
                <Divider />
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <PieChart
                    data={regionData}
                    title="Geographic Distribution by Region"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {selectedView === 1 && (
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                height: "100%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
                  <Typography variant="h6">
                    {selectedRegion === "All"
                      ? "Top 10 States by Data Count"
                      : `Top 10 States in ${selectedRegion}`}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <DonutChart
                    data={stateData}
                    title={
                      selectedRegion === "All"
                        ? "Top 10 States by Data Volume"
                        : `Top 10 States in ${selectedRegion} Region`
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {selectedView === 2 && (
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                height: "100%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
                  <Typography variant="h6">
                    {selectedRegion === "All"
                      ? "Top 15 Cities by Data Count"
                      : `Top 15 Cities in ${selectedRegion}`}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <LineChart
                    data={cityData}
                    title={
                      selectedRegion === "All"
                        ? "Top 15 Cities by Data Volume"
                        : `Top 15 Cities in ${selectedRegion} Region`
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Tooltip title="Refresh Data">
          <Fab
            color="primary"
            size="small"
            onClick={handleRefresh}
            sx={{
              boxShadow: "0 4px 8px rgba(25, 118, 210, 0.4)",
              mr: 1,
            }}
          >
            <RefreshIcon />
          </Fab>
        </Tooltip>

        <Tooltip title="Download Chart Data">
          <Fab
            color="secondary"
            size="small"
            sx={{
              boxShadow: "0 4px 8px rgba(220, 0, 78, 0.4)",
            }}
          >
            <DownloadIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default GeographyDisplay;
