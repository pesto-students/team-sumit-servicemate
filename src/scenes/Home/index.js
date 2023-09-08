import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom'
import { data } from '../../config/db'
import routeConstant from '../../config/routeConstant'
import { connect, } from 'react-redux';
import { someAction } from './actions';
import PropTypes from "prop-types";
import { Grid, Icon, Rating, Skeleton, Stack, } from '@mui/material';
import Slider from "react-slick";

import PaymentsIcon from '@mui/icons-material/Payments';
import ChatIcon from '@mui/icons-material/Chat';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import "./styles/home.scss"
import restClient from '../../config/axios';

const Home = (props) => {
    const { someData, dispatchSomeAction } = props
    const [topCategories, setTopCategories] = useState([])
    const [vendorsByTopCategories, setVendorsByTopCategories] = useState([])
    console.log("someData", someData)

    useEffect(() => {
        dispatchSomeAction()
        getTopCategories()
        getVendorsByTopCategories()
    }, [])

    const getTopCategories = async () => {
        const apiUrl = '/api/categories/topCategories'
        const { data } = await restClient(apiUrl)
        if (data && data.length) {
            setTopCategories(data)
        }
    }

    const getVendorsByTopCategories = async () => {
        const apiUrl = '/api/vendor/vendorsByTopCategories'
        const { data } = await restClient(apiUrl)
        if (data && data.length) {
            setVendorsByTopCategories(data)
        }
    }

    return (
        <>
            <article className='mt-10 mb-10 pl-10 pr-10'>
                <Grid container sx={{ height: "28rem" }} spacing={2}>
                    <Grid item sm={8} sx={{ height: '100%' }}>
                        <section style={{ height: "100%" }}>
                            <img width="100%" className='image-cover-h100' alt='large pic' src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/house-repair-service-banner-ad-design-template-c0567315ddd96c8e4ad2a1dac671b9c8_screen.jpg?ts=1655367804"></img>
                        </section>
                    </Grid>
                    <Grid item xs={4} sx={{ height: '100%' }}>
                        <Stack spacing={2} sx={{ height: "100%" }} >
                            <section style={{ height: 'calc(50% - 8px)' }} className='flex-1'>
                                <img width="100%" className='image-cover-h100' alt='pic 1' src='https://img.freepik.com/free-psd/professional-plumbers-job-banner-template_23-2148709811.jpg?q=10&h=200'></img>
                            </section>
                            <section style={{ height: 'calc(50% - 8px)' }} className='flex-1'>
                                <img width="100%" className='image-cover-h100' alt='pic 2' src='https://img.freepik.com/free-psd/electrical-services-banner-style_23-2148652457.jpg'></img>
                            </section>
                        </Stack>
                    </Grid>
                </Grid>

            </article>
            <article className='features'>
                <Grid container>
                    {[{ icon: <PaymentsIcon></PaymentsIcon>, title: "Secure Payment", description: "100% secure payment" },
                    { icon: <ChatIcon />, title: "24/7 Support", description: "Dedicated support" },
                    { icon: <BookOnlineIcon></BookOnlineIcon>, title: "Easy Booking", description: "Book appointment with one click" }
                    ].map(feature => (
                        <Grid item alignItems="center" sm={4} key={"feature-" + feature.title}>
                            <section style={{ width: "2.5rem", height: "2.5rem" }}>
                                {/* <img className="image-cover-h100" alt={feature.title} src={feature.icon} /> */}
                                <Icon sx={{ width: "2.5rem", height: "2.5rem" }} className="image-cover-h100">{feature.icon}</Icon>
                            </section>
                            <section>
                                <section>
                                    <strong>
                                        {feature.title}
                                    </strong>
                                </section>
                                <section>
                                    {feature.description}
                                </section>
                            </section>
                        </Grid>
                    ))}
                </Grid>
            </article>
            <CategoryView categories={topCategories}></CategoryView>
            {
                vendorsByTopCategories.map(vendor => {
                    return <CategoryItemListing key={"vendor-" + vendor.title} title={vendor.title} categoryItems={vendor.data}></CategoryItemListing>
                })
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        someData: state.someData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSomeAction: () => dispatch(someAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

Home.propTypes = {
    someData: PropTypes.object,
    dispatchSomeAction: PropTypes.func,
}

export const CategoryView = (props) => {
    const { categories = [{ image: "https://le-cdn.hibuwebsites.com/4fbcba4ddf5f4d57ad1799560278d928/dms3rep/multi/opt/RSshutterstock_8610913-640w.jpg", name: "Electrician" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwWCUeYSm3Audhz429cpIJU4O_ObA7vPGaw&usqp=CAU", name: "Plumber" }], title = 'Top categories' } = props;
    const navigate = useNavigate()

    return (
        <article className='category-view'>
            <h3 className='capitalize'>
                {title}
            </h3>
            <Grid container spacing={2}>
                {categories.map(category => (
                    <Grid key={"category-" + category.name} item sm={3} className='pt-5 pb-5 pl-2 pr-2'>
                        <section className='card-block flex flex-col' onClick={() => { navigate("/services/" + category.value) }}>
                            <img className='image-cover-h100 flex-1' loading='lazy' src={category.image} alt={category.name} ></img>
                            <p><strong>{category.name}</strong></p>

                        </section>
                    </Grid>
                ))
                }
                {!categories.length && Array.from({ length: 4 }, () => ({})).map(category => (
                    <Grid key={"category-" + category.name} item sm={3} className='pt-5 pb-5 pl-2 pr-2'>
                        <section className='card-block flex flex-col'>
                            <Skeleton variant='rectangular' className='image-cover-h100 flex-1' ></Skeleton>
                            <Skeleton variant='text' ></Skeleton>
                        </section>
                    </Grid>
                ))
                }
            </Grid>
        </article>
    )
}

CategoryView.propTypes = {
    categories: PropTypes.array,
    title: PropTypes.string,
}

export const CategoryItemListing = (props) => {
    const { title = "Electrician Work",
        categoryItems = [
            {
                vendorName: "Home Service Pvt Ltd 1",
                serviceName: 'Switch board and wiring',
                rating: 4,
                charges: 500,
                image: "https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg",
            },
            {
                vendorName: "Pump Service Pvt Ltd 2",
                serviceName: 'Motor setup and wiring',
                rating: 4,
                charges: 1000,
                image: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
            },
            {
                vendorName: "Home Service Pvt Ltd 3",
                serviceName: 'Switch board and wiring',
                rating: 4,
                charges: 500,
                image: "https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg",
            },
            {
                vendorName: "Pump Service Pvt Ltd 4",
                serviceName: 'Motor setup and wiring',
                rating: 4,
                charges: 1000,
                image: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
            },
            {
                vendorName: "Home Service Pvt Ltd 5",
                serviceName: 'Switch board and wiring',
                rating: 4,
                charges: 500,
                image: "https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg",
            },
            {
                vendorName: "Pump Service Pvt Ltd 6",
                serviceName: 'Motor setup and wiring',
                rating: 4,
                charges: 1000,
                image: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
            }
        ] } = props;

    if (categoryItems.length === 0) {
        return null
    }

    return (
        <article className='category-item-listing'>
            <section className='header'>
                <h3 >
                    <strong>{title}</strong>
                </h3>
                <section className='header-menu'>
                    <ol>
                        <li>View all</li>
                    </ol>
                </section>
            </section>
            <section className='item-list pt-14'>
                <Slider dots adaptiveHeight className='top-vendors-by-category' prevArrow={<h3>back</h3>} nextArrow={<h3>next</h3>} slidesToShow={4} slidesToScroll={4}>
                    {
                        categoryItems.map((categoryItem) => (
                            <section key={"category-item-" + categoryItem.name} className='cat-item'>
                                <img className='service-image flex-1' src={categoryItem.image} alt={categoryItem.serviceName}></img>
                                <section className='pt-2'>
                                    <section className='vendor-name'>
                                        {categoryItem.vendorName}
                                    </section>
                                    <section>
                                        <section className='service-name'>
                                            {categoryItem.serviceName}
                                        </section>
                                        <section>
                                            <Rating
                                                name="vendor-rating"
                                                value={categoryItem.rating}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </section>
                                        <section className='flex'>
                                            <span className='mr-1'> &#8377; </span><p className='mr-1'> {categoryItem.charges} </p>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        ))
                    }
                    {
                        categoryItems === null && Array.from({ length: 4 }, () => ({})).map((categoryItem) => (
                            <section key={"category-item-" + categoryItem.name} className='cat-item'>
                                <Skeleton className='service-image flex-1' ></Skeleton>
                                <section className='pt-2'>
                                    <section className='vendor-name'>
                                        <Skeleton variant='text'></Skeleton>
                                    </section>
                                    <section>
                                        <section className='service-name'>
                                            <Skeleton variant='text' className='w-full'></Skeleton>
                                        </section>
                                        <section>
                                            <Skeleton variant="text" className='w-full'></Skeleton>
                                        </section>
                                        <section className='flex'>
                                            <Skeleton className='w-full'></Skeleton>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        ))
                    }
                </Slider>
            </section>
        </article>
    )
}


CategoryItemListing.propTypes = {
    title: PropTypes.string,
    categoryItems: PropTypes.array,
}