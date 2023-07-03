// reducers.js

const initialState = {
    user: null,
};

const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default RegisterReducer;
