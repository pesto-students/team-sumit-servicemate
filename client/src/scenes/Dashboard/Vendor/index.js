import React from 'react';
// import { connect } from 'react-redux';
import DynamicForm from '../../../components/DynamicForm';
import PropTypes from "prop-types"
import "./styles/vendorDashboard.scss"
import EngineeringIcon from '@mui/icons-material/Engineering';
import ButtonComponent from '../../../components/Buttons';

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

    const actionButtons = [
        {
            icon: <EngineeringIcon />,
            name: "add-service",
            label: '+ Add Services'
        }
    ]

    return (
        <article className='vendor-dashboard'>
            {
                actionButtons.map((button) => (
                    <ButtonComponent.DashedButton key={button.name} {...button}>
                    </ButtonComponent.DashedButton>
                ))
            }
            <DynamicForm formName="service" formData={formData} className={"add-services-form"}></DynamicForm>
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