import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import PropTypes from "prop-types";

const BookingModal = ({ isOpen, onClose }) => {
  const handleSubmit = () => {};

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <TextField
          label="Date"
          type="date"
          //   value={date}
          //   onChange={handleDateChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Time Slot"
          //   value={timeSlot}
          //   onChange={handleTimeSlotChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Address"
          //   value={address}
          //   onChange={handleAddressChange}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextareaAutosize
          label="Address"
          //   value={notes}
          //   onChange={handleNotesChange}
          placeholder="Address"
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
};

export default BookingModal;
