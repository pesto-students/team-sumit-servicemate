import React from "react";
import { Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
const ServiceDetail = ({ service, handleBookNow }) => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {service.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price: {service.price}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {service.description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Vendor: {service.vendor}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Ratings: {service.ratings}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBookNow}>
        Book Now
      </Button>
    </>
  );
};

ServiceDetail.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
    ratings: PropTypes.number.isRequired,
    customerReviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleBookNow: PropTypes.func.isRequired,
};

export default ServiceDetail;
