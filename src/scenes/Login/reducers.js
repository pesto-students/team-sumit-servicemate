// reducers.js

const initialState = {
    user: null,
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default LoginReducer;
