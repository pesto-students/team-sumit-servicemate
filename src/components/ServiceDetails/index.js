import React from 'react';
import PropTypes from 'prop-types';

const ServiceDetail = ({ service }) => {
  const titleStyle = {
    fontSize: '24px', // Adjust the font size as needed // Make the title bold
    color: '#000', // Set the color to your preferred value
    marginBottom: '9px', // Add some space at the bottom
    textTransform: 'uppercase', // Convert text to uppercase
    fontFamily: 'Arial, sans-serif',
    fontWeight: '400', // Use camelCase for property names
    lineHeight: '1.2', // Use camelCase for property names
  };

  return (
    <>
      <section className='vendor-name' style={titleStyle}>
        {service.title}
      </section>
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
