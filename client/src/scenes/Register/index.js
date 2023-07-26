import React from 'react'
import RegisterForm from './components/form'
import { useDispatch } from 'react-redux'
import { registerUser } from './actions'
import PropTypes from "prop-types"

const Register = () => {
    const dispatch = useDispatch()

    return (
        <>
            <RegisterForm registerUser={(data) => dispatch(registerUser(data))}></RegisterForm>
        </>
    )
}

export default Register

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
}