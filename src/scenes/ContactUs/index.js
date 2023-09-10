import { Grid } from '@mui/material';
import React from 'react';

const ContactUs = () => {
    return (
        <div className='contact-us-form p-10'>
            <div className="ps-contact-form">
                <div className="container">
                    <form className="ps-form--contact-us" action="/" method="get">
                        <h3>Get In Touch</h3>
                        <Grid container sx={{ flexDirection: 'column' }} className="row" spacing={2}>
                            <Grid item className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Name *" />
                                </div>
                            </Grid>
                            <Grid item className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Email *" />
                                </div>
                            </Grid>
                            <Grid item className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Subject *" />
                                </div>
                            </Grid>
                            <Grid item className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                <div className="form-group">
                                    <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                                </div>
                            </Grid>
                        </Grid>
                        <div className="form-group submit">
                            <button className="!max-w-none black-button ps-btn">Send message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;