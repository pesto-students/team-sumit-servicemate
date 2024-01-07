import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
const InputBox = (props) => {
    const { formData } = props || {};
    const { name = '', id = '', required = false, type = 'text', label = '', key = '', onChange = () => { }, multiline, maxRows, fullWidth, error } = props.schema || {};

    return (
        <TextField key={key} id={id} name={name} label={label} type={type} required={required}
            value={formData[name]} error={error}
            onChange={onChange} multiline={multiline} maxRows={maxRows} fullWidth={fullWidth}></TextField>
    );
};

export default InputBox;

InputBox.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    label: PropTypes.string,
    key: PropTypes.string,
    onChange: PropTypes.func,
    multiline: PropTypes.bool,
    maxRows: PropTypes.number,
    fullWidth: PropTypes.bool,
    schema: PropTypes.object,
    error: PropTypes.bool,
};