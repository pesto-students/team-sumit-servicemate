import React, { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";
const CarouselItem = ({ imageUrls }) => {
  return (
    <>
      <Carousel autoPlay infiniteLoop interval={3000}>
        {imageUrls.map((imageUrl) => (
          <div key={imageUrl}>
            <img src={imageUrl} alt="" style={{ width: "100%" }} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

CarouselItem.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default CarouselItem;
