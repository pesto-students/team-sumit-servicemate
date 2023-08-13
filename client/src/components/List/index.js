import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@mui/material";

const Lists = ({ listData, activeCategory, handleCategoryChange }) => {
  return (
    <>
      <List
        sx={{
          bgcolor: "white",
          boxShadow: "0px 1px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ListItem
          key="all"
          sx={{
            backgroundColor: activeCategory === "all" ? "#f5f5f5" : "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
            },
          }}
          onClick={() => handleCategoryChange("all")}
        >
          <ListItemText primary="All" sx={{ bgcolor: "white" }} />
        </ListItem>
        {listData.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              backgroundColor:
                activeCategory === item.catagories ? "#f5f5f5" : "white",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              },
            }}
            onClick={() => handleCategoryChange(item.catagories)}
          >
            <ListItemText primary={item.catagories} sx={{ bgcolor: "white" }} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

Lists.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleCategoryChange: PropTypes.func.isRequired,
};

export default Lists;
