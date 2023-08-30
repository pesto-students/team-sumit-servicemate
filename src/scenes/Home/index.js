import React, { useEffect } from 'react'
import { useLocation, } from 'react-router-dom'
import { data } from '../../config/db'
import routeConstant from '../../config/routeConstant'
import { connect } from 'react-redux';
import { someAction } from './actions';
import PropTypes from "prop-types";
import { Grid, Icon, Rating, Stack, } from '@mui/material';
import Slider from "react-slick";
import PaymentsIcon from '@mui/icons-material/Payments';
import ChatIcon from '@mui/icons-material/Chat';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import "./styles/home.scss"

const Home = (props) => {
    const { someData, dispatchSomeAction } = props
    const location = useLocation()
    console.log("someData", someData)
    useEffect(() => {
        const { navigatedFrom, userDetails } = location?.state || {}
        if (navigatedFrom === routeConstant.register && userDetails) {
            const loggedInUser = data.users.find(user => user.emailId === userDetails.emailId)
            if (loggedInUser) {
                console.log("log", loggedInUser)
            }
            console.log("🚀 ~ file: index.js:10 ~ useEffect ~ data.users:", data.users)
        }
        dispatchSomeAction()

    }, [])



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
            <CategoryView></CategoryView>
            <CategoryItemListing></CategoryItemListing>
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

const CategoryView = (props) => {
    const { categories = [{ imgSrc: "https://le-cdn.hibuwebsites.com/4fbcba4ddf5f4d57ad1799560278d928/dms3rep/multi/opt/RSshutterstock_8610913-640w.jpg", name: "Electrician" },
    { imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwWCUeYSm3Audhz429cpIJU4O_ObA7vPGaw&usqp=CAU", name: "Plumber" }], title = 'Top categories' } = props;

    return (
        <article className='category-view'>
            <h3 className='capitalize'>
                {title}
            </h3>
            <Grid container>
                {categories.map(category => (
                    <Grid key={"category-" + category.name} item sm={3} spacing={2} className='pt-5 pb-5 pl-2 pr-2'>
                        <section className='card-block flex flex-col'>
                            <img className='image-cover-h100 flex-1' src={category.imgSrc} alt={category.name} ></img>
                            <p><strong>{category.name}</strong></p>
                        </section>
                    </Grid>
                ))}
            </Grid>
        </article >
    )
}

CategoryView.propTypes = {
    categories: PropTypes.array,
    title: PropTypes.string,
}

const CategoryItemListing = (props) => {
    const { title = "Electrician Work", categoryItems = [
        {
            vendorName: "Home Service Pvt Ltd 1",
            serviceName: 'Switch board and wiring',
            rating: 4,
            charges: 500,
            imgSrc: "https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg",
        },
        {
            vendorName: "Pump Service Pvt Ltd 2",
            serviceName: 'Motor setup and wiring',
            rating: 4,
            charges: 1000,
            imgSrc: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
        },
        {
            vendorName: "Home Service Pvt Ltd 3",
            serviceName: 'Switch board and wiring',
            rating: 4,
            charges: 500,
            imgSrc: "https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg",
        },
        {
            vendorName: "Pump Service Pvt Ltd 4",
            serviceName: 'Motor setup and wiring',
            rating: 4,
            charges: 1000,
            imgSrc: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
        },
        {
            vendorName: "Home Service Pvt Ltd 5",
            serviceName: 'Switch board and wiring',
            rating: 4,
            charges: 500,
            imgSrc: "https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg",
        },
        {
            vendorName: "Pump Service Pvt Ltd 6",
            serviceName: 'Motor setup and wiring',
            rating: 4,
            charges: 1000,
            imgSrc: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
        }
    ] } = props;
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
                <Slider dots slidesToShow={4} slidesToScroll={4}>
                    {
                        categoryItems.map((categoryItem) => (
                            <section key={"category-item-" + categoryItem.name} className='cat-item'>
                                <img className='service-image flex-1' src={categoryItem.imgSrc} alt={categoryItem.serviceName}></img>
                                <section className='pt-2'>
                                    <section className='vendor-name'>
                                        {categoryItem.vendorName}
                                    </section>
                                    <section>
                                        <section className='service-name'>
                                            Switch board and wiring
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
                </Slider>
            </section>
        </article >
    )
}

CategoryItemListing.propTypes = {
    title: PropTypes.string,
    categoryItems: PropTypes.array,
}