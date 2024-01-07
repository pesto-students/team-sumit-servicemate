import React, { useRef } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const locations = [
  { name: 'New York', id: 1 },
  { name: 'San Francisco', id: 2 },
  { name: 'London', id: 3 },
  { name: 'Tokyo', id: 4 },
  { name: 'Sydney', id: 5 },
];

const LocationSelect = () => {
  const inputRef = useRef(null);

  return (
    <Autocomplete
      options={locations.map((option) => option.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          placeholder="Select a location"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <LocationOnIcon fontSize="small" sx={{ marginRight: '8px' }} />
            ),
            sx: {
              color: 'black',
              bgcolor: 'white',
              borderRadius: '30px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              },
              width: '250px',
              height: '50px',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
          }}
        />
      )}
    />
  );
};

export default LocationSelect;
