import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import debounce from 'lodash/debounce';
import { PropTypes } from 'prop-types';

const DynamicSearch = ({ selectedValue = null, setSelectedValue = () => { }, handleSearch = () => { }, data = [], optionLabel = 'name' }) => {
  const debouncedSearch = debounce(handleSearch, 300);
  const getData = () => data
  return (
    <Autocomplete
      options={getData()}
      getOptionLabel={(option) => option[optionLabel]}
      value={selectedValue}
      onInputChange={(event, newValue) => {
        // Trigger the debounced search when input changes
        debouncedSearch(newValue);
      }}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Employee" variant="outlined" />
      )}
    />
  );
};

export default DynamicSearch;

DynamicSearch.propTypes = {
  selectedValue: PropTypes.string,
  setSelectedValue: PropTypes.func,
  handleSearch: PropTypes.func,
  data: PropTypes.array,
  optionLabel: PropTypes.string,
}