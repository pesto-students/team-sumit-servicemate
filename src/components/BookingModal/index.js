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

const BookingModal = ({ isOpen, onClose, vendor }) => {
  console.log(vendor);
  //  const { email } = useParams();
  //  const collectivedata = useSelector((state) => state.collectiveData.fulldata);
  const loggedInUser = useSelector((state) => state.user.authUser);
  console.log('lop' + loggedInUser?.address?.address?.street);
  const [date, setDate] = useState('');

  // const [services, setServices] = useState("");
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [time, setTime] = useState('');


  const [alertMessage, setAlertMessage] = useState('');


  const serviceProviderId = vendor.id;
  const appointmentDate = date;

  const service = vendor.service;
  //const time = appointmentDate




  const handleDateChange = (event) => {
    setDate(event.target.value);


  };
  const handleTimeslotChange = (event) => {
    setTime(event.target.value); // Update timeslot state when the user selects a time slot
    console.log(time);
  };

  const handleAddressStreet = (event) => {
    setStreet(event.target.value);
    console.log(street);

  };
  const handleAddressCity = (event) => {
    setCity(event.target.value);
    console.log(city);

  };
  const handleAddressState = (event) => {
    setState(event.target.value);
    console.log(state);

  };
  const handleAddressStatePostalCode = (event) => {
    setPostalCode(event.target.value);
    console.log(postalCode);

  };
  const handleAddressCountry = (event) => {
    setCountry(event.target.value);
    console.log(country);

  };

  // const handleServicesChange = (event) => {
  //   setServices(event.target.value);


  // };
  // console.log("userAddress:", userAddress.street);
  // const filteredData = collectivedata.filter(
  //   (item) => item.serviceProviderId?.serviceProviderEmailId === email
  // );
  // const extractedData = filteredData[0]?.serviceProviderId?.openHours.map((entry) =>
  //   entry.timeSlot.map((slot) => ({
  //     day: slot.day, 
  //     fromTime: slot.fromTime,
  //     toTime: slot.toTime,

  //   }))

  // );

  const handleSubmit = async () => {
    try {

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${loggedInUser.token}`,
        },

      };


      const { appointment } = await restClient.post('/api/user/appointment', {
        serviceProviderId,
        service,
        userStreet: street,
        userCity: city,
        userState: state,
        userPostalCode: postalCode,
        userCountry: country,
        appointmentDate,
        time,
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

  return (
    <Dialog open={isOpen} onClose={onClose}>

      <DialogTitle style={{ textAlign: 'center' }}>Book Appointment </DialogTitle>

      <DialogContent>
        <div style={{ marginBottom: '20px' }}>
          {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
        </div>
        <TextField
          label="ServiceProvider Name"
          value={vendor.vendorName}
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />

        <TextField

          type="date"
          value="date"
          onChange={handleDateChange}
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />


        <TextField
          type="time"
          value=""
          onChange={handleTimeslotChange}
          fullWidth
          sx={{ marginBottom: '1rem' }}
        > {time} </TextField>


        <Box sx={{
          marginBottom: '1rem',
          border: '1px solid #ccc', // Add border style here
          borderRadius: '4px', // Optional: Add border radius for rounded corners
          padding: '0.5rem', // Optional: Add padding for spacing
        }}>
          <Typography variant="h7">Address</Typography>
          <TextField
            label="street"

            onChange={handleAddressStreet}

            fullWidth
            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
          />


          <TextField
            label="city"
            fullWidth
            onChange={handleAddressCity}

            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
          />
          <TextField
            label="state"
            fullWidth

            onChange={handleAddressState}

            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
          />
          <TextField
            label="postalCode"
            fullWidth

            onChange={handleAddressStatePostalCode}

            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
          />
          <TextField
            label="country"
            fullWidth

            onChange={handleAddressCountry}

            variant="outlined"
            sx={{
              marginBottom: '1rem',
            }}
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
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Book Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired,
};

export default BookingModal;
