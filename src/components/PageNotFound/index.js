import React from 'react';
import style from './styles/pageNotFound.module.scss';
import routes from '../../config/routeConstants';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageNotFound = ({ message, description }) => {
  const navigate = useNavigate();
  return (
    <div className={style.pageNotFound}>
      <img className='m-auto mb-20' src="https://reactstorefronts.com/static/img/404.jpg" alt='error page' />
      <h3>{message || 'Ohh! Page not found'} </h3>
      <div><p>{description || 'It seems we cannot find what you are looking for.'} </p>
      </div>
      <p>Go back to <span className={style.homepageLink} onClick={() =>
        navigate(routes.HOME)
      }>Homepage</span></p>
    </div >
  );
};

export default PageNotFound;

PageNotFound.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
};