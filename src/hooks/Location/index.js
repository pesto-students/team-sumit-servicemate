import { useState, useEffect } from 'react';
import restClient from '../../config/axios';

const useCityLocation = () => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPermission()
    }, []);

    const getCityName = async (latitude, longitude) => {
        try {
            const { data } = await restClient(`/api/getLocation/${latitude}/${longitude}?by=city`)
            const city = data.city;
            setCity(city);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching city:', error);
            setLoading(false);
        }
    };

    const setLocation = (latitude, longitude) => {
        if (latitude && longitude) {
            getCityName(latitude, longitude);
        } else if (latitude) {
            setCity(latitude);
        }
    };

    const getPermission = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getCityName(latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation not supported by your browser.');
            setLoading(false);
        }
    }

    return { city, loading, setLocation, getPermission };
};

export default useCityLocation;
