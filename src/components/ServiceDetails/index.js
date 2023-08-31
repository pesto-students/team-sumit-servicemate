import React from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
const ServiceDetail = ({ service }) => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
       <strong>{service.title}</strong>
       </Typography>
      {/* <Typography variant="h6" gutterBottom>
        Price: {service.price}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {service.description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Ratings: {service.ratings}
      </Typography> */}
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
