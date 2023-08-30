import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';

const AddAddress = ({ showDialog, setShowDialog, handleAddressDataSubmit, rowId }) => {
    const [serviceData, setServiceData] = React.useState({})
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setShowDialog(false);
    };

    React.useEffect(() => {
        setOpen(showDialog.show)
    }, [showDialog.show])

    const handleFormChange = (e, dropDownValue) => {
        const { name, value } = e && (dropDownValue ? { name: e?.target.id?.split("-")[0], value: dropDownValue.name } : e.target)
        setServiceData({ ...serviceData, [name]: value })
    }

    const states = [{ name: "Delhi" }, { name: "Maharashtra" }, { name: "Karnataka" }]
    const countries = [{ name: "India" }]

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='subtitle2' sx={{ marginBottom: 1 }}> Add an address details to display on the portal.</Typography>
                    </DialogContentText>
                    <section key={"service"} className="flex flex-col gap-4 mb-2 time-slots app-flex-1-1-33">
                        <TextField name='name' label="Name" onChange={handleFormChange}></TextField>
                        <section className='flex flex-col gap-4 mb-2 time-slots'>
                            <TextField name='address' onChange={handleFormChange} label="Address"></TextField>
                            <section >
                                <TextField name='city' onChange={handleFormChange} label="City"></TextField>
                                <TextField name='pinCode' size='small' onChange={handleFormChange} label="Pin code"></TextField>
                            </section>
                            <Autocomplete options={states} getOptionLabel={op => op.name}
                                onChange={handleFormChange} id='state'
                                renderInput={(params) => <TextField {...params} label={"State"}></TextField>} ></Autocomplete>
                            <Autocomplete options={countries} getOptionLabel={op => op.name}
                                onChange={handleFormChange} id='country'
                                renderInput={(params) => <TextField {...params} label={"Country"}></TextField>} ></Autocomplete>
                        </section>
                    </section>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleAddressDataSubmit({ ...serviceData, id: rowId })
                        handleClose()
                    }}
                        disabled={!serviceData.name}
                        variant='outlined'
                    >+ Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddAddress;

AddAddress.propTypes = {
    showDialog: PropTypes.object,
    setShowDialog: PropTypes.func,
    handleAddressDataSubmit: PropTypes.func,
    rowId: PropTypes.number,
}