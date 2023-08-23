import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import AddService from './AddService';
import ServiceCard from './ServiceCard';
import ImagePreview from '../common/ImagePreview';

const Services = () => {
    const [showDialog, setDialog] = useState({ name: "add-service", show: false })

    const columns = [
        { field: 'id', headerName: 'ID', },
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'photo', headerName: 'Pictures', flex: 1,
            renderCell: (params) => (
                <ImagePreview imageUrl={params.row?.photo} linkText={params.row?.proofType}></ImagePreview>
            )
        },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'charges', headerName: 'Charges', flex: 1 },
    ];

    const [services, setServices] = useState([
        {
            id: 1,
            name: "Tanki Repair",
            photo: "tanki repair",
            category: "Plumber",
            charges: "500"
        },
    ]);

    const handleServiceDataSubmit = (data = {}) => {
        if (data && Object.keys(data).length) {
            setServices([...services, data]);
        }
    }

    // const handleDeleteEmployee = (data = {}) => {
    //     console.log("delete data", data);
    // }

    // const handleEditEmployee = (data = {}) => {
    //     console.log("edit data", data);
    // }

    return (
        <article>
            <section>
                <Button onClick={() => { setDialog({ ...showDialog, show: true }) }}>+ Add Service</Button>
                <AddService
                    showDialog={showDialog}
                    setShowDialog={(value) => { setDialog({ ...showDialog, show: value }) }}
                    handleServiceDataSubmit={handleServiceDataSubmit}
                    rowId={services.length + 1}
                />
            </section>
            <section>
                <Grid container spacing={2}>
                    {services.map((service, serviceIndex) => (
                        <Grid key={"service-" + serviceIndex} item xs={12} sm={6} md={4} lg={3}>
                            <ServiceCard labels={columns} index={serviceIndex} data={service}></ServiceCard>
                        </Grid>
                    ))}
                </Grid>
            </section>
        </article >
    );
};

export default Services;