import React, { useState } from 'react'
import { Button, TextField } from "@mui/material"
import "./styles/form.scss"
import { data } from '../../../config/db'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    const handleFormChange = (e) => {
        const { name, value } = e ? e.target : {}
        if (name) {
            const newFormData = { ...formData }
            newFormData[name] = value
            setFormData(newFormData)
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        data.users = [...data.users, formData]
        console.log("🚀 ~ file: form.js:22 ~ handleRegister ~ data:", data)

        navigate('/')
    }

    return (
        <form className="registration-form">
            <TextField label="Name" variant="outlined" name='name' onChange={handleFormChange} />
            <TextField label="Email" variant="outlined" name='emailId' onChange={handleFormChange} />
            <TextField label="Password" variant="outlined" type="password" name='password' onChange={handleFormChange} />
            <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        </form>
    )
}

export default RegisterForm