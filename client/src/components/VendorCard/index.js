import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  Typography,
  Button,
  Avatar,
  Rating,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const VendorCard = ({ vendorData, onBookNow }) => {
  const {
    vendorImage,
    vendorName,
    vendorEmailId,
    rating,
    service,
    mobileNumber,
    yearOfEstablishment,
  } = vendorData;

 


  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        border: "1px solid black",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Avatar
            alt={vendorName}
            src={vendorImage}
            sx={{ width: "100%", height: "100%", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">Name: {vendorName}</Typography>
          <Typography variant="h6">Email ID: {vendorEmailId}</Typography>
          <Rating
            name="vendor-rating"
            value={rating}
            precision={0.1}
            readOnly
          />
           <Typography variant="body2" >
               Services: {service.map((service, index,serviceArray) => (
                <span key={service}>{service}
                {index === serviceArray.length - 1 ? '' : ' || '}</span>
                ))}
                </Typography> 
          <Typography variant="body2">Mobile: {mobileNumber}</Typography>
          <Typography variant="body2">
            Year of Establishment: {yearOfEstablishment}
          </Typography>
        </Grid>
      </Grid>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onBookNow} variant="contained" color="primary">
          Book Now
        </Button>
        <Button component={Link} to={`/vendor/details/${vendorEmailId}`} size="small">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

VendorCard.propTypes = {
  vendorData: PropTypes.shape({
    vendorImage: PropTypes.string.isRequired,
    vendorName: PropTypes.string.isRequired,
    vendorEmailId: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      
      count: PropTypes.number.isRequired,
    }).isRequired,
    service: PropTypes.string.isRequired,
    mobileNumber: PropTypes.string.isRequired,
    yearOfEstablishment: PropTypes.string.isRequired,
  }).isRequired,
  onBookNow: PropTypes.func.isRequired,
};

export default VendorCard;
