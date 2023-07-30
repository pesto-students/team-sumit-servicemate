import React, { useState } from "react";
import { Grid, Container, Button, Typography } from "@mui/material";
import BookingModal from "../../components/Modal";
import CarouselItem from "../../components/Carousel";
import ServiceDetail from "../../components/ServiceDetails";
import CustomerRatings from "../../components/Ratings";

const VendorDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const vendor = {
    vendorImage:
      "https://images.unsplash.com/photo-1674726253061-baba094ad8c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    vendorName: "ABC Plumbing",
    rating: "4.5",
    openingHours: "9:00 AM - 6:00 PM",
    address: {
      address: "123, Vendor Street",
      city: "City",
      state: "State",
      pincode: "12345",
    },
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
    mobileNumber: "9876543210",
    yearOfEstablishment: "2000",
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
              price: vendor.estimatedCharges,
              description: vendor.description,
              vendor: vendor.vendorName,
              ratings: vendor.rating,
            }}
          />
          <div>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Address:
            </Typography>
            <Typography>
              {vendor.address.address}, {vendor.address.city},{" "}
              {vendor.address.state}, {vendor.address.pincode}
            </Typography>
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
              Year of Establishment:
            </Typography>
            <Typography>{vendor.yearOfEstablishment}</Typography>
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
          <Typography variant="h6" sx={{ mt: 4 }}>
            Portfolio:
          </Typography>
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
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default VendorDetails;
