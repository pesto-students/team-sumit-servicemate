import React, { useEffect, useState } from 'react';
import Category from './components/Category';
import TableData from '../Dashboard2/AppointmentList/TableData';
import { useSelector } from 'react-redux';
import restClient from '../../config/axios';

const AdminDashboard = () => {
    return (
        <div>
            <Category></Category>
            <VendorManagement></VendorManagement>
        </div>
    );
};

export default AdminDashboard;

const VendorManagement = () => {

    const loggedInUser = useSelector(state => state.user.authUser);

    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        getAllVendors();
    }, []);

    const getAllVendors = async () => {
        const { data } = await restClient(`/api/vendor/${loggedInUser._id}/allVendors`);
        if (data.responseData) {
            setVendorList(data.responseData);
        }
    };

    const columns = [{ name: 'Name' }, { name: 'Email Id' }, { name: 'Address' }, { name: 'Mobile' }, { name: 'Status' }, { name: 'Action' }];
    const rows = vendorList.map(({ serviceProviderName, email, addresses, phoneNo, vendorStatus }) => ([serviceProviderName, email, Object.values(addresses).join(', '), phoneNo, vendorStatus]));
    const actions = [
        {
            label: 'Mark Active',
            handler: (row, rowIndex, e) => {
                console.log('row,rowIndex,e', row, rowIndex, e);
                handleVendorStatus(vendorList[rowIndex], rowIndex, e, 'active');
            }
        },
        {
            label: 'Mark Inactive',
            handler: (row, rowIndex, e) => {
                handleVendorStatus(vendorList[rowIndex], rowIndex, e, 'active');
            }
        },
        {
            label: 'Reject',
            handler: (row, rowIndex, e) => {
                handleVendorStatus(vendorList[rowIndex], rowIndex, e, 'active');
            }
        }
    ];

    const handleVendorStatus = async (row, rowIndex, e, status = 'inactive') => {
        const apiUrl = `/api/vendor/updateVendorStatus/${loggedInUser._id}`;
        const payload = {
            id: row._id,
            status: status
        };
        const { data } = await restClient(apiUrl, {
            method: 'PUT', data: JSON.stringify(payload), headers: { 'Content-Type': 'application/json', }
        });
        if (data.responseData) {
            getAllVendors();
        }
    };

    return (
        <>
            <h3>Vendor Management</h3>
            <div>
                <TableData columns={columns} rows={rows} actions={actions} ></TableData>
            </div>
        </>
    );
};