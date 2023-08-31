import React from 'react';
import "./styles/header.scss"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import useCityLocation from '../../hooks/Location';
import { IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const Header = () => {
    const navigate = useNavigate()
    const { city, loading, setLocation, getPermission } = useCityLocation()
    return (
        <header className='header'>
            <section className="header__top">
                <section className='header-wrapper'>
                    <section className='header__left flex-1'>
                        <section style={{
                            fontWeight: '900',
                            fontSize: '1.2rem',
                            cursor: "pointer",
                        }} onClick={() => { navigate('/') }}>
                            <span style={{ color: 'black' }}>service</span><span style={{ color: 'white' }}>mate</span>
                        </section>
                    </section>
                    <section className='header__center flex-1'>
                        <section className='quick-search-wrapper flex'>
                            <section>
                                <select className='select-category'>
                                    {[{ id: 'all', name: 'All', value: 'all' }, { id: 'plumber', name: 'Plumber', value: 'plumber' }].map(option => (
                                        <option key={option.id} value={option.value} >{option.name}</option>
                                    ))}
                                </select>
                            </section>
                            <section>
                                <input className='search-input' name='quick-search' placeholder="I'm looking for..."></input>
                            </section>
                            <section>
                                <button className='black-button' >Search</button>
                            </section>
                        </section>
                    </section>
                    <section className='header__right'>
                        <section className='flex'>
                            <section>
                                <PersonIcon sx={{ height: 50, width: 50 }}></PersonIcon>
                            </section>
                            <section>
                                <section>
                                    <a href='./login'>    Login</a>
                                </section>
                                <section>
                                    <a href='./register'> Register</a>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
            <section className='header-navigation pt-4 pb-4'>
                <ul className='menu'>
                    <li className='menu-item'>Services</li>
                    <li className='menu-item'>About Us</li>
                    <li className='menu-item'>Contact Us</li>
                    <li>
                        <section className='get-location'>
                            <select className='location-select p-0.5' value={city} onChange={(e) => setLocation(e.target.value)}>
                                {[{ name: "Bengaluru" }, { name: "Mumbai" }, { name: "Delhi" }, { name: "Hyderabad" }].map(city => (
                                    <option key={city.name} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                            {loading ? 'fetching location...' : null}
                            <IconButton onClick={() => getPermission()}><MyLocationIcon /></IconButton>
                        </section>
                    </li>
                </ul>
            </section>
        </header>
    );
};

export default Header;