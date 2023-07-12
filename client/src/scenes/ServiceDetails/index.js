import { React, useState } from "react";
import { Grid, Container } from "@mui/material";
import BookingModal from "../../components/Modal";
import CarouselItem from "../../components/Carousel";
import ServiceDetail from "../../components/ServiceDetails";
import CustomerRatings from "../../components/Ratings";

const service = {
  id: 1,
  imageUrls: [
    "https://img.freepik.com/premium-photo/repairman-holds-screwdriver-suitcase-tools-kitchen-looks-camera_353017-487.jpg?w=740",
    "https://img.freepik.com/free-vector/housewife-repairman-with-tools-box-kitchen-near-broken-fridge-leakage-floor-home-appliance-repair-service_575670-1163.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    "https://img.freepik.com/premium-photo/handyman-with-toolbox_152404-7233.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
  ],
  title: "Plumbing Service",
  price: "₹500",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  vendor: "ABC Plumbing",
  ratings: 4.5,
  customerReviews: [
    { id: 1, rating: 4, comment: "Great service!" },
    { id: 2, rating: 5, comment: "Very satisfied with the work." },
  ],
};

const ServiceDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CarouselItem imageUrls={service.imageUrls} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceDetail service={service} handleBookNow={handleBookNow} />
        </Grid>
        <Grid item xs={12}>
          <CustomerRatings customerReviews={service?.customerReviews} />
        </Grid>
      </Grid>
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default ServiceDetails;
