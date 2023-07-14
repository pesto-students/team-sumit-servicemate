import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import DynamicForm from '../../../components/DynamicForm';
import PropTypes from "prop-types"
import "./styles/vendorDashboard.scss"
import { Autocomplete, Button, Divider, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
// import EngineeringIcon from '@mui/icons-material/Engineering';
// import ButtonComponent from '../../../components/Buttons';

const VendorDashboard = (props) => {
    console.log("🚀 ~ file: index.js:12 ~ VendorDashboard ~ props:", props)
    // const { user } = props

    const [formData, setFormData] = useState({})

    const categories = [{ name: "Plumber" }, { name: "Carpenter" }, { name: "Electrician" }]

    const [timeSlots, setTimeSlots] = useState([{
        from: "",
        to: "",
        day: ""
    }])

    const timeSlotObject = {
        from: "",
        to: "",
        day: ""
    }

    const [addresses, setAddresses] = useState([{
        address: "abc"
    }])

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const [employeesData, setEmployeesData] = useState([{}])

    const idProofTypes = [{ name: "Aadhar Card" }, { name: "PAN Card" }, { name: "Voter ID" }
    ]

    const handleFormChange = (e = {}) => {
        const { name, value } = e.target || {}
        setFormData({ ...formData, [name]: value })
    }


    return (
        <article className='vendor-dashboard'>
            <form onSubmit={(e) => e.preventDefault()}>
                <TextField label="Service Name" variant="outlined" name='serviceName' required onChange={handleFormChange} />
                <Autocomplete multiple options={categories} getOptionLabel={(option) => option.name} renderInput={(params) => <TextField {...params} onChange={handleFormChange} label={"Categories"}></TextField>}></Autocomplete>
                <section>
                    <section className='open-hours-wrapper'>
                        <label>Open Hours</label>
                        {/* <Autocomplete options={locations} renderInput={(params) => <TextField {...params} onChange={handleFormChange} label={"Location"}></TextField>}></Autocomplete> */}
                        <section className='time-slots-wrapper'>
                            {addresses.map((address, addressIndex) => (
                                <section key={"address-" + (address.city || addressIndex)} className='flex flex-col gap-4 mb-2 time-slots app-flex-1-1-49'>
                                    <label>{"Address " + (addressIndex + 1)}</label>
                                    <TextField name='address' onChange={handleFormChange} label="Address"></TextField>
                                    <section>
                                        <TextField name='city' onChange={handleFormChange} label="City"></TextField>
                                        <TextField name='pinCode' onChange={handleFormChange} label="Pin code"></TextField>
                                    </section>
                                    <section>
                                        <TextField name='state' onChange={handleFormChange} label='State'></TextField>
                                        <TextField name='country' onChange={handleFormChange} label='Country'></TextField>
                                    </section>
                                </section>
                            ))}
                        </section>
                        <section className='mb-1'>
                            <Button variant='outlined' onClick={() => { setAddresses([...addresses, {}]) }}>+ Add Address</Button>
                        </section>
                        <section className='time-slots-wrapper'>
                            {
                                timeSlots.map((slot, slotIndex) => {
                                    return <section className='flex flex-col gap-4 mb-2 time-slots app-flex-1-1-33' key={"slot-" + slot}>
                                        <label>{"Slot " + (slotIndex + 1)}</label>
                                        <Autocomplete multiple options={addresses.map(el => el)} getOptionLabel={option => option.address || ''} renderInput={(params) => <TextField {...params} label="Location"></TextField>}></Autocomplete>
                                        <Autocomplete multiple options={days} onChange={handleFormChange} renderInput={(params) => <TextField {...params} label="Day"></TextField>}></Autocomplete>
                                        <section>
                                            <TimePicker label='From' onChange={handleFormChange}></TimePicker>
                                            <TimePicker label='To' onChange={handleFormChange}></TimePicker>
                                        </section>
                                    </section>
                                })
                            }
                        </section>
                        <Button variant='outlined' onClick={() => {
                            setTimeSlots([...timeSlots, timeSlotObject])
                        }}>+ Add Time</Button>
                    </section>
                    <Divider className='app-divider-1-z-25'></Divider>
                    <section className='emp-data open-hours-wrapper'>
                        {employeesData.map((employee, employeeIndex) => (
                            <section key={"employee-" + (employee.id || employeeIndex)} className="flex flex-col gap-4 mb-2 time-slots app-flex-1-1-33">
                                <TextField name='name' label="Employee Name" onChange={handleFormChange}></TextField>
                                <section className='emp-photo-upload flex items-center gap-4'>
                                    <Button variant="outlined" color="primary">
                                        Upload Employee Photo
                                    </Button>
                                    <input type="file" accept="image/*" onChange={(e) => { e.preventDefault() }} />
                                </section>
                                <Autocomplete options={idProofTypes} getOptionLabel={op => op.name} renderInput={(params) => <TextField {...params} label="Id Proof Type"></TextField>} ></Autocomplete>
                                <TextField name='name' label="ID Proof" onChange={handleFormChange}></TextField>
                                <section className='flex flex-col gap-4 mb-2 time-slots'>
                                    <TextField name='address' onChange={handleFormChange} label="Address"></TextField>
                                    <section >
                                        <TextField name='city' onChange={handleFormChange} label="City"></TextField>
                                        <TextField name='pinCode' onChange={handleFormChange} label="Pin code"></TextField>
                                    </section>
                                    <section>
                                        <TextField name='state' onChange={handleFormChange} label='State'></TextField>
                                        <TextField name='country' onChange={handleFormChange} label='Country'></TextField>
                                    </section>
                                </section>
                            </section>
                        ))}
                        <Button variant='outlined' onClick={() => {
                            setEmployeesData([...employeesData, {}])
                        }}>+ Add Employee</Button>
                    </section>
                </section>
                <section>
                    <Button variant='contained' type='submit'>Save</Button>
                </section>
            </form>
        </article>
    );
};

// const mapStateToProps = (state) => ({
//     user: state.register.user,
// })

export default VendorDashboard;

VendorDashboard.propTypes = {
    user: PropTypes.object,
}