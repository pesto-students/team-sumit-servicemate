import React from "react";
import {
 
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Rating,
  // Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MyCard = ({ cardData }) => {
  
  return (
    <>

      {cardData && cardData.length > 0 ?(cardData.map((card) => (
        <Grid item sm={4  }
                spacing={2}
                className="pt-5 pb-5 pl-2 pr-2" key={card.id}>
          <Link
            to={`/vendor-list/${card.serviceProviderId?.serviceProviderName}`}
             >
            <Paper
              elevation={6}
              sx={{
                transform: "scale(1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                height: 300,
                width: 300,
              }}
            >
              <CardMedia 
                component="img"
                image={card.catagories?.[0]?.image}
                alt={card.title}
                sx={{ height: '150px'  }}
              />
              <CardContent>
              <Typography variant="h5" component="div" sx={{ fontFamily: 'Work Sans, sans-serif' }}>
               {card.serviceProvider}
              </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
               Services: {card.services.map((service, index) => (
                <span key={service}>{service}
                {index !== card.services.length - 1 && " , "}</span>
                ))}
                </Typography>  */}
                <Rating name="read-only" value={card.serviceProviderId?.rating} readOnly />
                <Typography variant="body2" color="text.secondary">
                About me : {card.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Price : <b>₹{card.price} /hr</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Description : {card.description} 
                </Typography> 

                                {/* <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px" }}
              >
                Book Now
              </Button> */}
              </CardContent>
            </Paper>
          </Link>
        </Grid>
      ))):(
        <Typography  sx={{ fontFamily: 'Work Sans, sans-serif' }}>no data found!!</Typography>
      )}
	
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