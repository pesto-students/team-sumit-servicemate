import React, { useState } from 'react';
import {
  Grid, Container, Button, Typography, Rating, Divider, Icon, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import BookingModal from '../../components/BookingModal';
import CarouselItem from '../../components/Carousel';
import ServiceDetail from '../../components/ServiceDetails';
import { useSelector } from 'react-redux';
//import CustomerRatings from "../../components/Ratings";
import { useParams } from 'react-router-dom';
import PaymentsIcon from '@mui/icons-material/Payments';
import ChatIcon from '@mui/icons-material/Chat';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import Slider from 'react-slick';
import './styles/vendorDetails.scss';

const VendorDetails = () => {
  const collectivedata = useSelector((state) => state.collectiveData.fulldata);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('Address');
  // const [openHours, setOpenHours] = useState([]);
  const { email } = useParams();
  const filteredData = collectivedata.filter((item) => item.serviceProviderId?._id === email);
  const emailid = filteredData.length > 0 ? filteredData[0].serviceProviderId?.email : '';
  const vendorName1 = filteredData.length > 0 ? filteredData[0].serviceProviderId?.serviceProviderName : '';

  const rat = filteredData.length > 0 ? filteredData[0].serviceProviderId?.rating : '0';
  const price = filteredData.length > 0 ? filteredData[0].charge : '0';

  const vendorImage1 = filteredData[0]?.serviceProviderId?.profilePic;
  console.log(filteredData[0]?.serviceProviderId?.profilePic);

  const id = filteredData[0]?.serviceProviderId;
  const description = filteredData[0]?.description;

  const number = filteredData.length > 0
    ? filteredData[0].serviceProviderId?.phoneNo
    : '';
  const year = filteredData[0]?.serviceProviderId?.createdOn.slice(0, 4);
  const serv = filteredData[0]?.servicesOffered.join(', ');
  const serviceList = filteredData[0]?.servicesOffered.map((servic, index) => (
    <div key={index} style={{
      margin: '2px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '8px',
    }}>
      {servic}
    </div>
  ));

  const addd = filteredData[0]?.serviceProviderId?.location.length > 0 ? (filteredData[0].serviceProviderId?.location.map((datas, index) =>
    <div key={index}>

      <div style={{
        margin: '2px', // Add 2px spacing around each block
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a light border shadow
        padding: '8px',
      }}>street : {datas.address.street}</div>
      <div style={{
        margin: '2px', // Add 2px spacing around each block
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a light border shadow
        padding: '8px',
      }}>city : {datas.address.city}</div>
      <div style={{
        margin: '2px', // Add 2px spacing around each block
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a light border shadow
        padding: '8px',
      }}>state : {datas.address.state}</div>
      <div style={{
        margin: '2px', // Add 2px spacing around each block
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a light border shadow
        padding: '8px',
      }}>pincode : {datas.address.postalCode}</div>

    </div> // Return an empty array if it's not an array

  )) : (
    <div style={{
      margin: '2px'
    }}>No Address to display</div>


  );


  const extractedData = filteredData[0]?.serviceProviderId?.openHours.map((entry) =>
    entry.timeSlot.map((slot) => ({
      day: slot.day, // Assuming there's only one day in the array
      fromTime: slot.fromTime,
      toTime: slot.toTime,
    }))
  );

  const tabContent = {

    Address: addd,

    Review: 'No Reviews Found...',
    Services: serviceList,
    WorkingDays: extractedData ? extractedData.map((dayData, index) => (

      <div key={index} >
        {dayData.map((slotData, slotIndex) => (

          <Typography variant="h7" key={slotIndex}>
            <table key={index} style={{ width: '100%' }}>
              <tr>
                <td>{slotData.day}</td>
                <td>{slotData.fromTime}</td>
                <td>{slotData.toTime}</td>
              </tr>
            </table>
          </Typography>


        ))}
      </div>

    )) : (
      <Typography>No opening hours available</Typography>
    ), // Just a placeholder; please replace with appropriate content
  };

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenPhotoPopup = () => {
    setIsPhotoPopupOpen(true);
  };

  // New function to close the photo popup
  const handleClosePhotoPopup = () => {
    setIsPhotoPopupOpen(false);
  };


  // Render the View Photos button


  const handleBookNow = () => {
    setIsModalOpen(true);
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const vendor = {
    id: id,
    vendorImage: vendorImage1,
    vendorName: vendorName1,
    vendorEmail: emailid,
    Price: price,
    rating: rat,
    description: description,
    openingHours: extractedData ? extractedData.map((dayData, index) => (
      <div key={index}>
        {dayData.map((slotData, slotIndex) => (
          <Typography key={slotIndex}>
            {slotData.day} : {slotData.fromTime} - {slotData.toTime}
          </Typography>
        ))}
      </div>
    )) : (
      <Typography>No opening hours available</Typography>
    ),

    service: serv,

    mobileNumber: number,
    yearOfEstablishment: year,
    portfolios: [
      {
        portfolioName: 'Portfolio 1',
        photos: [
          {
            url: 'https://plus.unsplash.com/premium_photo-1661723379706-598b81f31652?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlcnZpY2VzJTIwcGx1bWJpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            caption: 'Photo 1',
          },
          {
            url: 'https://media.istockphoto.com/id/1136317145/photo/plumber-fixing-sink-pipe-with-adjustable-wrench.webp?b=1&s=170667a&w=0&k=20&c=zNydF1QoijIpETXTga0qfX9q_-Syn9LWCmSF3Kxz0QQ=',
            caption: 'Photo 2',
          },
        ],
        serviceId: '1',
      },
      {
        portfolioName: 'Portfolio 2',
        photos: [
          {
            url: 'https://media.istockphoto.com/id/921346102/photo/plumber-fixing-sink-pipe-with-adjustable-wrench.webp?b=1&s=170667a&w=0&k=20&c=v052C3qOaQnescNP0Ugfk6F9vBTJXZLNHkmjnlZHZYE=',
            caption: 'Photo 3',
          },
        ],
        serviceId: '2',
      },
    ],
  };

  return (
    <article className='category-item-listing'>
      <Container maxWidth="lg" sx={{ py: 4, border: '1px solid #ddd', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Grid container spacing={4} >

          <Grid item xs={10} md={5} sx={{
            maxWidth: '80%', // Adjust the percentage as needed
            margin: '0 auto', // Center the item horizontally
          }}>
            <Slider>
              <CarouselItem imageUrls={[vendor.vendorImage]} />
            </Slider>
          </Grid>

          <Grid item xs={5} md={6} >
            <ServiceDetail service={{
              title: vendor.vendorName,
            }} />

            <Rating
              name="vendor-rating"
              value={vendor.rating}
              precision={0.1}
              readOnly
              sx={{ fontSize: '20px' }}
            />
            <p style={{
              position: 'relative',
              marginBottom: 0,
              marginRight: '10px',
              paddingRight: '10px',
              lineHeight: '20px',
              fontSize: '1rem',
              color: '#06c'
            }}>
              AboutMe: {vendor.description}
            </p>
            <Divider style={{ margin: '12px 0 ' }} />
            <div style={{ marginTop: '10px' }}>
              <Typography variant="h5" sx={{ color: 'red' }}>
                <strong>₹{vendor.Price}/hr</strong>
              </Typography>


            </div>
            <Divider style={{ margin: '12px 0 ' }} />

            <div style={{ marginTop: '8px' }}>
              <Typography variant="h6" sx={{ fontWeight: '120', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
                <strong>Mobile Number:</strong> <span style={{ color: '#666', fontSize: '16px', fontWeight: '120' }}> {vendor.mobileNumber} </span>
              </Typography>
              <div style={{ marginTop: '8px' }}>
                <Typography variant="h6" sx={{ fontWeight: '120', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
                  <strong> EmailId: </strong>{vendor.vendorEmail}
                </Typography>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Typography variant="h6" sx={{ fontWeight: '120', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
                  <strong> Year of Establishment: </strong>{vendor.yearOfEstablishment}
                </Typography>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Typography variant="h6" sx={{ fontWeight: '120', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
                  <strong> Opening Hours:</strong> <span style={{ color: '#666', fontSize: '16px', fontWeight: '120' }}>{vendor.openingHours}</span>
                </Typography>
              </div>

            </div>
            <div style={{ marginTop: '8px' }}>
              <Typography variant="h6" sx={{ fontWeight: '120', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
                <strong>Services : </strong>
                <span style={{ color: '#666', fontSize: '16px', fontWeight: '120' }}> {vendor.service} </span>
              </Typography>
            </div>
            <div style={{ marginTop: '8px' }}>
              <article className='banner'>
                <Grid container>
                  {[{ icon: <PaymentsIcon></PaymentsIcon>, title: 'Secure Payment', description: '100% secure payment' },
                  { icon: <ChatIcon />, title: '24/7 Support', description: 'Dedicated support' },
                  { icon: <BookOnlineIcon></BookOnlineIcon>, title: 'Easy Booking', description: 'Book appointment with one click' }
                  ].map(feature => (
                    <Grid item alignItems="center" sm={4} key={'feature-' + feature.title}>
                      <section style={{ width: '.5rem', height: '2.5rem' }}>
                        {/* <img className="image-cover-h100" alt={feature.title} src={feature.icon} /> */}
                        <Icon sx={{ width: '2.5rem', height: '2.5rem' }} className="image-cover-h100">{feature.icon}</Icon>
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
            </div>
            <div style={{ marginTop: '8px' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: '#fcb800', color: 'black', marginRight: '14px', height: '50px' }}
                onClick={handleBookNow}
              >
                <strong>Book Now</strong>
              </Button>

              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2, backgroundColor: 'black', color: 'white', marginRight: '14px', height: '50px' }}
                onClick={handleOpenPhotoPopup}
              >
                <strong>View Photos</strong>
              </Button>
            </div>
          </Grid>



          {/* <Grid item xs={12}>

            <section className='header'>
              <h3 >
                <strong><Typography variant="h6">portfolio</Typography></strong>
              </h3>
              <section className='header-menu'>
                <ol>
                  <li>View all</li>
                </ol>
              </section>
            </section>

            <Grid container spacing={4}>
              {vendor.portfolios.map((portfolio) => (
                <Grid key={portfolio.portfolioName} item xs={12} md={4}>
                  <div>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {portfolio.portfolioName}
                    </Typography>
                    <CarouselItem
                      imageUrls={portfolio.photos.map((photo) => photo.url)}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>

          </Grid> */}

        </Grid>
        <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} vendor={vendor} />
        <Dialog
          open={isPhotoPopupOpen}
          onClose={handleClosePhotoPopup}
          maxWidth="md"
          fullWidth >
          <DialogTitle>
            <Typography variant="h6">
              All Profile Photos
            </Typography>
          </DialogTitle>
          <DialogContent>

            <Grid container spacing={2}>
              {vendor.portfolios.map((portfolio) => (
                portfolio.photos.map((photo, index) => (

                  <Grid item xs={6} md={4} key={index}>

                    <img src={photo.url} alt={`Photo ${index}`} width="100%" />

                  </Grid>

                ))
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePhotoPopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <div className="tabs-container">
          <div className="tabs-header">
            <div style={{ fontSize: '20px', fontWeight: '500' }}
              className={`tab ${activeTab === 'Address' ? 'active' : ''}`}
              onClick={() => handleTabClick('Address')}
            >
              Address
            </div>
            <div style={{ fontSize: '20px', fontWeight: '500' }}
              className={`tab ${activeTab === 'Services' ? 'active' : ''}`}
              onClick={() => handleTabClick('Services')}
            >
              List Of Services
            </div>
            <div style={{ fontSize: '20px', fontWeight: '500' }}
              className={`tab ${activeTab === 'WorkingDays' ? 'active' : ''}`}
              onClick={() => handleTabClick('WorkingDays')}
            >
              Working Days
            </div>
            <div style={{ fontSize: '20px', fontWeight: '500' }}
              className={`tab ${activeTab === 'Review' ? 'active' : ''}`}
              onClick={() => handleTabClick('Review')}
            >
              Review
            </div>
          </div>
          <div className="tab-content" style={{
            width: '100%',
            padding: '16px',
          }}>
            <p>{tabContent[activeTab]}</p>
          </div>
        </div>
      </Container>
    </article>
  );
};

export default VendorDetails;
