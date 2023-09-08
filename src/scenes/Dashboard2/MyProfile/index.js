import { Button, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddAddress from './AddAddress';
import AddTimeSlot from './AddTimeSlot';
import "./styles/myProfile.scss"
import { DatePicker } from '@mui/x-date-pickers';
import { FormControl } from '@mui/base';
import { useSelector } from 'react-redux';
// import { format } from 'date-fns';
// import Delete from '@mui/icons-material/Delete';

const MyProfile = () => {
    const loggedInUser = useSelector(state => state.user.authUser)

    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        openHours: [{}]
    })

    const [showDialog, setDialog] = useState({ name: "add-address", show: false })

    // const addressColumns = [
    //     { field: 'id', headerName: 'ID', },
    //     { field: 'address', headerName: 'Address', flex: 1 },
    //     { field: 'city', headerName: 'City', flex: 1 },
    //     { field: 'pinCode', headerName: 'Pin code', type: 'number', flex: 1 },
    //     { field: 'state', headerName: 'State', flex: 1 },
    //     { field: 'country', headerName: 'Country', flex: 1 }
    // ];

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "Shop 1",
            address: "Malviya Nagar",
            city: "New Delhi",
            pinCode: "012345",
            state: "Delhi",
            country: "India"
        },
    ]);

    // const timeSlotsColumns = [
    //     { field: 'id', headerName: 'ID', },
    //     { field: 'day', headerName: 'Address', flex: 1 },
    //     { field: 'from', headerName: 'City', flex: 1 },
    //     { field: 'to', headerName: 'Pin code', type: 'number', flex: 1 },
    // ];

    const [timeSlots, setTimeSlots] = useState([
        {
            id: 1,
            name: "Weekdays",
            days: ["Monday", "Tuesday", "Wednesday"],
            from: "10:00 AM",
            to: "05:00 PM"
        },
        {
            id: 2,
            name: "Weekend",
            days: ["Friday", "Saturday", "Sunday"],
            from: "10:00 AM",
            to: "02:00 PM"
        }
    ]);

    const handleAddressDataSubmit = (data = {}) => {
        if (data && Object.keys(data).length) {
            setAddresses([...addresses, data]);
        }
    }

    const handleTimeSlotDataSubmit = (data = {}) => {
        if (data && Object.keys(data).length) {
            setTimeSlots([...timeSlots, data]);
        }
    }

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const imagesArray = [];
        if (files) {
            Array.from(files).map(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    imagesArray.push(reader.result);
                    if (imagesArray.length === files.length) {
                        setSelectedImages(imagesArray);
                    }
                };
                reader.readAsDataURL(file);
            })
        }
    }

    const updateFormData = (data = {}) => {
        setFormData({ ...formData, ...data })
    }

    const handleFormChange = (e = {}) => {
        const { name, value } = e.target
        updateFormData({ [name]: value })
    }

    const handleEstablishedDateChange = (date) => {
        updateFormData({ establishedDate: date })
    }

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
            const { name, email } = loggedInUser
            updateFormData({
                name, email
            })
        }
    }, [loggedInUser])

    const phoneNumberRegex = /^[6-9]\d{9}$/;

    const validatePhone = () => {
        return phoneNumberRegex.test(formData?.phoneNo)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // const apiUrl = '/api/vendor'
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <section className='mb-4 dl-container'>
                <TextField label="Vendor Name" sx={{ marginBottom: "1rem", marginRight: '1rem' }} variant="outlined" name='name' value={formData.name} required onChange={handleFormChange} />
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
                        value={formData.workingAs}
                        onChange={handleFormChange}
                        row
                    >
                        <FormControlLabel value="vendor" control={<Radio />} label="Vendor" />
                        <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
                    </RadioGroup>
                </FormControl>

                <TextField label="Email ID" sx={{ marginBottom: "1rem", marginRight: '1rem' }} variant="outlined" name='email' type="email" value={formData.email} required onChange={handleFormChange} />
                <TextField label="Contact Number" sx={{ marginBottom: "1rem", marginRight: '1rem' }} variant="outlined" name='phoneNo'
                    error={!validatePhone()}
                    helperText={!validatePhone() && 'Invalid phone number'}
                    value={formData.phoneNo} required onChange={handleFormChange} />

                <section className='profile-images mb-4'>
                    <label htmlFor="images">
                        <Button variant="outlined" component="span">
                            Upload Profile Picture
                            <input
                                type="file"
                                accept="image/*"
                                id="images"
                                name='images'
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                                multiple
                            />
                        </Button>
                    </label>
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {selectedImages.map((image, imageIndex) => (
                            <ImageListItem key={"profile-image-" + imageIndex}>
                                <img
                                    src={image}
                                    alt={image.title || ""}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </section>
                <section>
                    <Button variant='outlined' onClick={handleFormSubmit}>Save</Button>
                </section>
            </section>
            <article className='address'>
                <section>
                    <Button onClick={() => { setDialog({ name: "add-address", show: true }) }}>+ Add Address</Button>
                    <AddAddress
                        showDialog={showDialog?.name === "add-address" ? showDialog : {}}
                        setShowDialog={(value) => { setDialog({ ...showDialog, show: value }) }}
                        handleAddressDataSubmit={handleAddressDataSubmit}
                        rowId={addresses.length + 1}
                    />
                </section>
                <section>
                    <dl >
                        <Grid container spacing={2}>
                            {addresses.map(({ name, address, pinCode, city, state, country }, addressIndex) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={"address-" + addressIndex}>
                                    <section className='dl-container'>
                                        <dt>{name}</dt>
                                        <dd>
                                            <section>
                                                {address}
                                            </section>
                                            <section>
                                                {`${pinCode}, ${city}, ${state}, ${country}`}
                                            </section>
                                        </dd>
                                    </section>
                                </Grid>
                            ))}
                        </Grid>
                    </dl>
                </section>
            </article>
            <article className='time-slots'>
                <section>
                    <Button onClick={() => { setDialog({ name: "add-time-slot", show: true }) }}>+ Add Time Slot</Button>
                    <AddTimeSlot
                        showDialog={showDialog?.name === "add-time-slot" ? showDialog : {}}
                        setShowDialog={(value) => { setDialog({ ...showDialog, show: value }) }}
                        handleTimeSlotDataSubmit={handleTimeSlotDataSubmit}
                        rowId={addresses.length + 1}
                    />
                </section>
                <section>
                    <dl>
                        <Grid container spacing={2}>
                            {timeSlots.map(({ name, days, from, to }, slotIndex) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={"slot-" + slotIndex}>
                                    <section className='dl-container' >
                                        <dt>{name}</dt>
                                        <dd>
                                            <section>
                                                {`${days}, `}
                                            </section>
                                            <section>
                                                {`${from} - ${to}`}
                                            </section>
                                        </dd>
                                    </section>
                                </Grid>
                            ))}
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