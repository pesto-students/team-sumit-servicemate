import React, { useState } from 'react'
import { Button, Checkbox, TextField, FormControlLabel } from "@mui/material"
import "./styles/form.scss"
// import { data } from '../../../config/db'
import { useNavigate } from 'react-router-dom'
import routeConstant from '../../../config/routeConstant'
import PropTypes from "prop-types"
import restClient from '../../../config/axios'
// import ErrorMessage from '../../Login/components/error'
const RegisterForm = (props) => {
    const { registerUser } = props

    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    // const [showError, setShowError] = useState(false)

    const handleFormChange = (e) => {
        const { name, value, checked, type } = e ? e.target : {}
        if (name) {
            const newFormData = { ...formData }
            newFormData[name] = type === "checkbox" ? checked : value
            setFormData(newFormData)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        registerUser(formData)
        try {
            const { data } = await restClient.post("/api/user/register", JSON.parse(JSON.stringify(formData)))
            if (data) {
                navigate('/dashboard', {
                    state: {
                        userDetails: formData,
                        navigatedFrom: routeConstant.register
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="registration-form">
            <TextField label="Name" variant="outlined" name='name' required onChange={handleFormChange} />
            <TextField label="Email" variant="outlined" name='email' required onChange={handleFormChange} />
            <TextField label="Password" variant="outlined" type="password" required name='password' onChange={handleFormChange} />
            <TextField label="Mobile Number" variant='outlined' name='phoneNo' required onChange={handleFormChange}></TextField>
            <FormControlLabel
                label="Register as service provider (Vendor)"
                control={
                    <Checkbox
                        // checked={formData.isVendor}
                        onChange={handleFormChange}
                        name="userType"
                        inputProps={{ 'aria-label': 'controlled' }}
                        value={formData.isVendor}
                    />
                }
            />
            <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        </form>
    )
}

export default RegisterForm

RegisterForm.propTypes = {
    registerUser: PropTypes.func
}