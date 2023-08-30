import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Link, Box, CircularProgress } from "@mui/material";
import Card from "../../components/Card";
import CategoryItem from "../../components/CategoryItem";
import { Link as RouterLink } from "react-router-dom";
import restClient from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./actions";


const cardData = [
  {
    id: 1,
    image:
      "https://img.freepik.com/premium-photo/repairman-holds-screwdriver-suitcase-tools-kitchen-looks-camera_353017-487.jpg?w=740",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    catagories: [{
      image: "https://img.freepik.com/premium-photo/repairman-holds-screwdriver-suitcase-tools-kitchen-looks-camera_353017-487.jpg?w=740",
    }]
  },
  {
    id: 2,
    catagories: [{
      image:
        "https://img.freepik.com/free-vector/housewife-repairman-with-tools-box-kitchen-near-broken-fridge-leakage-floor-home-appliance-repair-service_575670-1163.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    }],
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
  {
    id: 3,
    catagories: [{
      image:
        "https://img.freepik.com/premium-photo/handyman-with-toolbox_152404-7233.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    }],
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
];

const Categories = () => {

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories.categories)
  const [categoryData, setCategoryData] = useState([])
  const [loading,setLoading] = useState(true)
  const handleCategories = async () => {
    try {
      const response = await restClient.get("/api/vendor/catagories");
      console.log("Categories:", JSON.stringify(response.data));
      dispatch(setCategories(response.data))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    // if (!categories)
    handleCategories();
  }, [])

  useEffect(() => {
    if (categories && categories.length) {
      setCategoryData(formatCategories(categories))
    }
  }, [categories])

  const formatCategories = (data = []) => {
    if (Array.isArray(data) && data.length) {
      return data.map((category) => ({
        id: category._id,
        name: category.catagories,
        imageUrl: category.image
      }));
    }
    return []
  }



  return (
    <>

      <Container sx={{ py: 5 }}>

        <Box sx={{ boxShadow: 3 }}>
          <div>
            <Typography variant="h5" sx={{ color: "#666", textAlign: "center" }}>
              Categories
            </Typography>
            <Grid container className="sm:justify-evenly" spacing={2}>
            {loading ? (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
                  <CircularProgress /> {/* Centered CircularProgress */}
                </Box>
              ) : (
              categoryData.map((category) => (
                <Grid item xs={12} sm={6} md={2} key={category.id}>
                  <Link
                    component={RouterLink}
                    to={`/vendor-list?category=${category.name}`}
                    underline="none"
                    color="inherit"
                  >
                    <CategoryItem
                      name={category.name}
                      imageUrl={category.imageUrl}
                    />
                  </Link>
                </Grid>
              )))}
            </Grid>
          </div>
        </Box>
        <Box sx={{ boxShadow: 3 }}>
          <div style={{ marginTop: "40px" }}>
            <Typography variant="h5" sx={{ color: "#666", marginBottom: "10px", textAlign: "center" }}>
              Services
            </Typography>
            <Grid container spacing={3} sx={{ marginLeft: "20px" }} >
              <Card cardData={cardData} />
            </Grid>
          </div>
        </Box>
      </Container>
    </>
  );

};


export default Categories;
