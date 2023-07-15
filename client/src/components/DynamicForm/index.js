// import { TextField } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types"
import InputBox from '../InputBox';
import CheckBox from '../CheckBox';
import DropDown from '../DropDown';
// import AggregateComponent from '../AggregateComponent';

const DynamicForm = (props) => {
    const { formSchema = [], formName = '', className = '', formData = {} } = props;

    const formControls = ({ schema, key }) => {
        const control = {
            input: <InputBox key={key} schema={schema} formData={formData} ></InputBox>,
            checkbox: <CheckBox key={key} schema={schema} formData={formData}></CheckBox>,
            dropdown: <DropDown key={key} schema={schema} formData={formData}></DropDown>,
        }
        if (schema.controlType === "aggregate") {
            return schema && schema.components && schema.components.map(component => control[component.controlType])
        }
        return control[schema.controlType]
    }



    return (
        <form name={formName} className={className}>
            {formSchema.map((schema, schemaIndex) => (
                formControls({ schema, key: schema.id + "-" + schemaIndex })
            ))}
        </form>
    );
};

export default DynamicForm;

DynamicForm.propTypes = {
    formSchema: PropTypes.object.isRequired,
    formName: PropTypes.string,
    className: PropTypes.string,
    formData: PropTypes.object,
}