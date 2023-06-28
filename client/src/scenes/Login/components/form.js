import React, { useState } from 'react'
import "./styles/form.scss"
import { Button, TextField } from '@mui/material';
import { data } from '../../../config/db';
import ErrorMessage from './error';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const [showError, setShowError] = useState(false)
    const handleFormChange = (e) => {
        const { name, value } = e ? e.target : {}
        if (name) {
            const newFormData = { ...formData }
            newFormData[name] = value
            setFormData(newFormData)
        }
    }
    const handleLogin = (e) => {
        e.preventDefault()
        console.log("login user: ", isUserExist())
        if (isUserExist()) {
            setShowError(false)
            navigate("/")
        } else {
            setShowError(true)
        }
    }

    const isUserExist = () => {
        return data.users.find(user => user.emailId === formData.emailId && user.password === formData.password)
    }

    return (
        <form className="registration-form">
            <TextField label="Email" variant="outlined" name='emailId' onChange={handleFormChange} />
            <TextField label="Password" variant="outlined" type="password" name="password" onChange={handleFormChange} />
            <ErrorMessage open={showError} handleClose={() => { setShowError(false) }} message='you have entered invalid credentials'></ErrorMessage>
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </form>
    );
};

export default LoginForm;