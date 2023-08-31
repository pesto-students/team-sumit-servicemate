import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Paper, ThemeProvider, Typography, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from "../../components/Card";
import Lists from "../../components/List";
//import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import restClient from "../../config/axios";
import { setCollectiveDate } from "./action";
//import CategoryItem from "../../components/CategoryItem";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const [categoryData, setCategoryData] = useState([]);
  const [filteredCardData, setFilteredCardData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    // Set the category data when the component mounts or when categories change
    setCategoryData(categories);
  }, [categories]);

  useEffect(() => {
    // Fetch filtered results when the component mounts
    getFilteredResult();
  }, []);

  const handleCategoryChange = async (categoryName) => {
    // Handle category change and fetch filtered results
    getFilteredResult(categoryName);
    setActiveCategory(categoryName);
  };

  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

  const getFilteredResult = async (categoryName = "") => {
    const apiUrl = `/api/vendor/serviceSearch?catagories=${categoryName}`;

    try {
      const { data: apiResponse } = await restClient.get(apiUrl);

      dispatch(setCollectiveDate(apiResponse));
      setFilteredCardData(apiResponse);
      setLoading(false);
    } catch (error) {
      // Handle API request error
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center',

        // Center vertically
        // Ensure full viewport height
      }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ backgroundColor: '#f0f0f0' }} // Set the background color to light gray
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-evenly", // Center horizontally with equal spacing
          alignItems: "center", // Center vertically
          maxWidth: "xl",
        }}

      ></Container>
      <Container >
        <Box sx={{ boxShadow: 3, padding: "10px" }}>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <Paper variant="outlined" sx={{ width: '100%', marginTop: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" component="h2" sx={{ marginBottom: "0.5rem", textTransform: 'uppercase' }}>
                  Category
                </Typography>
              </Paper>

              <Lists
                style={{ marginTop: "20px" }}
                listData={categoryData || []}
                handleCategoryChange={handleCategoryChange}
                activeCategory={activeCategory}
              />
            </Grid>
            {loading ? (
              // Display a loading indicator while data is being fetched
              <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
                <CircularProgress />
              </Box>
            ) : (
              // Display the active category and filtered card data
              <Grid item xs={10}>
                <ThemeProvider theme={theme} sx={{ my: 0 }}>
                  <Paper variant="outlined" sx={{ width: '100%', marginTop: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ marginBottom: "0.5rem", textTransform: 'uppercase' }}
                    >
                      {activeCategory}
                    </Typography>
                  </Paper>
                </ThemeProvider>

                <Grid container spacing={2} sx={{ my: 0 }}>
                  {filteredCardData.length > 0 ? (
                    <Card cardData={filteredCardData} />
                  ) : (
                    // Display a message when no services are available
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      No services available for this Category!!!!
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

export default Categories;
