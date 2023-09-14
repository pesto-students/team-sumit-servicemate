import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//import routes from '../../config/routeConstants'
import { Avatar, Box, Button,Container, CssBaseline,  TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import NotificationSnackBar from '../Login/components/error';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import restClient from '../../config/axios';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" >
          ServiceMate
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  
  
  const defaultTheme = createTheme();

function Form() {
   // const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false)
    const [formData, setFormData] = useState({ email: '' });
    const handleFormChange = (e) => {
        const { email, value } = e ? e.target : {}
        if (email) {
          const newFormData = { ...formData }
          newFormData[email] = value
          setFormData(newFormData)
        }
      }

      const sendEmail = async (e) => {
        e.preventDefault()
        setIsLoading(true);
    
        try {
          const response = await restClient.post('/api/user/sendEmail', {
            to: formData.email, // Use the email address from the form data
            subject: 'Hello ✔',
            text: 'Hello there, plz click here for resetiing password',
            html: '<b>Hello world?</b>',
        });
        console.log("Message sent: %s", response.data.message);
        //  setMessage(response.data.message);
        } catch (error) {
            console.error("Error sending email:", error);
            setShowError(true);
        } finally {
          setIsLoading(false);
        }
      };
    


      
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
            Forgot Password
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name='email'
              autoComplete="email"
              autoFocus
              onChange={handleFormChange}
            />
           
            <NotificationSnackBar open={showError} handleClose={() => { setShowError(false) }} message='Enter valid emailId'></NotificationSnackBar>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#fcb800" }} onClick={sendEmail} disabled={isLoading}
            >
              Forgot Password
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>

  )
}

export default Form