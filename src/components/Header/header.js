
import MyLocationIcon from '@mui/icons-material/MyLocation';

import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import restClient from '../../config/axios';
import routes from '../../config/routeConstants';
import useCityLocation from '../../hooks/Location';
import { useAlert } from '../../hooks/NotificationSnackbar';
import { setAllCategories, setCategories, } from '../../scenes/Categories/actions';
import { setLogoutUser } from './actions';
import "./styles/header.scss";

const Header = () => {

  const navigate = useNavigate()
  const [input, setInput] = useState('');
  const { currentLocation, setLocation, getPermission } = useCityLocation()
  const dispatch = useDispatch()
  const { allCategories = [] } = useSelector(state => state.categories)
  const loggedInUser = useSelector(state => state.user.authUser)
  const { showSuccessAlert } = useAlert()


  useEffect(() => {
    getAllCategories()
  }, [])

  const getAllCategories = async () => {
    const apiUrl = 'api/vendor/categories'
    const { data } = await restClient(apiUrl)
    const allCategories = [{ name: 'All', value: 'all' }, ...data]
    dispatch(setCategories(data))
    dispatch(setAllCategories(allCategories))
  }


  // const handleChange = event => {
  //     setInput(event.target.value);
  //   };

  const userActions = [{ name: "Login", handleAction: () => handleAction(routes.LOGIN) }, { name: "Register", handleAction: () => handleAction(routes.REGISTER) }]


  const handleAction = (path, callback) => {
    navigate(path)
    callback && callback()
  }
  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleLogout = () => {
    dispatch(setLogoutUser())
    showSuccessAlert("You have been logged out")
  }

  const AuthUserAction = [{ name: "My Profile", handleAction: () => handleAction(routes.DASHBOARD2PROFILE) },
  { name: "Appointments", handleAction: () => handleAction(routes.DASHBOARD2APPOINTMENT) }, { name: "Logout", handleAction: () => handleAction(routes.HOME, handleLogout) }]

  const getUserActions = () => {
    return loggedInUser ? AuthUserAction : userActions
  }
  return (
    <header className='header'>
      <section className="header__top">
        <section className='header-wrapper justify-between'>
          <section className='header__left'>
            <section className='header-logo cursor-pointer font-bold flex items-center gap-1 text-4xl tracking-wide' onClick={() => { navigate(routes.HOME) }}>
              <span className='first-word' >service</span>
              <span className='last-word' >mate</span>
            </section>
          </section>
          <section className='header__center flex justify-center flex-1 order-1 md:order-none '>
            <section className='quick-search-wrapper flex justify-center w-[95%]'>
              <select className='select-category'>
                {allCategories.map(option => (
                  <option key={option.id} value={option.value} >{option.name}</option>
                ))}
              </select>
              <input className='search-input' name='quick-search' onChange={handleChange} value={input} placeholder="I'm looking for..."></input>
              <button className='black-button' onClick={() => { navigate(routes.SERVICES_BY_CATEGORY.replace(":category", input)) }}>Search</button>

            </section>
          </section>
          <section className='header__right'>
            <section className='flex'>
              <section>
                <PersonIcon sx={{ height: 50, width: 50 }}></PersonIcon>
              </section>
              <section>
                {getUserActions().map(action => (
                  <section className='user-action cursor-pointer font-bold' key={"path-" + action.name} onClick={() => {
                    console.log("action--->", action)
                    action.handleAction && action.handleAction()
                  }}>
                    {action.name}
                  </section>
                ))}
              </section>

            </section>
          </section>
        </section>
      </section>
      <section className='header-navigation pt-4 pb-4'>
        <div className='menu justify-between'>
          <div className='flex items-center gap-4'>
            <span className='menu-item' onClick={() => { navigate(routes.SERVICES) }}>Services</span>
            <span className='menu-item' onClick={() => { navigate(routes.ABOUT) }}>About Us</span>
            <span className='menu-item' onClick={() => { navigate(routes.CONTACT) }}>Contact Us</span>
          </div>
          <span>
            <section className='get-location'>
              <select className='location-select p-1 rounded-md shadow-md' value={currentLocation} onChange={(e) => setLocation(e.target.value)}>
                {[{ name: "Bengaluru" }, { name: "Mumbai" }, { name: "Delhi" }, { name: "Hyderabad" }].map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
              <IconButton onClick={() => getPermission()}><MyLocationIcon /></IconButton>
            </section>
          </span>
        </div>
      </section>
    </header>
  );
};

export default Header;