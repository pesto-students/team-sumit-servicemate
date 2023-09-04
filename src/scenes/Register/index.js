import React from 'react'
import RegisterForm from './components/form'
import { useDispatch } from 'react-redux'
import { registerUser } from './actions'
import PropTypes from "prop-types"
import Footer from '../../components/footer/footer'

const Register = () => {
    const dispatch = useDispatch()

    return (
        <>
            <RegisterForm registerUser={(data) => dispatch(registerUser(data))}></RegisterForm>
            <div style={{marginTop:"10%"}}>
      <Footer  />
      </div>
        </>
    )
}

export default Register

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
}