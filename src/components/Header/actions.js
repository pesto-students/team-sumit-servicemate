export const actionTypes = {
    SET_ALL_CATEGORIES: 'SET_ALL_CATEGORIES',
    SET_LOGOUT_USER: 'SET_LOGOUT_USER'
};

export const setAllCategories = (payload) => {
    return {
        type: actionTypes.SET_ALL_CATEGORIES,
        payload
    };
};

export const setLogoutUser = () => {
    return {
        type: actionTypes.SET_LOGOUT_USER
    };
};