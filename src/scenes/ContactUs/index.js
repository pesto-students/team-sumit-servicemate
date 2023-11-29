import { Grid, Typography } from '@mui/material';
import { useForm, ValidationError } from '@formspree/react';
import React from 'react';

const ContactUs = () => {
    const [state, handleSubmit] = useForm('xwkdqeql');
    if (state.succeeded) {
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>Thanks For Contacting!!!!</Typography>
        </div>;
    }
    return (
        <div className='contact-us-form p-10'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>Get In Touch</Typography>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.121050316086!2d73.02434117405835!3d18.97026065528576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c31149eda0e3%3A0xbae55b5ae734f168!2sRSM%20ATHENA!5e0!3m2!1sen!2sin!4v1694458752908!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" // Change this line
            ></iframe>
            <div className="ps-contact-form" style={{ marginTop: '20px', }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <form className="ps-form--contact-us" action="https://formspree.io/f/xwkdqeql" method="POST" onSubmit={handleSubmit}>

                        <Grid container sx={{ flexDirection: 'column' }} className="row" spacing={2}>
                            <Grid item className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Name *" style={{ width: '100%' }} />
                                </div>
                            </Grid>
                            <Grid item className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                <div className="form-group">

                                    <input className="form-control" type="email" name="email" placeholder="Email *" />
                                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                                </div>
                            </Grid>
                            <Grid item className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                <div className="form-group">
                                    <textarea className="form-control" rows="5" name="message" placeholder="Message"></textarea>
                                </div>
                            </Grid>
                        </Grid>
                        <div className="form-group submit">
                            <button className="!max-w-none black-button ps-btn" type="submit" disabled={state.submitting}>Send message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;