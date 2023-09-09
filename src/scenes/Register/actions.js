// actions.js
export const registerUser = (payload) => {
    return {
        type: 'SET_LOGGED_IN_USER',
        payload,
    };
};
