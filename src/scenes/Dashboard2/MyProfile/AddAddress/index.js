import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import DynamicSearch from '../../Employees/DyanmicSearch';
import restClient from '../../../../config/axios';
import { sanitizePayload } from '../../../../store/utils';

const AddAddress = ({ showDialog, setShowDialog, handleAddressDataSubmit, }) => {
    const { mode = 'add', data, dataIndex } = showDialog || {};
    console.log('🚀 ~ file: index.js:7 ~ AddAddress ~ dataIndex:', dataIndex);
    const [addressData, setAddressData] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setShowDialog(false);
    };

    React.useEffect(() => {
        setOpen(showDialog.show);
    }, [showDialog.show]);

    const handleFormChange = (e, dropDownValue) => {
        const { name, value } = e && (dropDownValue ? { name: e?.target.id?.split('-')[0], value: dropDownValue.name } : e.target);
        setAddressData({ ...addressData, [name]: value });
    };

    // const states = [{ name: 'Delhi' }, { name: 'Maharashtra' }, { name: 'Karnataka' }];
    // const countries = [{ name: 'India' }];

    useEffect(() => {
        if (mode === 'edit' && data) {
            setAddressData(data);
        }
    }, [data, mode]);

    const [selectedAddress, setSelectedAddress] = React.useState(null);
    const [addresses, setAddresses] = useState([]);

    const handleAddressSearch = async (query) => {
        if (query) {
            const apiUrl = '/api/location?q=' + query;
            const { data } = await restClient(apiUrl);
            if (data?.responseData) {
                setAddresses(data.responseData);
            }
        }
    };

    const handleSetSelectedAddress = (data) => {
        const { address_line1, address_line2, city, postcode, state, country, lat, lon, formatted } = data || {};
        const newAddressData = {
            addressLine1: address_line1,
            addressLine2: address_line2,
            pinCode: postcode,
            city, state, country, lat, lon, formatted
        };
        setAddressData({ ...addressData, ...sanitizePayload(newAddressData) });
        setSelectedAddress(data);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='subtitle2' sx={{ marginBottom: 1 }}> Add an address details to display on the portal.</Typography>
                    </DialogContentText>
                    <section key={'service'} className="flex flex-col gap-4 mb-2 time-slots app-flex-1-1-33">
                        <TextField name='name' label="Name" value={addressData.name} onChange={handleFormChange}></TextField>
                        <DynamicSearch selectedValue={selectedAddress} setSelectedValue={handleSetSelectedAddress} handleSearch={handleAddressSearch} data={addresses}
                            optionLabel='formatted' label='Search Address' freeSolo></DynamicSearch>
                        <section className='flex flex-col gap-4 mb-2 time-slots'>
                            <TextField name='addressLine1' value={addressData.addressLine1} InputLabelProps={{ shrink: addressData.addressLine1 }} multiline
                                onChange={handleFormChange} label="Address Line 1"></TextField>
                            <TextField name='addressLine2' value={addressData.addressLine2} InputLabelProps={{ shrink: addressData.addressLine2 }} multiline
                                onChange={handleFormChange} label="Address Line 2"></TextField>
                            <section >
                                <TextField name='city' value={addressData.city} InputLabelProps={{ shrink: addressData.city }} onChange={handleFormChange} label="City"></TextField>
                                <TextField name='pinCode' value={addressData.pinCode} InputLabelProps={{ shrink: addressData.pinCode }} size='small' onChange={handleFormChange} label="Pin code"></TextField>
                            </section>
                            <TextField name='state' value={addressData.state} InputLabelProps={{ shrink: addressData.state }} onChange={handleFormChange} label="State"></TextField>
                            <TextField name='country' value={addressData.country} InputLabelProps={{ shrink: addressData.country }} onChange={handleFormChange} label="Country"></TextField>

                            {/* <Autocomplete options={states} getOptionLabel={op => op.name}
                                onChange={handleFormChange} id='state'
                                value={states.find(s => s?.name?.toLowerCase() === addressData?.state?.toLowerCase())}
                                renderInput={(params) => <TextField {...params} label={'State'} ></TextField>} freeSolo >
                            </Autocomplete>
                            <Autocomplete options={countries} getOptionLabel={op => op.name}
                                onChange={handleFormChange} id='country'
                                value={useMemo(() => countries.find(c => c?.name?.toLocaleLowerCase() === addressData?.country?.toLowerCase()), addressData.country)}
                                renderInput={(params) => <TextField {...params} label={'Country'} ></TextField>}
                            >
                            </Autocomplete> */}
                        </section>
                    </section>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleAddressDataSubmit({ ...addressData });
                        handleClose();
                    }}
                        disabled={!addressData.name}
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
    mode: PropTypes.string,
    data: PropTypes.object,
    dataIndex: PropTypes.number,
};