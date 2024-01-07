import { useState, useEffect } from 'react';
import restClient from '../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from './actions';

const useCityLocation = () => {
    const currentLocation = useSelector(state => state.location?.currentLocation);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentLocation) {
            getPermission();
        }
    }, []);

    const getCityName = async (latitude, longitude) => {
        try {
            const { data } = await restClient(`/api/getLocation/${latitude}/${longitude}?by=city`);
            const city = data.city;
            dispatch(setCurrentLocation(city));
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
            dispatch(setCurrentLocation(latitude));
        }
    };

    const getPermission = () => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then(response => {
                if (response.state === 'denied') {
                    revokePermission(getPermission);
                }
            });
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
    };

    const revokePermission = () => {
        alert('please allow location from browser\'s settings');
    };

    return { currentLocation, loading, setLocation, getPermission };
};

export default useCityLocation;
