import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types"
const InputBox = (props) => {
    const { name = '', id = '', required = false, type = 'text', label = '', key = '', onChange = () => { } } = props
    return (
        <TextField key={key} id={id} name={name} label={label} type={type} required={required} onChange={onChange}></TextField>
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
}