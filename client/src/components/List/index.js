import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@mui/material";

const Lists = ({ listData, selectedCategoryId, handleCategoryChange }) => {
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
            backgroundColor: selectedCategoryId === null ? "#f5f5f5" : "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
            },
          }}
          onClick={() => handleCategoryChange(null)}
        >
          <ListItemText primary="All" sx={{ bgcolor: "white" }} />
        </ListItem>
        {listData.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              backgroundColor:
                selectedCategoryId === item.id ? "#f5f5f5" : "white",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              },
            }}
            onClick={() => handleCategoryChange(item.id)}
          >
            <ListItemText primary={item.title} sx={{ bgcolor: "white" }} />
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
  selectedCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleCategoryChange: PropTypes.func.isRequired,
};

export default Lists;
