import { React, useState } from "react";

import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "../../components/Card";
import Lists from "../../components/List";
import Search from "../../components/SearchBox";

const categories = [
  { id: 1, title: "Plumber" },
  { id: 2, title: "Electrician" },
  { id: 3, title: "Handyman" },
];

const cardData = [
  {
    id: 1,
    image:
      "https://img.freepik.com/premium-photo/repairman-holds-screwdriver-suitcase-tools-kitchen-looks-camera_353017-487.jpg?w=740",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    categoryId: 1,
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-vector/housewife-repairman-with-tools-box-kitchen-near-broken-fridge-leakage-floor-home-appliance-repair-service_575670-1163.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Electrician",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    categoryId: 2,
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/premium-photo/handyman-with-toolbox_152404-7233.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Electrician",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    categoryId: 2,
  },
  {
    id: 4,
    image:
      "https://img.freepik.com/premium-photo/professional-cleaning-service-team-cleans-living-room-modern-apartment_130111-3807.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Handyman",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    categoryId: 3,
  },
];

const Categories = () => {
  const [filteredCardData, setFilterdCardData] = useState(cardData);

  const handleCategoryChange = (categoryId) => {
    const filteredCardData =
      categoryId === null
        ? cardData
        : cardData.filter((card) => card.categoryId === categoryId);
    setFilterdCardData(filteredCardData);
  };

  return (
    <>
      <Container sx={{ py: 5 }} maxWidth="xl">
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 5,
          }}
          maxWidth="xl"
        >
          <Search searchData={categories} />
        </Container>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1rem" }}
            >
              Category
            </Typography>
            <Lists
              listData={categories}
              handleCategoryChange={handleCategoryChange}
            />
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2} sx={{ my: 4 }}>
              <Card cardData={filteredCardData} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Categories;
