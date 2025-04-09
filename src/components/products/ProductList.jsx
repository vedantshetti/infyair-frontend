import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  CircularProgress,
  Button,
  Chip,
  InputAdornment,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getAllProducts } from "../../services/product.service";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();

        if (response.success) {
          setProducts(response.data);
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        setError("Error fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Filter and paginate products
  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sub_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 200px)",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderLeft: "5px solid #f44336",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            Error Loading Products
          </Typography>
          <Typography color="textSecondary">{error}</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Paper>
      </Box>
    );
  }

  // Mobile card view for product items
  const renderMobileView = () => (
    <Grid container spacing={2}>
      {paginatedProducts.length > 0 ? (
        paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} key={product.product_id}>
            <Card
              elevation={2}
              sx={{
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" noWrap sx={{ mb: 1 }}>
                  {product.product_name}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CategoryIcon color="primary" sx={{ mr: 1, fontSize: 20 }} />
                  <Chip
                    label={product.category}
                    color="primary"
                    size="small"
                    sx={{ borderRadius: "4px" }}
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <ShoppingBasketIcon
                    color="action"
                    sx={{ mr: 1, fontSize: 20 }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {product.sub_category}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      maxWidth: "60%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ID: {product.product_id}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/products/${product.product_id}`}
                    size="small"
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    sx={{
                      boxShadow: "none",
                      borderRadius: "20px",
                    }}
                  >
                    View
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography color="textSecondary">No products found</Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );

  // Desktop table view
  const renderTableView = () => (
    <Paper
      sx={{ width: "100%", overflow: "hidden", borderRadius: "10px" }}
      elevation={3}
    >
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "primary.light",
                  color: "white",
                }}
              >
                Product ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "primary.light",
                  color: "white",
                }}
              >
                Product Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "primary.light",
                  color: "white",
                }}
              >
                Category
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "primary.light",
                  color: "white",
                }}
              >
                Sub-Category
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "primary.light",
                  color: "white",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow
                  hover
                  key={product.product_id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.08) !important",
                    },
                  }}
                >
                  <TableCell sx={{ fontFamily: "monospace" }}>
                    {product.product_id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {product.product_name}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.category}
                      color="primary"
                      size="small"
                      sx={{ borderRadius: "4px" }}
                    />
                  </TableCell>
                  <TableCell>{product.sub_category}</TableCell>
                  <TableCell>
                    <Tooltip title="View Product Details">
                      <Button
                        component={Link}
                        to={`/products/${product.product_id}`}
                        size="small"
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                        sx={{
                          boxShadow: "none",
                          borderRadius: "20px",
                        }}
                      >
                        View Details
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box sx={{ py: 3 }}>
                    <Typography variant="body1" color="textSecondary">
                      No products found matching your search
                    </Typography>
                    {searchTerm && (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={handleClearSearch}
                        sx={{ mt: 1 }}
                      >
                        Clear Search
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: "1px solid rgba(224, 224, 224, 1)",
        }}
      />
    </Paper>
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 0 } }}>
          <Typography
            variant={isSmall ? "h5" : "h4"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            <ShoppingBasketIcon sx={{ mr: 1, verticalAlign: "bottom" }} />
            Products
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {filteredProducts.length} products found
          </Typography>
        </Box>

        <TextField
          label="Search Products"
          variant="outlined"
          size={isSmall ? "small" : "medium"}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: { xs: "100%", sm: "300px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
          placeholder="Search by name, category..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch} edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {isMobile ? renderMobileView() : renderTableView()}
    </Box>
  );
};

export default ProductList;
