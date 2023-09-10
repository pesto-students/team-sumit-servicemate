import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import Slider from "react-slick";
//import Card from "../../components/Card";



//import { Link as RouterLink } from "react-router-dom";
//import { useDispatch} from "react-redux";
//import restClient from "../../config/axios";
import { setCollectiveDate } from "./action";
import "./styles/service.module.scss";
//import { List } from "@mui/material";
import { useDispatch } from "react-redux";
import { Grid, Rating, Skeleton, Slider } from "@mui/material";
import restClient from "../../config/axios";

import { Link } from "react-router-dom";
import Footer from "../../components/footer/footer";
//import CategoryItem from "../../components/CategoryItem";


const Categories = () => {
  const dispatch = useDispatch();
  // const categories = useSelector((state) => state.categories.categories);
  const [page, setPage] = useState(1);


  const [categoryData, setCategoryData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(2000);
  const [filteredCardData, setFilteredCardData] = useState([]);
  // const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [scrollLoad, setScrollLoad] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  //const [activeCategory, setActiveCategory] = useState("all");


  const getTopCategories = async () => {
    console.log(scrollLoad)
    const apiUrl = '/api/categories/topCategories'
    const { data } = await restClient(apiUrl)
    if (data && data.length) {
      setCategoryData(data)
    }
  }

  const handlePriceChange = (event, value) => {
    setSelectedPrice(value);

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

  useEffect(() => {
    getTopCategories()
  }, [])


  useEffect(() => {
    getFilteredResult();
  }, [page]);


  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [isFetchingData, page]);


  const handleCategoryChange = async (categoryName, selectedPrice) => {
    getFilteredResult(categoryName, selectedPrice);

  };


  const getFilteredResult = async (categoryName = " ", selectedPrice, page) => {
    console.log(selectedPrice)

    let apiUrl = `/api/vendor/serviceSearch?page=${page}&&`;
    if (categoryName) {
      apiUrl += `category=${categoryName}`;
    }

    if (selectedPrice) {
      apiUrl += `&&price=${selectedPrice}`;
    }
    try {
      console.log(apiUrl)
      const { data: apiResponse } = await restClient.get(apiUrl);
      console.log(apiResponse.length)
      dispatch(setCollectiveDate(apiResponse));
      setFilteredCardData(apiResponse);

      setLoading(false);
      setScrollLoad(false);
    } catch (error) {
      console.log(loading)
      setLoading(true);
      console.error("Error fetching data: ", error);
    }
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
                  categoryData.map((Items) => (
                    <li key={Items.id}>

                      <a onClick={() => handleCategoryChange(Items.value, selectedPrice)}>{Items.name}</a>

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
                    min={0}
                    max={5000}
                    step={100}
                    value={selectedPrice}
                    onChange={handlePriceChange}
                  />
                </div>
                <p style={{ marginTop: "25px" }}> Price: ₹ {selectedPrice}</p>
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
                  <select className="ps-select form-control" data-placeholder="Sort Items">
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
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

                    <Link to={`/vendor/details/${categoryItem.serviceProviderId?.serviceProviderEmalId}`} key={index}>

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
                              <span className='mr-1'> &#8377; </span><p className='mr-1'> {categoryItem.price} </p>
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

        <CategoryItemListing />

      </div>
      <div style={{ marginTop: "10%" }}>
        <Footer />
      </div>


    </>
  );
};

export default Categories;

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
  )
}

CategoryItemListing.propTypes = {
  title: PropTypes.string,
  categoryItems: PropTypes.array,
}