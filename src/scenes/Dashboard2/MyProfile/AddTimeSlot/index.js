import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format, isValid } from 'date-fns';

const AddTimeSlot = ({ showDialog, setShowDialog, handleTimeSlotDataSubmit, rowId }) => {
    const [formData, setFormData] = React.useState({})
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setShowDialog(false);
    };

    React.useEffect(() => {
        setOpen(showDialog.show)
    }, [showDialog.show])

    const handleFormChange = (e, dropDownValue) => {
        const { name, value } = e && (dropDownValue ? { name: e?.target?.id?.split("-")[0], value: Array.isArray(dropDownValue) ? dropDownValue : dropDownValue.name } : e.target)
        setFormData({ ...formData, [name]: value })
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const handleTimePickerChange = (time, err, name) => {
        if (isValid(time)) {
            setFormData({ ...formData, [name]: format(time, "p") })
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Time Slot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='subtitle2' sx={{ marginBottom: 1 }}> Add a time slot that can be mapped with location.</Typography>
                    </DialogContentText>
                    <section key={"service"} className="flex flex-col gap-4 mb-2 time-slots app-flex-1-1-33">
                        <TextField name='name' label="Name" onChange={handleFormChange}></TextField>
                        <Autocomplete id="days" multiple options={days} onChange={handleFormChange} renderInput={(params) => <TextField {...params} label="Days"></TextField>}></Autocomplete>
                        <section>
                            <TimePicker value={formData.from} id="from" label='From' onChange={(time, err) => handleTimePickerChange(time, err, "from")}></TimePicker>
                            <TimePicker value={formData.to} id="to" label='To' onChange={(time, err) => handleTimePickerChange(time, err, "to")}></TimePicker>
                        </section>
                    </section>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={() => {
                        handleTimeSlotDataSubmit({ ...formData, id: rowId })
                        handleClose()
                    }}
                        disabled={!formData.name}
                    >+ Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTimeSlot;

AddTimeSlot.propTypes = {
    showDialog: PropTypes.object,
    setShowDialog: PropTypes.func,
    handleTimeSlotDataSubmit: PropTypes.func,
    rowId: PropTypes.number,
}