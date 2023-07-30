import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  // Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MyCard = ({ cardData }) => {
  return (
    <>
      {cardData.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <Link
            to={`/vendor-list?category=${cardData.name}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                transform: "scale(1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                height: 400,
                width: 300,
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
                {/* <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px" }}
              >
                Book Now
              </Button> */}
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </>
  );
};

MyCard.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MyCard;
