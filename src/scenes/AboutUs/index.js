import React from 'react';
import { Grid, } from '@mui/material';
// import aboutUsImage from '../../Layout/images/aboutus.jpg';
import AccordionItems from '../../components/SFooter/components/AccodrionItems';
import AboutUsPage from './AboutUsPage';
const AboutUs = () => {
  return (
    <Grid container spacing={4}>
      {/* <Grid item xs={12} sm={6}>
        <Box
          component="img"
          src={aboutUsImage}
          alt="About Us"
          sx={{ width: "100%", height: "auto" }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
          amet turpis vel ante finibus iaculis in non enim. Aenean et convallis
          nulla, eu congue justo. Aliquam id turpis metus. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas.
        </Typography>
        <Typography variant="body1">
          Quisque eget sem non eros tincidunt congue. Cras tincidunt ullamcorper
          vehicula. Aliquam laoreet condimentum metus in sollicitudin.
        </Typography>
      </Grid> */}
      <Grid item className="min-w-full m-auto p-4!">
        <AboutUsPage></AboutUsPage>
      </Grid>
      <Grid item className="min-w-full m-auto p-4!">
        <AccordionItems></AccordionItems>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
