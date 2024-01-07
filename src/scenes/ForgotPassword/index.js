import React from 'react';

import Footer from '../../components/footer/footer';
import Form from './Form';

const ForgotPassword = () => {
    // const [formData, setFormData] = useSta
    const getFormData = (data) => {
        console.log('🚀 ~ file: index.js:7 ~ getFormData ~ data:', data);

    };
    return (
        <>
    
  <div style={{ marginTop: '30px' }} className="container h-full px-10 py-240">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
     
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full"
          alt="Phone image" />
      </div>
      <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
        <Form getFormData={getFormData}></Form>
      </div>
    </div>
  </div>
  <div style={{marginTop:'10%'}}>
      <Footer />
      </div>

            
        </>
    );
};

export default ForgotPassword;