import React from "react";
import PropTypes from "prop-types";

const CategoryItem = ({ name, imageUrl }) => {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: "150px",
          height: "120px",
          textAlign: "center",
          margin: "20px",
          transition: "opacity 0.3s ease",
          borderRadius: "10px",
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = 0.8)}
        onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
      />
      <div style={{ fontWeight: "bold", marginTop: "10px" }}>{name}</div>
    </div>
  );
};

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CategoryItem;
