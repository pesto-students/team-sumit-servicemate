import React, { useState } from "react";
import VendorCard from "../../components/VendorCard";
import { Container, Grid } from "@mui/material";
import BookingModal from "../../components/Modal";

const vendorList = [
  {
    id: 1,
    vendorImage:
      "https://images.unsplash.com/photo-1674726253061-baba094ad8c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    vendorName: "Vendor 1",
    rating: { overall: 4.5, count: 100 },
    address: "123, Vendor Street, City",
    mobileNumber: "123-456-7890",
    yearOfEstablishment: "2000",
  },
  {
    id: 2,
    vendorImage:
      "https://plus.unsplash.com/premium_photo-1661723379706-598b81f31652?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNlcnZpY2VzJTIwcGx1bWJpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    vendorName: "Vendor 2",
    rating: { overall: 3.9, count: 50 },
    address: "456, Vendor Avenue, City",
    mobileNumber: "987-654-3210",
    yearOfEstablishment: "2010",
  },
];

const VendorList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleBookNow = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
        <Grid container spacing={2}>
          {vendorList.map((vendor) => (
            <Grid item xs={12} key={vendor.vendorName}>
              <VendorCard vendorData={vendor} onBookNow={handleBookNow} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default VendorList;
