import { Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddAddress from './AddAddress';
import AddTimeSlot from './AddTimeSlot';
import './styles/myProfile.scss';
import { DatePicker } from '@mui/x-date-pickers';
import { FormControl } from '@mui/base';
import { useSelector } from 'react-redux';
// import { format } from 'date-fns';
// import Delete from '@mui/icons-material/Delete';
import restClient from '../../../config/axios';
import ImageUpload from '../common/ImageUpload';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../Login/actions';

const MyProfile = () => {
    const loggedInUser = useSelector(state => state.user.authUser);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        openHours: [{}]
    });

    const [showDialog, setDialog] = useState({ name: 'manage-address', show: false });

    // const addressColumns = [
    //     { field: 'id', headerName: 'ID', },
    //     { field: 'address', headerName: 'Address', flex: 1 },
    //     { field: 'city', headerName: 'City', flex: 1 },
    //     { field: 'pinCode', headerName: 'Pin code', type: 'number', flex: 1 },
    //     { field: 'state', headerName: 'State', flex: 1 },
    //     { field: 'country', headerName: 'Country', flex: 1 }
    // ];

    // const [addresses, setAddresses] = useState([
    //     {
    //         id: 1,
    //         name: 'Shop 1',
    //         street: 'Malviya Nagar',
    //         city: 'New Delhi',
    //         pinCode: '012345',
    //         state: 'Delhi',
    //         country: 'India'
    //     },
    // ]);

    // const timeSlotsColumns = [
    //     { field: 'id', headerName: 'ID', },
    //     { field: 'day', headerName: 'Address', flex: 1 },
    //     { field: 'from', headerName: 'City', flex: 1 },
    //     { field: 'to', headerName: 'Pin code', type: 'number', flex: 1 },
    // ];

    // const [timeSlots, setTimeSlots] = useState([
    //     {
    //         id: 1,
    //         name: 'Weekdays',
    //         days: ['Monday', 'Tuesday', 'Wednesday'],
    //         from: '10:00 AM',
    //         to: '05:00 PM'
    //     },
    //     {
    //         id: 2,
    //         name: 'Weekend',
    //         days: ['Friday', 'Saturday', 'Sunday'],
    //         from: '10:00 AM',
    //         to: '02:00 PM'
    //     }
    // ]);

    const handleAddressDataSubmit = async (data = {}) => {
        if (data && Object.keys(data).length) {
            // setAddresses([...addresses, data]);
            const apiUrl = '/api/vendor/updateLocation/' + loggedInUser._id;
            const { data: response } = await restClient(apiUrl, { method: 'PUT', data });
            if (response?.responseData) {
                updateFormData(response.responseData);
            }
        }
    };

    const handleTimeSlotDataSubmit = async (data = {}) => {
        if (data && Object.keys(data).length) {
            // setTimeSlots([...timeSlots, data]);
            const apiUrl = '/api/vendor/updateTimeSlot/' + loggedInUser._id;
            const { data: response } = await restClient(apiUrl, { method: 'PUT', data });
            if (response?.responseData) {
                updateFormData(response.responseData);
            }
        }
    };

    // const handleImageUpload = (e) => {
    //     e.preventDefault();

    //     const reader = new FileReader();
    //     const file = e.target.files[0];

    //     reader.onloadend = () => {
    //         this.setState({
    //             imagePreview: reader.result,
    //         });
    //         updateFormData([e.target.id]: file)
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // }

    const updateFormData = (data = {}) => {
        setFormData({ ...formData, ...data });
    };

    const handleFormChange = (e = {}) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleEstablishedDateChange = (date) => {
        updateFormData({ establishedDate: date });
    };

    // const handleOpenHours = (index, e, value) => {
    //     const [name, field] = e.target.id.split("-")
    //     if (name && field) {
    //         const newOpenHours = [...formData[name]]
    //         newOpenHours[index] = newOpenHours[0] ? { ...newOpenHours[0], [field]: Array.isArray(value) ? value : value } : { [field]: Array.isArray(value) ? value : value }
    //         updateFormData({ [name]: newOpenHours })
    //     }
    // }

    useEffect(() => {
        if (loggedInUser) {
            updateFormData({ ...loggedInUser });
        }
    }, [loggedInUser]);

    const phoneNumberRegex = /^[6-9]\d{9}$/;

    const validatePhone = () => {
        return !formData?.phoneNo || phoneNumberRegex.test(formData?.phoneNo);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = '/api/vendor/updateVendorProfile/' + loggedInUser._id + '?v=' + loggedInUser?.isVendor;
        const payload = {
            name: formData.name,
            workingAs: formData.workingAs,
            email: formData.email,
            phoneNo: formData.phoneNo,
            profilePic: formData.profilePic,
        };
        const newFormData = new FormData();
        Object.keys(payload).map(key => {
            newFormData.append(key, payload[key]);
        });
        const { data } = await restClient(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: newFormData
        });
        if (data.responseData) {
            dispatch(setLoggedInUser(data.responseData));
        }
    };

    const getProfileDetails = async () => {
        const apiUrl = '/api/vendor/myProfile/' + loggedInUser._id;
        const { data } = await restClient(apiUrl);
        if (data.responseData) {
            updateFormData(data.responseData);
        }
    };

    useEffect(() => {
        getProfileDetails();
    }, []);

    const handleDeleteAddress = async ({ _id }) => {
        if (_id) {
            const apiUrl = '/api/vendor/' + loggedInUser._id + '/deleteAddress/' + _id;
            const { data } = await restClient(apiUrl, { method: 'DELETE' });
            if (data.responseData) {
                updateFormData(data.responseData);
            }
        }
    };

    const handleDeleteTimeSlot = async ({ _id }) => {
        if (_id) {
            const apiUrl = '/api/vendor/' + loggedInUser._id + '/deleteTimeSlot/' + _id;
            const { data } = await restClient(apiUrl, { method: 'DELETE' });
            if (data.responseData) {
                updateFormData(data.responseData);
            }
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <section className='mb-4 dl-container'>
                <Grid container>
                    <Grid item sm={6}>
                        <TextField label="Vendor Name" sx={{ marginBottom: '1rem', marginRight: '1rem' }} variant="outlined" name='name' value={formData.name} required onChange={handleFormChange} />
                        <DatePicker
                            label="Establishment Date"
                            value={formData.establishedDate}
                            onChange={date => handleEstablishedDateChange(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <FormControl className='flex items-center gap-4 mb-4'>
                            <FormLabel id="radio-buttons-group">Working as</FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-buttons-group"
                                name="workingAs"
                                value={formData?.workingAs || 'vendor'}
                                onChange={handleFormChange}
                                row
                            >
                                <FormControlLabel value="vendor" control={<Radio />} label="Vendor" />
                                <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
                            </RadioGroup>
                        </FormControl>

                        <TextField label="Email ID" sx={{ marginBottom: '1rem', marginRight: '1rem' }} variant="outlined" name='email' type="email" value={formData.email} required onChange={handleFormChange} />
                        <TextField label="Contact Number" sx={{ marginBottom: '1rem', marginRight: '1rem' }} variant="outlined" name='phoneNo'
                            error={!validatePhone()}
                            helperText={!validatePhone() && 'Invalid phone number'}
                            value={formData.phoneNo} required onChange={handleFormChange} />
                    </Grid>
                    <Grid>
                        <ImageUpload handleImageUpload={(data = {}) => updateFormData(data)} image={formData.profilePic} id={'profilePic'} name='profilePic' alt ></ImageUpload>
                    </Grid>
                </Grid>
                <Button variant='outlined' onClick={handleFormSubmit}>Save</Button>
            </section>
            <article className='address'>
                <section>
                    <Button onClick={() => { setDialog({ name: 'manage-address', show: true }); }}>+ Add Address</Button>
                    <AddAddress
                        showDialog={showDialog?.name === 'manage-address' ? showDialog : {}}
                        setShowDialog={(value) => { setDialog({ ...showDialog, show: value }); }}
                        handleAddressDataSubmit={handleAddressDataSubmit}
                        rowId={formData?.location?.length + 1}
                    />
                </section>
                <section>
                    <dl >
                        <Grid container spacing={2}>
                            {formData?.location?.map((addressItem, addressIndex) => {
                                const { name, street, pinCode, city, state, country } = addressItem;
                                return (<Grid item xs={12} sm={6} md={4} lg={3} key={'address-' + addressIndex}>
                                    <section className='dl-container relative'>
                                        <dt>{name}</dt>
                                        <dd>
                                            <section>
                                                {street}
                                            </section>
                                            <section>
                                                {`${pinCode}, ${city}, ${state}, ${country}`}
                                            </section>
                                        </dd>
                                        <div className='absolute top-4 right-4'>
                                            <span className='underline text-xs font-bold cursor-pointer mr-1' onClick={() => {
                                                setDialog({ name: 'manage-address', show: true, mode: 'edit', data: addressItem, dataIndex: addressIndex });
                                            }}>
                                                Edit
                                            </span >
                                            <span className='underline text-xs font-bold cursor-pointer' onClick={handleDeleteAddress.bind(this, addressItem)}>
                                                Delete
                                            </span>
                                        </div>
                                    </section>
                                </Grid>);
                            })}
                        </Grid>
                    </dl>
                </section>
            </article>
            <article className='time-slots'>
                <section>
                    <Button onClick={() => { setDialog({ name: 'manage-time-slot', show: true }); }}>+ Add Time Slot</Button>
                    <AddTimeSlot
                        showDialog={showDialog?.name === 'manage-time-slot' ? showDialog : {}}
                        setShowDialog={(value) => { setDialog({ ...showDialog, show: value }); }}
                        handleTimeSlotDataSubmit={handleTimeSlotDataSubmit}
                        rowId={formData?.openHours?.length + 1}
                    />
                </section>
                <section>
                    <dl>
                        <Grid container spacing={2}>
                            {formData?.openHours?.map((timeSlotItem, slotIndex) => {
                                const { name, days, from, to } = timeSlotItem;
                                return (<Grid item xs={12} sm={6} md={4} lg={3} key={'slot-' + slotIndex}>
                                    <section className='dl-container relative' >
                                        <dt>{name}</dt>
                                        <dd>
                                            <section>
                                                {`${days}, `}
                                            </section>
                                            <section>
                                                {`${from} - ${to}`}
                                            </section>
                                        </dd>
                                        <div className='absolute top-4 right-4'>
                                            <span className='underline text-xs font-bold cursor-pointer mr-1' onClick={() => {
                                                setDialog({ name: 'manage-time-slot', show: true, mode: 'edit', data: timeSlotItem, dataIndex: slotIndex });
                                            }}>
                                                Edit
                                            </span>
                                            <span className='underline text-xs font-bold cursor-pointer ' onClick={handleDeleteTimeSlot.bind(this, timeSlotItem)}>
                                                Delete
                                            </span>
                                        </div>
                                    </section>
                                </Grid>);
                            })}
                        </Grid>
                    </dl>
                </section>
            </article>
            {/* <article className='border border-gray-300 border-solid rounded-2xl p-4'>
                <section className='mb-4'>
                    <label>Open hours</label>
                </section>
                <Grid container spacing={2}>
                    {formData?.openHours?.map((openHour, openHourIndex) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={"open-hours-" + openHour.id}>
                            <section className='flex gap-1 mb-4 items-center'>
                                <Autocomplete fullWidth options={addresses} id="openHours-address" getOptionLabel={option => option.name} onChange={handleOpenHours.bind(openHourIndex)}
                                    renderInput={(params) => <TextField {...params} label="Location"></TextField>}></Autocomplete>
                                <Autocomplete fullWidth multiple options={timeSlots} id="openHours-timeSlot" getOptionLabel={option => option.name} onChange={handleOpenHours.bind(openHourIndex)}
                                    renderInput={(params) => <TextField {...params} label="Time slot"></TextField>}></Autocomplete>
                                <IconButton sx={{ visibility: openHourIndex <= 0 && "hidden" }} onClick={() => {
                                    updateFormData({ openHours: formData.openHours.filter((openH, openHIndex) => openHIndex !== openHourIndex) })
                                }}>
                                    <Delete ></Delete>
                                </IconButton>
                            </section>
                        </Grid>
                    ))
                    }
                </Grid>
                <section>
                    <Button onClick={() => updateFormData({ openHours: [...formData.openHours, {}] })}>+ Add Open hours</Button>
                </section>
                <section>
                    <Button variant='outlined'>Save</Button>
                </section>
            </article> */}
        </form>
    );
};

export default MyProfile;