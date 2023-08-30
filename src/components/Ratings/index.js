import React from "react";
import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";

const CustomerRatings = ({ customerReviews }) => {
  return (
    <>
      <Typography variant="h6" component="h3" mt={4} mb={2}>
        Customer Ratings
      </Typography>
      {customerReviews.map((review) => (
        <Box
          key={review.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            p: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Rating
              value={review.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              sx={{
                ml: 1,
              }}
            >
              {review.rating}
            </Typography>
          </Box>
          <Typography variant="body2" gutterBottom>
            {review.comment}
          </Typography>
        </Box>
      ))}
    </>
  );
};

CustomerRatings.propTypes = {
  customerReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomerRatings;
