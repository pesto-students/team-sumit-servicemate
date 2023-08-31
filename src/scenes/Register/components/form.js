import React, { useState } from 'react'
import { Button, Checkbox, TextField, FormControlLabel, ThemeProvider, createTheme, Container, CssBaseline, Box, Avatar, Typography } from "@mui/material"
import "./styles/form.scss"
// import { data } from '../../../config/db'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import routeConstant from '../../../config/routeConstant'
import PropTypes from "prop-types"
import restClient from '../../../config/axios'
// import ErrorMessage from '../../Login/components/error'
const RegisterForm = (props) => {
    const { registerUser } = props

    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    // const [showError, setShowError] = useState(false)

    const defaultTheme = createTheme();

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
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                        <TextField
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="Name"
                            label="Name"
                            autoFocus
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="normal"
                            autoComplete="given-name"
                            name="email"
                            required
                            fullWidth
                            id="Email"
                            label="Email"
                            autoFocus
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="normal"
                            autoComplete="off" // Disable browser autocomplete to prevent issues with restricted input
                            name="phoneNo"
                            required
                            fullWidth
                            label="Mobile Number"
                            autoFocus

                            onChange={handleFormChange}
                            inputProps={{
                                maxLength: 12, // Enforce maximum length
                                pattern: '\\d*', // Allow only digits
                            }}
                        />
                    </Box>
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


                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RegisterForm

RegisterForm.propTypes = {
    registerUser: PropTypes.func
}