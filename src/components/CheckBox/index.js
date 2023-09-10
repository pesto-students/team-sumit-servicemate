import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types"
const CheckBox = (props) => {
    const { name = '', id = '', onChange = () => { } } = props.formSchema || {};
    const { formData } = props || {}
    return (
        <FormControlLabel
            label="Register as service provider (Vendor)"
            control={
                <Checkbox
                    onChange={(e) => onChange(e, e.target.name, e.target.checked)}
                    name={name}
                    id={id}
                    inputProps={{ 'aria-label': 'controlled' }}
                    value={formData[name]}
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
    formSchema: PropTypes.object,
}
