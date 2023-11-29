import { Button, Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddService from './AddService';
// import ServiceCard from './ServiceCard';
// import ImagePreview from '../common/ImagePreview';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import restClient from '../../../config/axios';
import './styles/services.module.scss';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [showDialog, setDialog] = useState({ name: 'add-service', show: false });
    const loggedInUser = useSelector(state => state.user.authUser);
    // const columns = [
    //     { field: 'id', headerName: 'ID', },
    //     { field: 'name', headerName: 'Name', flex: 1 },
    //     {
    //         field: 'photo', headerName: 'Pictures', flex: 1,
    //         renderCell: (params) => (
    //             <ImagePreview imageUrl={params.row?.photo} linkText={params.row?.proofType}></ImagePreview>
    //         )
    //     },
    //     { field: 'category', headerName: 'Category', flex: 1 },
    //     { field: 'charges', headerName: 'Charges', flex: 1 },
    // ];

    const [services, setServices] = useState([null]);

    const handleServiceDataSubmit = async (data = {}) => {
        if (data && Object.keys(data).length) {
            const apiUrl = '/api/vendor/addService/' + loggedInUser._id;
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('categories', JSON.stringify(data.categories));
            formData.append('charges', data.charges);
            for (const file of data.pictures) {
                formData.append('file', file);
            }
            if (data._id) {
                formData.append('_id', data._id);
            }
            const { data: response } = await restClient(apiUrl, {
                method: 'POST', data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response);
            setServices([...services, data]);
        }
    };

    const getMyServices = async () => {
        const apiUrl = '/api/vendor/services/' + loggedInUser._id;
        const { data } = await restClient(apiUrl);
        if (data.responseData) {
            setServices(data.responseData);
        }
    };

    useEffect(() => {
        getMyServices();
    }, []);

    return (
        <article>
            <section>
                <Button onClick={() => { setDialog({ ...showDialog, show: true }); }}>+ Add Service</Button>
                <AddService
                    showDialog={showDialog}
                    setShowDialog={(value) => { setDialog({ ...showDialog, show: value }); }}
                    handleServiceDataSubmit={handleServiceDataSubmit}
                    rowId={services.length + 1}
                />
            </section>
            <section>
                {<ServiceCards services={services}></ServiceCards>}
            </section>
        </article >
    );
};

export default Services;

const ServiceCards = (props) => {
    const { services = [{ image: 'https://le-cdn.hibuwebsites.com/4fbcba4ddf5f4d57ad1799560278d928/dms3rep/multi/opt/RSshutterstock_8610913-640w.jpg', name: 'Electrician' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwWCUeYSm3Audhz429cpIJU4O_ObA7vPGaw&usqp=CAU', name: 'Plumber' }], title = 'Your services' } = props;

    return (
        <article className='service-cards-view'>
            <h3 className='capitalize'>
                {!services.length ? 'No services found' : title}
            </h3>
            <Grid container spacing={2}>
                {services[0] === null ? Array.from({ length: 4 }, () => ({})).map(service => (
                    <Grid key={'service-' + service.name} item sm={3} className='pt-5 pb-5 pl-2 pr-2'>
                        <section className='card-block flex flex-col'>
                            <Skeleton variant='rectangular' className='image-cover-h100 flex-1' ></Skeleton>
                            <Skeleton variant='text' ></Skeleton>
                        </section>
                    </Grid>
                )) :
                    services?.map(service => (
                        <Grid key={'service-' + service.name} item sm={3} className='pt-5 pb-5 pl-2 pr-2'>
                            <ServiceCard service={service} />
                        </Grid>
                    ))
                }

            </Grid>
        </article>
    );
};

ServiceCards.propTypes = {
    services: PropTypes.array,
    title: PropTypes.string,
};