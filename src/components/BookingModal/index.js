import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
  // TextareaAutosize,
  Typography,

  //  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import restClient from '../../config/axios';
//import { useParams } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

const bookingAppointmentValidationSchema = yup.object({
  userName: yup
    .string('Enter your full name')
    .required('Full name is required'),
  userEmailId: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const BookingModal = (props) => {
  const { isOpen, onClose, vendor, buttonText, handleBookAppointmentModal } = props;

  const loggedInUser = useSelector((state) => state.user.authUser);

  // const [date, setDate] = useState('');

  // const [time, setTime] = useState('');


  const [alertMessage, setAlertMessage] = useState('');


  // const appointmentDate = date;

  const service = vendor?.service;




  // const handleDateChange = (event) => {
  //   setDate(event.target.value);


  // };
  // const handleTimeslotChange = (event) => {
  //   setTime(event.target.value); // Update timeslot state when the user selects a time slot
  //   console.log(time);
  // };

  const handleSubmit = async (values) => {
    try {
      const { street, city, state, postalCode, country, userEmailId, userName, time, appointmentDate } = values;
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${loggedInUser.token}`,
        },

      };


      const { appointment } = await restClient.post('/api/user/bookAppointment', {
        vendorId: vendor?.vendorId,
        service,
        userStreet: street,
        userCity: city,
        userState: state,
        userPostalCode: postalCode,
        userCountry: country,
        appointmentDate,
        time,
        userEmailId: userEmailId,
        userName: userName
      }, config);
      if (appointment) {
        setAlertMessage('Appointment Booked!'); // Set success message
      }
      onClose();
    } catch (error) {
      setAlertMessage('Appointment not Booked!');
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    validationSchema: bookingAppointmentValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose}>

      <DialogTitle style={{ textAlign: 'center' }}>Book Appointment </DialogTitle>

      <DialogContent>
        <div style={{ marginBottom: '20px' }}>
          {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
        </div>
        <TextField
          label="ServiceProvider Name"
          value={vendor?.vendorName}
          fullWidth
          sx={{ marginBottom: '1rem' }}
          disabled
        />

        <TextField
          type="date"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />


        <TextField
          type="time"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.time && Boolean(formik.errors.time)}
          helperText={formik.touched.time && formik.errors.time}
        />


        <Box sx={{
          marginBottom: '1rem',
          border: '1px solid #ccc', // Add border style here
          borderRadius: '4px', // Optional: Add border radius for rounded corners
          padding: '0.5rem', // Optional: Add padding for spacing
        }}>
          <Typography variant="h7">Your Details</Typography>

          <TextField
            label="Full Name"
            name="userName"
            // onChange={handleBookAppointmentForm}
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
            id="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />

          <TextField
            label="Email ID"
            name="userEmailId"
            id="userEmailId"
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
            value={formik.values.userEmailId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userEmailId && Boolean(formik.errors.userEmailId)}
            helperText={formik.touched.userEmailId && formik.errors.userEmailId}
          />

          <TextField
            label="street"
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />


          <TextField
            label="city"
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            label="state"
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
          <TextField
            label="postalCode"
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
            helperText={formik.touched.postalCode && formik.errors.postalCode}
          />
          <TextField
            label="country"
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </Box>
        <TextField
          label="services"
          value={service}
          minRows={3}
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleBookAppointmentModal || handleSubmit} variant="contained" color="primary">
          {buttonText || 'Book Now'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
  handleBookAppointmentModal: PropTypes.func.isRequired,
};

export default BookingModal;
