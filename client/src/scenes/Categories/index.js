import React from "react";
import { styled } from "@mui/system";
import { Box, TextField, Container } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import banner from "../../Layout/images/banner.jpg";
import Card from "../../components/Card";

const BannerContainer = styled(Box)(() => ({
  position: "relative",
  backgroundImage: `url(${banner})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const categories = [
  { title: "Category 1", id: 1 },
  { title: "Category 2", id: 2 },
  { title: "Category 3", id: 3 },
];

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
  {
    id: 4,
    image:
      "https://img.freepik.com/premium-photo/professional-cleaning-service-team-cleans-living-room-modern-apartment_130111-3807.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
];

const Categories = () => {
  return (
    <>
      <BannerContainer>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={categories.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                type: "search",
                sx: {
                  color: "black",
                  bgcolor: "white",
                },
              }}
              sx={{ width: "500px" }}
            />
          )}
        />
      </BannerContainer>
      <Container sx={{ py: 5 }}>
        <Grid container spacing={2}>
          <Card cardData={cardData} />
        </Grid>
      </Container>
    </>
  );
};

export default Categories;
