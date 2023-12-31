import { Grid, Icon, Rating, Skeleton, } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
// import Slider from 'react-slick';
import { someAction } from './actions';

import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ChatIcon from '@mui/icons-material/Chat';
import PaymentsIcon from '@mui/icons-material/Payments';
import restClient from '../../config/axios';
import routes from '../../config/routeConstants';
import style from './styles/home.module.scss';
import { SfScrollable } from '@storefront-ui/react';
import Banners from './Banners';

const Home = (props) => {
  const { someData, dispatchSomeAction } = props;
  const [topCategories, setTopCategories] = useState([]);
  const [vendorsByTopCategories, setVendorsByTopCategories] = useState([]);
  console.log('someData', someData);

  useEffect(() => {
    dispatchSomeAction();
    getTopCategories();
    getVendorsByTopCategories();
  }, []);

  const getTopCategories = async () => {
    const apiUrl = '/api/categories/topCategories';
    const { data } = await restClient(apiUrl);
    if (data && data.length) {
      setTopCategories(data);
    }
  };

  const getVendorsByTopCategories = async () => {
    const apiUrl = '/api/vendor/vendorsByTopCategories';
    const { data } = await restClient(apiUrl);
    if (data && data.length) {
      setVendorsByTopCategories(data);
    }
  };

  return (
    <div className='flex flex-col gap-10 mb-10'>
      <article className='mt-10 px-10'>
        {/* <Grid container sx={{ height: '28rem' }} spacing={2}>
          <Grid item sm={8} sx={{ height: '100%' }}>
            <section className={style.imageBackground} style={{ height: '100%', '--bg-image': 'url("https://d1csarkz8obe9u.cloudfront.net/posterpreviews/house-repair-service-banner-ad-design-template-c0567315ddd96c8e4ad2a1dac671b9c8_screen.jpg?ts=1655367804")' }}>
              <img width="100%" className={style.imageCoverH100} alt='large pic' src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/house-repair-service-banner-ad-design-template-c0567315ddd96c8e4ad2a1dac671b9c8_screen.jpg?ts=1655367804"></img>
            </section>
          </Grid>
          <Grid item xs={4} sx={{ height: '100%' }}>
            <Stack spacing={2} sx={{ height: '100%' }} >
              <section style={{ height: 'calc(50% - 8px)' }} className='flex-1'>
                <img width="100%" className={style.imageCoverH100} alt='pic 1' src='https://img.freepik.com/free-psd/professional-plumbers-job-banner-template_23-2148709811.jpg?q=10&h=200'></img>
              </section>
              <section style={{ height: 'calc(50% - 8px)' }} className='flex-1'>
                <img width="100%" className={style.imageCoverH100} alt='pic 2' src='https://img.freepik.com/free-psd/electrical-services-banner-style_23-2148652457.jpg'></img>
              </section>
            </Stack>
          </Grid>
        </Grid> */}
        <Banners></Banners>
      </article>
      <article className={style.features}>
        <Grid container spacing={2}>
          {[{ icon: <PaymentsIcon></PaymentsIcon>, title: 'Secure Payment', description: '100% secure payment' },
          { icon: <ChatIcon />, title: '24/7 Support', description: 'Dedicated support' },
          { icon: <BookOnlineIcon></BookOnlineIcon>, title: 'Easy Booking', description: 'Book appointment with one click' }
          ].map(feature => (
            <Grid item alignItems="center" xs={12} sm={6} md={4} lg={3} xl={3} key={'feature-' + feature.title}>
              <section style={{ width: '2.5rem', height: '2.5rem' }}>
                {/* <img className="style.imageCoverH100" alt={feature.title} src={feature.icon} /> */}
                <Icon sx={{ width: '2.5rem', height: '2.5rem' }} className={style.imageCoverH100}>{feature.icon}</Icon>
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
          return <CategoryItemListing key={'vendor-' + vendor.title} title={vendor.title} categoryItems={vendor.data} category={vendor.category}></CategoryItemListing>;
        })
      }
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  someData: PropTypes.object,
  dispatchSomeAction: PropTypes.func,
};


export const CategoryView = (props) => {
  const { categories = [{ image: 'https://le-cdn.hibuwebsites.com/4fbcba4ddf5f4d57ad1799560278d928/dms3rep/multi/opt/RSshutterstock_8610913-640w.jpg', name: 'Electrician' },
  { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwWCUeYSm3Audhz429cpIJU4O_ObA7vPGaw&usqp=CAU', name: 'Plumber' }], title = 'Top categories' } = props;
  const navigate = useNavigate();


  return (
    <article className={style.categoryView}>
      <div className='text-xl font-bold capitalize py-5'>
        {title}
      </div>
      <Grid container spacing={2}>
        {categories.map(category => (
          <Grid key={'category-' + category.name} item xs={12} sm={6} md={4} lg={3} xl={3} className='pt-5 px-2'>
            <section className={`${style.cardBlock} flex flex-col cursor-pointer rounded-md shadow-md`} onClick={() => {
              navigate(routes.SERVICES_BY_CATEGORY.replace(':category', category.value));
            }}>
              <img className={`${style.imageCoverH100} flex-1`} loading='lazy' src={category.image} alt={category.name} ></img>
              <p><strong>{category.name}</strong></p>

            </section>
          </Grid>
        ))
        }
        {!categories.length && Array.from({ length: 6 }, () => ({})).map(category => (
          <Grid key={'category-' + category.name} item sm={2} className='pt-5 pb-5 pl-2 pr-2'>
            <section className={`${style.cardBlock} flex flex-col rounded-md shadow-md`}>
              <Skeleton variant='rectangular' className={`${style.imageCoverH100} flex-1`} ></Skeleton>
              <Skeleton variant='text' ></Skeleton>
            </section>
          </Grid>
        ))
        }
      </Grid>
    </article>
  );
};

CategoryView.propTypes = {
  categories: PropTypes.array,
  title: PropTypes.string,
};

export const CategoryItemListing = (props) => {
  const navigate = useNavigate();
  const { title = '',
    categoryItems = [], category } = props;

  if (categoryItems.length === 0) {
    return null;
  }

  return (
    <article className={style.categoryItemListing}>
      <section className={style.header}>
        <span>
          <strong>{title}</strong>
        </span>
        <span className={style.headerMenu} onClick={() => { navigate(routes.SERVICES_BY_CATEGORY.replace(':category', category?.value || 'all')); }}>View all</span>
      </section>
      <section className='item-list pt-4'>
        <SfScrollable className="items-center w-full snap-x snap-mandatory" drag>
          {
            categoryItems.map((categoryItem) => (
              <section key={'category-item-' + categoryItem.name} className={`${style.catItem} cursor-pointer`} onClick={() => { navigate(routes.VENDOR_DETAILS.replace(':id', categoryItem?._id)); }}>
                <img className={`${style.serviceImage} flex-1`} src={categoryItem.image} alt={categoryItem.serviceName}></img>
                <section className='pt-2'>
                  <section className={style.vendorName}>
                    {categoryItem.vendorName}
                  </section>
                  <section>
                    <section className={style.serviceName}>
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
            !categoryItems && Array.from({ length: 4 }, () => ({})).map((categoryItem) => (
              <section key={'category-item-' + categoryItem.name} className={style.catItem}>
                <Skeleton className={`${style.serviceImage} flex-1`} ></Skeleton>
                <section className='pt-2'>
                  <section className={style.vendorName}>
                    <Skeleton variant='text'></Skeleton>
                  </section>
                  <section>
                    <section className={style.serviceName}>
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
        </SfScrollable>
      </section>
    </article>
  );
};


CategoryItemListing.propTypes = {
  title: PropTypes.string,
  categoryItems: PropTypes.array,
  category: PropTypes.object,
};