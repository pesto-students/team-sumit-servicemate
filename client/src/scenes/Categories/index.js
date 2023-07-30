import React from "react";
import { Container, Typography, Grid, Link } from "@mui/material";
import Card from "../../components/Card";
import CategoryItem from "../../components/CategoryItem";
import { Link as RouterLink } from "react-router-dom";

const cardData = [
  {
    id: 1,
    image:
      "https://img.freepik.com/premium-photo/repairman-holds-screwdriver-suitcase-tools-kitchen-looks-camera_353017-487.jpg?w=740",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-vector/housewife-repairman-with-tools-box-kitchen-near-broken-fridge-leakage-floor-home-appliance-repair-service_575670-1163.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/premium-photo/handyman-with-toolbox_152404-7233.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
];

const categories = [
  {
    id: 1,
    name: "Category 1",
    imageUrl:
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Category 2",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661541260934-3e4f2a056dfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Category 3",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661750421109-c8c61200dc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 1,
    name: "Category 1",
    imageUrl:
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 1,
    name: "Category 1",
    imageUrl:
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];
const Categories = () => {
  return (
    <>
      <Container sx={{ py: 5 }}>
        <div>
          <Typography variant="h5" sx={{ color: "#666" }}>
            Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
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
            ))}
          </Grid>
        </div>

        <div style={{ marginTop: "40px" }}>
          <Typography variant="h5" sx={{ color: "#666", marginBottom: "10px" }}>
            Services
          </Typography>
          <Grid container spacing={2}>
            <Card cardData={cardData} />
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Categories;
