import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types"
const CheckBox = (props) => {
    const { name = '', id = '', value = '', onChange = () => { } } = props;
    return (
        <FormControlLabel
            label="Register as service provider (Vendor)"
            control={
                <Checkbox
                    onChange={onChange}
                    name={name}
                    id={id}
                    inputProps={{ 'aria-label': 'controlled' }}
                    value={value}
                />
            }
        />
    );
};

export default CheckBox;

CheckBox.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}
