import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setCollectiveDate } from './action';
import './styles/service.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Rating, Skeleton, Slider } from '@mui/material';
import restClient from '../../config/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import routes from '../../config/routeConstants';
import { useAlert } from '../../hooks/NotificationSnackbar';


const Categories = () => {
  const { category } = useParams();

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [page, setPage] = useState(1);
  const [selectedSorting, setSelectedSorting] = useState('lowest');
  const [categoryData, setCategoryData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(2000);
  const [filteredCardData, setFilteredCardData] = useState([]);

  // const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  // const [scrollLoad, setScrollLoad] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const { showErrorAlert } = useAlert();


  const getCategories = async () => {
    if (categories?.allCategories?.length) {
      setCategoryData(categories.allCategories);
      setActiveCategory(getValidCategory(categories.allCategories));
    } else {
      const apiUrl = '/api/categories/topCategories';
      const { data } = await restClient(apiUrl);
      if (data?.length) {
        setCategoryData([{ name: 'All', value: 'all' }, ...data]);
        setActiveCategory(getValidCategory(category));
      }
    }
  };

  const handleSortingChange = (event) => {
    const newSorting = event.target.value;
    setSelectedSorting(newSorting);
    console.log('sort' + selectedSorting);
    sortData(newSorting);
  };

  const sortData = (sortingOption) => {
    console.log('option' + sortingOption);
    const sortedData = [...filteredCardData];

    if (sortingOption === 'lowest') {

      sortedData.sort((a, b) => a.charge - b.charge); // Sort by price: low to high
    } else if (sortingOption === 'higest') {
      console.log('higest' + sortedData.sort((a, b) => b.charge - a.charge));
      sortedData.sort((a, b) => b.charge - a.charge); // Sort by price: high to low
    }

    setFilteredCardData(sortedData);
    console.log('datas' + sortedData.charge);
  };

  const handlePriceChange = (event, value) => {
    setSelectedPrice(value);
    getFilteredResult(activeCategory, value);
  };

  const handleInfiniteScroll = async () => {
    try {
      if (
        !isFetchingData &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setIsFetchingData(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getVendorsByCategory = async () => {
    const apiUrl = '/api/vendor/allVendors/' + activeCategory;
    try {
      const { data } = await restClient(apiUrl);
      if (data.responseData) {
        dispatch(setCollectiveDate(data.responseData));
        setFilteredCardData(data.responseData);

      }
    } catch (error) {
      console.error(error);
      showErrorAlert('Couldn\'t fetch vendors');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    activeCategory && getVendorsByCategory();
  }, [activeCategory]);


  useEffect(() => {
    if (activeCategory) {
      getFilteredResult(activeCategory);
    }
  }, [page, activeCategory]);


  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [isFetchingData, page]);

  const navigate = useNavigate();

  const handleCategoryChange = async (categoryName) => {
    setActiveCategory(categoryName);
    navigate(routes.SERVICES_BY_CATEGORY.replace(':category', categoryName));
  };


  const getFilteredResult = async (categoryName, price = selectedPrice) => {
    let apiUrl = `/api/vendor/serviceSearch?page=${page}&`;
    if (categoryName) {
      apiUrl += `category=${categoryName}`;
    }

    if (price === '0') {
      console.log('Selected Price is 0'); // Add a console log for debugging
      apiUrl += '&price=0';
    }

    if (price && price !== '0') {
      console.log('Selected Price is not 0'); // Add a console log for debugging
      apiUrl += `&price=${price}`;
    }

    try {
      const { data: apiResponse } = await restClient.get(apiUrl);
      dispatch(setCollectiveDate(apiResponse));
      setFilteredCardData(apiResponse);
      setLoading(false);
    } catch (error) {
      console.log(loading);
      setLoading(true);
      console.error('Error fetching data: ', error);
    }
  };

  const getValidCategory = (categoryArray = [], categoryName) => {
    return categoryArray.find(cat => cat?.value?.toLowerCase() === (categoryName || category?.toLowerCase()))?.value || 'all';
  };

  return (
    <>
      <div className="ps-container">
        <div className="ps-layout--shop">
          <div className="ps-layout__left">
            <aside className="widget widget_shop">
              <h4 className="widget-title"><u>Categories</u></h4>

              <ul className="ps-list--categories">
                {categoryData.length > 0 ? (
                  categoryData.map((category) => (
                    <li key={category.id}>

                      <a onClick={() => handleCategoryChange(category.value)} onKeyPress={handleCategoryChange.bind(category.value)}
                        style={{ color: category.value === activeCategory && '#fcb800' }}
                      >{category.name}</a>

                    </li>
                  ))
                ) : (
                  <li>
                    <a>no record to display</a>
                  </li>
                )}
              </ul>
            </aside>

            <aside className="widget widget_shop">
              <figure>
                <h4 className="widget-title">By Price</h4>
                <div className="ant-slider">
                  <Slider
                    min={50}
                    max={5000}
                    step={100}
                    value={selectedPrice}
                    onChange={handlePriceChange}
                  />
                </div>
                <p style={{ marginTop: '25px' }}> Price: ₹ {selectedPrice}</p>
              </figure>
            </aside>



          </div>
          {/* <div className="ps-block--shop-features">
    <div className="ps-block__header">
    <h3>Best Sale Items</h3>
    <div className="ps-block__navigation">
    <a className="ps-carousel__prev">
    <i className="icon-chevron-left"></i></a>
    <a className="ps-carousel__next">
    <i className="icon-chevron-right"></i></a></div></div>
    </div> */}
          <div className="ps-layout__right">
            <div className="ps-shopping">
              <div className="ps-shopping__header">
                <p style={{ fontFamily: 'Work Sans, sans-serif' }}> {filteredCardData.length} ServiceProvider found.</p>
                <div className="ps-shopping__actions">
                  <select className="ps-select form-control" id="sort" data-placeholder="Sort Items" value={selectedSorting} onChange={handleSortingChange}>
                    <option value="lowest">Sort by price: low to high</option>
                    <option value="higest">Sort by price: high to low</option>
                  </select>
                </div>

              </div>
            </div>

            <article className='category-item-listing'>
              {/* <section className='header'>
              <h3 >
                  <strong>title</strong>
              </h3>
              <section className='header-menu'>
                  <ol>
                      <li>View all</li>
                  </ol>
              </section>
          </section> */}
              <Grid container className="pt-15" >

                {loading ? (

                  <>
                    <Skeleton variant="rect" width="25%" height={200} />
                    <Skeleton variant="rect" width="25%" height={200} />
                    <Skeleton variant="rect" width="25%" height={200} />
                    <Skeleton variant="rect" width="25%" height={200} />
                  </>
                ) : (filteredCardData.length > 0 ? (
                  filteredCardData.map((categoryItem, index) => (

                    <Link to={`/vendor/details/${categoryItem.serviceProviderId?._id}`} key={index}>

                      <Grid item className='cat-item'>

                        <img className='service-image flex-1' src={categoryItem.serviceProviderId?.profilePic} alt={categoryItem.serviceName}></img>
                        <section className='pt-2'>
                          <section className='vendor-name'>
                            {categoryItem.serviceProvider}
                          </section>
                          <section>
                            <section className='service-name'>
                              {categoryItem.description}
                            </section>
                            <section>
                              <Rating
                                name="vendor-rating"
                                value={categoryItem.serviceProviderId?.rating}
                                precision={0.5}
                                readOnly
                              />
                            </section>
                            <section className='flex'>
                              <span className='mr-1'> &#8377; </span><p className='mr-1'> {categoryItem.charge} </p>
                            </section>
                          </section>
                        </section>
                      </Grid>
                    </Link>
                  ))) : (
                  <>
                    <Grid container className="pt-15" style={{ justifyContent: 'center' }}>
                      <p>No Serviceprovider Found..!!!</p>
                    </Grid>
                  </>
                ))
                }
              </Grid>
            </article>
          </div>

        </div>

        {/* <CategoryItemListing /> */}

      </div>
      <div style={{ marginTop: '10%' }}>
        <Footer />
      </div>


    </>
  );
};

export default Categories;

const CategoryItemListing = (props) => {

  const { title = 'Electrician Work', categoryItems = [
    {
      vendorName: 'Home Service Pvt Ltd 1',
      serviceName: 'Switch board and wiring',
      rating: 4,
      charges: 500,
      imgSrc: 'https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg',
    },
    {
      vendorName: 'Pump Service Pvt Ltd 2',
      serviceName: 'Motor setup and wiring',
      rating: 4,
      charges: 1000,
      imgSrc: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
    },
    {
      vendorName: 'Home Service Pvt Ltd 3',
      serviceName: 'Switch board and wiring',
      rating: 4,
      charges: 500,
      imgSrc: 'https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg',
    },
    {
      vendorName: 'Pump Service Pvt Ltd 4',
      serviceName: 'Motor setup and wiring',
      rating: 4,
      charges: 1000,
      imgSrc: 'https://media.istockphoto.com/id/1096101716/photo/three-phase-induction-motor-bearing-repair.jpg?s=612x612&w=0&k=20&c=8Xok3xy2CZTZw_u9YUj4uxMAfZN5Eb5ZYJa5eYe8kzo='
    },
    {
      vendorName: 'Home Service Pvt Ltd 5',
      serviceName: 'Switch board and wiring',
      rating: 4,
      charges: 500,
      imgSrc: 'https://p1.pxfuel.com/preview/837/958/534/electrician-electric-electricity-worker-royalty-free-thumbnail.jpg',
    },
    {
      vendorName: 'Pump Service Pvt Ltd 6',
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
      <Grid container className='pt-15'>

        {
          categoryItems.map((categoryItem, indexs) => (
            <Grid item key={indexs} className='cat-item'>
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
            </Grid>
          ))
        }

      </Grid>
    </article>
  );
};

CategoryItemListing.propTypes = {
  title: PropTypes.string,
  categoryItems: PropTypes.array,
};