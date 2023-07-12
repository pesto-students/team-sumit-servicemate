import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
const Search = ({ searchData }) => {
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={searchData?.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            type: "search",
            sx: {
              color: "black",
              bgcolor: "white",
              borderRadius: "20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              },
            },
          }}
          sx={{
            width: "500px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
        />
      )}
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
