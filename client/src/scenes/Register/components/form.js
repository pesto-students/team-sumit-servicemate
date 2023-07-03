import React, { useState } from 'react'
import { Button, Checkbox, TextField, FormControlLabel } from "@mui/material"
import "./styles/form.scss"
import { data } from '../../../config/db'
import { useNavigate } from 'react-router-dom'
import routeConstant from '../../../config/routeConstant'

const RegisterForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    const handleFormChange = (e) => {
        const { name, value, checked, type } = e ? e.target : {}
        if (name) {
            const newFormData = { ...formData }
            newFormData[name] = type === "checkbox" ? checked : value
            setFormData(newFormData)
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        data.users = [...data.users, formData]
        console.log("🚀 ~ file: form.js:22 ~ handleRegister ~ data:", data)
        navigate('/', {
            state: {
                userDetails: formData,
                navigatedFrom: routeConstant.register
            }
        })
    }

    return (
        <form className="registration-form">
            <TextField label="Name" variant="outlined" name='name' onChange={handleFormChange} />
            <TextField label="Email" variant="outlined" name='emailId' onChange={handleFormChange} />
            <TextField label="Password" variant="outlined" type="password" name='password' onChange={handleFormChange} />
            <FormControlLabel
                label="Register as service provider (Vendor)"
                control={
                    <Checkbox
                        checked={formData.isVendor}
                        onChange={handleFormChange}
                        name="isVendor"
                    />
                }
            />
            <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        </form>
    )
}

export default RegisterForm