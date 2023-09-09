import React, { useEffect } from 'react';
import "./styles/header.scss"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import useCityLocation from '../../hooks/Location';
import { IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import restClient from '../../config/axios';
import { setAllCategories, setCategories, } from '../../scenes/Categories/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { setLogoutUser } from './actions';
// import { useAlert } from '../../hooks/NotificationSnackbar';
import routes from '../../config/routeConstants';

const Header = () => {
    const navigate = useNavigate()
    const { currentLocation, setLocation, getPermission } = useCityLocation()
    const dispatch = useDispatch()
    const { allCategories = [] } = useSelector(state => state.categories)
    // const loggedInUser = useSelector(state => state.user.authUser)
    // const { showSuccessAlert } = useAlert()

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

    // const userActions = [{ name: "Login", handleAction: () => handleAction(routes.LOGIN) }, { name: "Register", handleAction: () => handleAction(routes.REGISTER) }]

    // const handleAction = (path, callback) => {
    //     navigate(path)
    //     callback && callback()
    // }

    // const handleLogout = () => {
    //     dispatch(setLogoutUser())
    //     showSuccessAlert("You have been logged out")
    // }

    // const AuthUserAction = [{ name: "My Profile", handleAction: () => handleAction(routes.DASHBOARD2PROFILE) },
    // { name: "Appointments", handleAction: () => handleAction(routes.DASHBOARD2APPOINTMENT) }, { name: "Logout", handleAction: () => handleAction(routes.HOME, handleLogout) }]

    // const getUserActions = () => {
    //     return loggedInUser ? AuthUserAction : userActions
    // }

    return (
        <header className='header'>
            <section className="header__top">
                <section className='header-wrapper justify-between'>
                    <section className='header__left'>
                        <section className='header-logo' onClick={() => { navigate(routes.HOME) }}>
                            <span className='first-word' >service</span>
                            <span className='last-word' >mate</span>
                        </section>
                    </section>
                    <section className='header__center'>
                        <section className='quick-search-wrapper flex'>
                            <select className='select-category'>
                                {allCategories.map(option => (
                                    <option key={option.id} value={option.value} >{option.name}</option>
                                ))}
                            </select>
                            <input className='search-input' name='quick-search' placeholder="I'm looking for..."></input>
                            <button className='black-button' >Search</button>
                        </section>
                    </section>
                    <section className='header__right'>
                        <section className='flex'>
                            <section>
                                <PersonIcon sx={{ height: 50, width: 50 }}></PersonIcon>
                            </section>
                            {/* <section>
                                {getUserActions().map(action => (
                                    <section className='user-action cursor-pointer font-bold' key={"path-" + action.name} onClick={() => {
                                        console.log("action--->", action)
                                        action.handleAction && action.handleAction()
                                    }}>
                                        {action.name}
                                    </section>
                                ))}
                            </section> */}
                        </section>
                    </section>
                </section>
            </section>
            <section className='header-navigation pt-4 pb-4'>
                <ul className='menu'>
                    <li className='menu-item' onClick={() => { navigate(routes.SERVICES) }}>Services</li>
                    <li className='menu-item' onClick={() => { navigate(routes.ABOUT) }}>About Us</li>
                    <li className='menu-item' onClick={() => { navigate(routes.CONTACT) }}>Contact Us</li>
                    <li>
                        <section className='get-location'>
                            <select className='location-select p-0.5' value={currentLocation} onChange={(e) => setLocation(e.target.value)}>
                                {[{ name: "Bengaluru" }, { name: "Mumbai" }, { name: "Delhi" }, { name: "Hyderabad" }].map(city => (
                                    <option key={city.name} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                            <IconButton onClick={() => getPermission()}><MyLocationIcon /></IconButton>
                        </section>
                    </li>
                </ul>
            </section>
        </header>
    );
};

export default Header;