import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { Autocomplete, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export default function AddEmployee({ showDialog, setShowDialog, handleEmployeeDataSubmit, rowId }) {
    const [open, setOpen] = React.useState(false);
    const [photo, setPhoto] = React.useState(null);
    const [employeeData, setEmployeeData] = React.useState({});
    console.log('🚀 ~ file: index.js:16 ~ AddEmployee ~ employeeData:', employeeData);

    const handleClose = () => {
        setShowDialog(false);
    };

    React.useEffect(() => {
        setOpen(showDialog.show);
    }, [showDialog.show]);

    const handleFormChange = (e, dropDownValue) => {
        const { name, value } = e && (dropDownValue ? { name: e.target.id && e.target.id.split('-')[0], value: dropDownValue.name } : e.target);
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleEmployeeImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDOBChange = (date) => {
        setEmployeeData({ ...employeeData, dob: date });
    };


    const idProofTypes = [{ name: 'Aadhar Card' }, { name: 'PAN Card' }, { name: 'Voter ID' }];
    const states = [{ name: 'Delhi' }, { name: 'Maharashtra' }, { name: 'Karnataka' }];
    const countries = [{ name: 'India' }];

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='subtitle2' sx={{ marginBottom: 1 }}> Add an employee details and assign for an services later.</Typography>
                    </DialogContentText>
                    <section key={'employee'} className="flex flex-col gap-4 mb-2 time-slots app-flex-1-1-33">
                        <TextField name='name' label="Employee Name" onChange={handleFormChange}></TextField>
                        <section className='emp-photo-upload flex items-center gap-4'>
                            <section className='emp-photo'>
                                <label htmlFor={'emp-photo'}>
                                    <Button variant="outlined" component="span">
                                        Upload Employee Photo
                                        <input type="file" style={{ display: 'none' }} id={'emp-photo'} name='photo'
                                            accept="image/*"
                                            onChange={handleEmployeeImageUpload}
                                        />
                                    </Button>
                                </label>
                                {photo && (
                                    <section>
                                        <h2>Photo Preview:</h2>
                                        <img src={photo} alt="Photo Preview" style={{ width: '100%', maxHeight: 120, objectFit: 'contain' }} />
                                    </section>
                                )}
                            </section>
                        </section>
                        <DatePicker
                            label="Establishment Date"
                            value={employeeData.dob}
                            onChange={date => handleDOBChange(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Autocomplete options={idProofTypes} getOptionLabel={op => op.name} id='proofType' onChange={handleFormChange} renderInput={(params) =>
                            <TextField {...params} label="Id Proof Type"></TextField>} >
                        </Autocomplete>
                        <TextField name='idProof' label="ID Proof" onChange={handleFormChange}></TextField>
                        <section className='flex flex-col gap-4 mb-2 time-slots'>
                            <TextField name='address' onChange={handleFormChange} label="Address"></TextField>
                            <section >
                                <TextField name='city' onChange={handleFormChange} label="City"></TextField>
                                <TextField name='pinCode' size='small' onChange={handleFormChange} label="Pin code"></TextField>
                            </section>
                            <Autocomplete options={states} getOptionLabel={op => op.name}
                                onChange={handleFormChange} id='state'
                                renderInput={(params) => <TextField {...params} label={'State'}></TextField>} ></Autocomplete>
                            <Autocomplete options={countries} getOptionLabel={op => op.name}
                                onChange={handleFormChange} id='country'
                                renderInput={(params) => <TextField {...params} label={'Country'}></TextField>} ></Autocomplete>
                        </section>
                    </section>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        variant='outlined'
                        onClick={() => {
                            handleEmployeeDataSubmit({ ...employeeData, photo, id: rowId });
                            handleClose();
                        }}
                        disabled={!employeeData.name}
                    >+ Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AddEmployee.propTypes = {
    showDialog: PropTypes.object,
    setShowDialog: PropTypes.func,
    handleEmployeeDataSubmit: PropTypes.func,
    rowId: PropTypes.number,
};