import React, { useEffect, useState } from "react";
import VendorCard from "../../components/VendorCard";
import { Container, Grid } from "@mui/material";
import BookingModal from "../../components/BookingModal";
import { useParams } from 'react-router-dom';
//import { useSelector } from "react-redux";
import restClient from "../../config/axios";
import FullPageSkeleton from "../../components/FullPageSkeleton/skeleton";



const VendorList = () => {

  const [updatedVendorList, setUpdatedVendorList] = useState([]);
  const [loading, setLoading] = useState(true);

  //const alldata = useSelector((state) => state.collectiveData.fulldata)
  const { category } = useParams();
  //console.log(alldata)
  console.log(category)
  const [isModalOpen, setModalOpen] = useState(false);
  const handleBookNow = () => {
    setModalOpen(true);
  };

  const getSearchedResult = (async (category) => {
    try {
      const apiUrl = `/api/vendor/serviceSearch?category=${category}`
      const { data: apiResponse } = await restClient.get(apiUrl)
      console.log("arpit" + apiResponse);
      setLoading(false);

      const updatedList = apiResponse.map((item) => ({

        id: item._id,
        vendorImage: item.serviceProviderId?.profilePic || "https://images.unsplash.com/photo-1674726253061-baba094ad8c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2VydmljZXMlMjBwbHVtYmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        vendorName: item.serviceProviderId?.serviceProviderName || "Unknown Vendor",
        vendorEmailId: item.serviceProviderId?.serviceProviderEmalId,
        rating: item.serviceProviderId?.rating,
        service: item.services,// You can customize this
        address: item.serviceProviderId[0]?.address, // You can customize this
        mobileNumber: item.serviceProviderId?.phoneNo || "Number Not Provided Yet", // You can customize this
        yearOfEstablishment: item.serviceProviderId?.createdOn.slice(0, 4), // You can customize this

      }));

      setUpdatedVendorList(updatedList)


    } catch (error) {
      console.log(error);

    }

  })

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getSearchedResult(category)
  }, [])

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "40px" }}>
        {loading ? (
          <>
            <FullPageSkeleton />
          </>) : (
          <Grid container spacing={2}>
            {updatedVendorList.map((vendor) => (
              <Grid item xs={12} key={vendor.vendorName}>
                <VendorCard vendorData={vendor} onBookNow={handleBookNow} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>


      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} vendor={updatedVendorList} />
    </>
  );
};

export default VendorList;
