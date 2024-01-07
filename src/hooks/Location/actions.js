export const actionTypes = {
    SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION'
};

export const setCurrentLocation = (payload) => {
    return {
        type: actionTypes.SET_CURRENT_LOCATION,
        payload
    };
};

