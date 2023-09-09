import React, { useState } from 'react';
import { Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import PropTypes from "prop-types"

const SearchInput = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearch = debounce(onSearch, 300);

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        debouncedSearch(newSearchTerm);
    };

    return (
        <div>
            <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                endAdornment={
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                }
            />
        </div>
    );
}

export default SearchInput;

SearchInput.propTypes = {
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func,
}