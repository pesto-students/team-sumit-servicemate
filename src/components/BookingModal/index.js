import React, { useState } from "react";
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
  Typography,
  
  //  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import restClient from "../../config/axios";
//import { useParams } from "react-router-dom";

const BookingModal = ({ isOpen, onClose, vendor }) => {
  console.log(vendor)
  //  const { email } = useParams();
  //  const collectivedata = useSelector((state) => state.collectiveData.fulldata);
  const loggedInUser = useSelector((state) => state.user.authUser)
   console.log("lop" + loggedInUser?.address?.address?.street)
  const [date, setDate] = useState("");
  //const [services, setServices] = useState("");
 // const [address, setAddress] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [alertMessage, setAlertMessage] = useState("");


  const serviceProviderId = vendor.id;
  const appointmentDate = date;
  const service =vendor.service;
  const time = appointmentDate



  const handleDateChange = (event) => {
    setDate(event.target.value);

  };
  const handleTimeslotChange = (event) => {
    setTimeslot(event.target.value); // Update timeslot state when the user selects a time slot
  };
  // const handleAddressChange = (event) => {
  //   setAddress(event.target.value);
  //   console.log(address)

  // };

  // const handleServicesChange = () => {
  //   setServices(service);

  // };
  // console.log("userAddress:", userAddress.street);
  // const filteredData = collectivedata.filter(
  //   (item) => item.serviceProviderId?.serviceProviderEmalId === email
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
          "content-type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },

      };


      const { appointment } = await restClient.post("/api/user/appointment", { serviceProviderId, service, appointmentDate, time }, config);
      if (appointment) {
        setAlertMessage("Appointment Booked!"); // Set success message
      }
      onClose();
    } catch (error) {
      setAlertMessage("Appointment not Booked!");
      console.log(error)
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }} >Book Appointment </DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: "20px" }}>
          {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
        </div>
        <TextField
          label="ServiceProvider Name"
          value={vendor.vendorName}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />

        <TextField
          label="Date"

          //   value={date}
          onChange={handleDateChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />


        <TextField
          type="time"
        onChange={handleTimeslotChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        > {timeslot} </TextField>
         
<Box sx={{
        marginBottom: "1rem",
        border: "1px solid #ccc", // Add border style here
        borderRadius: "4px", // Optional: Add border radius for rounded corners
        padding: "0.5rem", // Optional: Add padding for spacing
      }}>
      <Typography variant="h7">Address</Typography>
      <TextField
        label="street"
        fullWidth
        variant="outlined"
        sx={{
          marginBottom: '1rem',
        }}
      />
      
      <TextField
        label="city"
        fullWidth
        variant="outlined"
        sx={{
          marginBottom: '1rem',
        }}
      />
      <TextField
        label="state"
        fullWidth
        variant="outlined"
        sx={{
          marginBottom: '1rem',
        }}
      />
      <TextField
        label="postalCode"
        fullWidth
        variant="outlined"
        sx={{
          marginBottom: '1rem',
        }}
      />
      <TextField
        label="country"
        fullWidth
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
          sx={{ marginBottom: "1rem" }}
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
