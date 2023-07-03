import { Button } from '@mui/material';
import React from 'react';
// import { connect } from 'react-redux';
import DynamicForm from '../../../components/DynamicForm';
import PropTypes from "prop-types"

const VendorDashboard = (props) => {
    const { user } = props
    console.log("🚀 ~ file: index.js:9 ~ VendorDashboard ~ user:", user)
    // const { services, setServices } = useState([])
    const formData = [
        {
            controlType: "input",
            name: "name",
            id: 'name',
            required: true,
            label: "Name",
        },
        {
            controlType: "dropdown",
            name: "category",
            id: 'category',
            label: "Service Category",
            options: [{ name: "Carpenter" }, { name: "Plumbing" }, { name: "Electician" }]
        },
        {
            controlType: "input",
            name: "serviceCharges",
            id: 'serviceCharges',
            label: "Charges",
        }
    ]

    return (
        <article>
            <Button>+ Add Services</Button>
            <DynamicForm formName="service" formData={formData}></DynamicForm>
            {
                <ul>
                    <li></li>
                </ul>
            }
        </article>
    );
};

// const mapStateToProps = (state) => ({
//     user: state.register.user,
// })

export default VendorDashboard;

VendorDashboard.propTypes = {
    user: PropTypes.object,
}