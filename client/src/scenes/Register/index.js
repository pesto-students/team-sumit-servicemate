import React from 'react'
import RegisterForm from './components/form'
import { connect } from 'react-redux'
import { registerUser } from './actions'
import PropTypes from "prop-types"
import DynamicForm from '../../components/DynamicForm'

const Register = (props) => {
    const { registerUser } = props
    return (
        <>
            <h1>Register</h1>
            <RegisterForm registerUser={registerUser}></RegisterForm>
            <DynamicForm></DynamicForm>
        </>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         someData: state.someData,
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (payload) => dispatch(registerUser(payload)),
    };
};


export default connect(null, mapDispatchToProps)(Register)

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
}