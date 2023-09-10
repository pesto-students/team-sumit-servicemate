import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotificationSnackBar from './error'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import restClient from '../../../config/axios';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../actions';
import { useAlert } from '../../../hooks/NotificationSnackbar';
import routes from '../../../config/routeConstants';

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


export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showSuccessAlert, showErrorAlert } = useAlert()
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
      const { data } = await restClient.post("/api/user/login", { ...formData }, config);
      // localStorage.setItem("userInfo", JSON.stringify(data));
      showSuccessAlert("You have been logged in successfully")
      dispatch(setLoggedInUser(data))
      setShowError(false)
      navigate(routes.DASHBOARD2PROFILE)
    } catch (error) {
      setShowError(true)
      console.log(error)
      showErrorAlert("Something went wrong, please enter correct email and password")
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            <NotificationSnackBar open={showError} handleClose={() => { setShowError(false) }} message='you have entered invalid credentials'></NotificationSnackBar>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#fcb800" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
