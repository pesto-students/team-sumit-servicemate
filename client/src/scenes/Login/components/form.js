import React, { useState } from 'react'
import "./styles/form.scss"
import { Button, TextField } from '@mui/material';
// import { data } from '../../../config/db';
import ErrorMessage from './error';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const LoginForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log("🚀 ~ file: form.js:15 ~ LoginForm ~ loading:", loading)

    const handleFormChange = (e) => {
        const { name, value } = e ? e.target : {}
        if (name) {
            const newFormData = { ...formData }
            newFormData[name] = value
            setFormData(newFormData)
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            const { data } = await axios.post("http://localhost:5000/api/User/login", { ...formData }, config);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setShowError(false)
            navigate("/")
        } catch (error) {
            alert("invalid credentials")
            console.log(error)
        }
    }

    // const isUserExist = () => {
    //     return data.users.find(user => user.emailId === formData.emailId && user.password === formData.password)
    // }

    return (
        <form className="registration-form">
            <TextField label="Email" variant="outlined" name='email' onChange={handleFormChange} />
            <TextField label="Password" variant="outlined" type="password" name="password" onChange={handleFormChange} />
            <ErrorMessage open={showError} handleClose={() => { setShowError(false) }} message='you have entered invalid credentials'></ErrorMessage>
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </form>
    );
};

export default LoginForm;