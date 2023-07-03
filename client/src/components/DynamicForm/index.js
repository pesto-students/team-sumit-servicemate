// import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types"
import InputBox from '../InputBox';
import CheckBox from '../CheckBox';
import DropDown from '../DropDown';

const DynamicForm = (props) => {
    const { formData = [], formName = '', className = 'registration-form' } = props;

    const formControls = (data) => {
        const control = {
            input: <InputBox {...data} ></InputBox>,
            checkbox: <CheckBox {...data}></CheckBox>,
            dropdown: <DropDown {...data}></DropDown>
        }
        return control[data.controlType]
    }



    return (
        <form name={formName} className={className}>
            {formData.map((data, index) => (
                formControls({ ...data, key: data.id + "-" + index })
            ))}
        </form>
    );
};

export default DynamicForm;

DynamicForm.propTypes = {
    formData: PropTypes.object.isRequired,
    formName: PropTypes.string,
    className: PropTypes.string,
}