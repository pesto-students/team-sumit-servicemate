import React, { useState } from "react";
import { Grid, Container, Button, Typography, Rating, AppBar, Toolbar } from "@mui/material";
import BookingModal from "../../components/BookingModal";
import CarouselItem from "../../components/Carousel";
import ServiceDetail from "../../components/ServiceDetails";
import { useSelector } from "react-redux";
import CustomerRatings from "../../components/Ratings";
import { useParams } from "react-router-dom";

const VendorDetails = () => {
  const collectivedata = useSelector((state) => state.collectiveData.fulldata);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [openHours, setOpenHours] = useState([]);
  const { email } = useParams();
  const filteredData = collectivedata.filter(
    (item) => item.serviceProviderId?.serviceProviderEmalId === email
  );
  const vendorName1 = filteredData.length > 0
    ? filteredData[0].serviceProviderId?.serviceProviderName
    : '';

  const rat = filteredData.length > 0
    ? filteredData[0].serviceProviderId?.rating
    : '0';
  const price = filteredData.length > 0 ? filteredData[0].price : "0"

  const vendorImage1 = filteredData[0]?.serviceProviderId?.profilePic
  const id = filteredData[0]?.serviceProviderId
    || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc06eerlTKwKfhxFYjheNbEs-h6yvpM0F9kbY_WGbw7Q&s';
  const number = filteredData.length > 0
    ? filteredData[0].serviceProviderId?.phoneNo
    : '';
  const year = filteredData[0].serviceProviderId?.createdOn.slice(0, 4)
  const addd = filteredData[0]?.serviceProviderId?.location.map((datas) =>
    Array.isArray(datas.address) // Check if it's an array
      ? datas.address.map((slot1) => ({
        street: slot1?.street || '',
        city: slot1?.city || '',
        state: slot1?.state || '',
        postalCode: slot1?.postalCode || '',
        country: slot1?.country || '',
      }))
      : [] // Return an empty array if it's not an array
  );



  const extractedData = filteredData[0]?.serviceProviderId?.openHours.map((entry) =>
    entry.timeSlot.map((slot) => ({
      day: slot.day, // Assuming there's only one day in the array
      fromTime: slot.fromTime,
      toTime: slot.toTime,

    }))

  );





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
    vendorEmail: email,
    Price: price,
    rating: rat,
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
    address: addd ? addd.map((dayData1, index1) => (
      <div key={index1}>
        {Array.isArray(dayData1) // Check if it's an array
          ? dayData1.map((slotData1, slotIndex1) => (
            <Typography key={slotIndex1}>
              {slotData1.street} : {slotData1.city} - {slotData1.country}
            </Typography>
          ))
          : null}
      </div>
    ))
      : <Typography>No opening hours available</Typography>
    ,
    services: [
      {
        name: "Plumbing Service",
        catregoryName: "Plumbing",
      },
      {
        name: "Electrical Service",
        catregoryName: "Electrical",
      },
    ],
    mobileNumber: number,
    yearOfEstablishment: year,
    portfolios: [
      {
        portfolioName: "Portfolio 1",
        photos: [
          {
            url: "https://plus.unsplash.com/premium_photo-1661723379706-598b81f31652?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlcnZpY2VzJTIwcGx1bWJpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            caption: "Photo 1",
          },
          {
            url: "https://media.istockphoto.com/id/1136317145/photo/plumber-fixing-sink-pipe-with-adjustable-wrench.webp?b=1&s=170667a&w=0&k=20&c=zNydF1QoijIpETXTga0qfX9q_-Syn9LWCmSF3Kxz0QQ=",
            caption: "Photo 2",
          },
        ],
        serviceId: "1",
      },
      {
        portfolioName: "Portfolio 2",
        photos: [
          {
            url: "https://media.istockphoto.com/id/921346102/photo/plumber-fixing-sink-pipe-with-adjustable-wrench.webp?b=1&s=170667a&w=0&k=20&c=v052C3qOaQnescNP0Ugfk6F9vBTJXZLNHkmjnlZHZYE=",
            caption: "Photo 3",
          },
        ],
        serviceId: "2",
      },
    ],
    servicesList: [
      {
        serviceName: "Plumbing Service",
        serviceId: "1",
        categories: ["Bathroom", "Kitchen"],
        estimatedCharges: "₹500",
        location: ["Location 1", "Location 2"],
      },
      {
        serviceName: "Electrical Service",
        serviceId: "2",
        categories: ["Wiring", "Repairs"],
        estimatedCharges: "₹700",
        location: ["Location 3"],
      },
    ],
    ratingByCustomerList: [
      {
        userName: "User 1",
        reviewsCountOfUser: "10",
        comment: "Great service!",
        rating: "4.5",
        date: "2023-07-28",
      },
      {
        userName: "User 2",
        reviewsCountOfUser: "5",
        comment: "Very satisfied with the work.",
        rating: "5",
        date: "2023-07-29",
      },
    ],
  };
  const boxStyle = {
    marginTop: '3%',
  };


  return (
    <Container maxWidth="lg" sx={{ py: 5, fontFamily: "Arial, sans-serif" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CarouselItem imageUrls={[vendor.vendorImage]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceDetail
            service={{
              title: vendor.vendorName,
            }}
          />
          <Rating
            name="vendor-rating"
            value={vendor.rating}
            precision={0.1}
            readOnly
          />
          <div>
            <Typography variant="h6" gutterBottom>
              Price: ₹{vendor.Price}/hr
            </Typography>
            <div>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Address:
              </Typography>
              {vendor.address.map((addressElement, index) => (
                <div key={index}>
                  {addressElement}
                </div>
              ))}
            </div>

          </div>
          <div>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Services:
            </Typography>
            {vendor.services.map((service) => (
              <Typography key={service.name}>
                {service.name} - {service.catregoryName}
              </Typography>
            ))}
          </div>
          <div>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Mobile Number:
            </Typography>
            <Typography>{vendor.mobileNumber}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Year of Establishment: {vendor.yearOfEstablishment}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Opening Hours:
            </Typography>
            <Typography>{vendor.openingHours}</Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleBookNow}
          >
            Book Now
          </Button>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static" sx={boxStyle}>
            <Toolbar variant="dense" sx={{ justifyContent: "center" }}>
              <Typography variant="h6" color="inherit" component="div"  >
                Portfolio
              </Typography>
            </Toolbar>
          </AppBar>
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
        </Grid>
        <Grid item xs={12}>
          <CustomerRatings customerReviews={vendor.ratingByCustomerList} />
        </Grid>
      </Grid>
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} vendor={vendor} />
    </Container>
  );
};

export default VendorDetails;