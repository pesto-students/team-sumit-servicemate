// actions.js
export const registerUser = (payload) => {
    return {
        type: 'REGISTER_USER',
        payload,
    };
};
