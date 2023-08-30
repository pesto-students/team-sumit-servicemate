import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";

const Search = () => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  return (
    <TextField
      // label="Search"
      value={inputValue}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClearInput}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        type: "search",
        sx: {
          color: "black",
          bgcolor: "white",
          borderRadius: "30px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
          width: "250px",
          height: "50px",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "30px",
        },
      }}
    />
  );
};

Search.propTypes = {
  searchData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Search;
