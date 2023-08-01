import React,{useEffect,useState} from "react";
import { Container, Typography, Grid, Link, Box } from "@mui/material";
import Card from "../../components/Card";
import CategoryItem from "../../components/CategoryItem";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import restClient from "../../config/axios";


const cardData = [
  {
    id: 1,
    image:
      "https://img.freepik.com/premium-photo/repairman-holds-screwdriver-suitcase-tools-kitchen-looks-camera_353017-487.jpg?w=740",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-vector/housewife-repairman-with-tools-box-kitchen-near-broken-fridge-leakage-floor-home-appliance-repair-service_575670-1163.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/premium-photo/handyman-with-toolbox_152404-7233.jpg?size=626&ext=jpg&ga=GA1.2.76010670.1688433554&semt=ais",
    title: "Plumber",
    description:
      "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
  },
];

const Categories = () => {
const [apiData,setApiData] = useState([])
  
  const Handlecategories = async()=>{
    try {      
        const  responce  = await restClient.get("/api/vendor/catagories" );
        console.log("Categories:", JSON.stringify(responce.data)); 
        setApiData(responce.data);  
    } catch (error) {
      res.status(401).send(error)
    }
  }
  
  
    useEffect(()=>{
      Handlecategories();
    },[])

    const categories = apiData.map((category) => ({
      id: category._id,
      name: category.catagories,
      imageUrl:category.image
        
    }));
    
  return (
    <>
    
      <Container sx={{ py: 5 }}>
      
      <Box sx={{ boxShadow: 3 }}>
        <div>
          <Typography variant="h5" sx={{ color: "#666", textAlign: "center" }}>
            Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={2} key={category.id}>
                <Link
                  component={RouterLink}
                  to={`/vendor-list?category=${category.name}`}
                  underline="none"
                  color="inherit"
                >
                  <CategoryItem
                    name={category.name}
                    imageUrl={category.imageUrl}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
        </Box>
        <Box sx={{ boxShadow: 3 }}>
        <div style={{ marginTop: "40px" }}>
          <Typography variant="h5" sx={{ color: "#666", marginBottom: "10px",textAlign: "center"  }}>
            Services
          </Typography>
          <Grid container spacing={3} sx={{ marginLeft: "20px"}} >
            <Card cardData={cardData} />
          </Grid>
        </div>
        </Box>
      </Container>
    </>
  );
  
};


export default Categories;
