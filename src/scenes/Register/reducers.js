// reducers.js

const initialState = {
    registerUser: null,
};

const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return { ...state, registerUser: action.payload };
        default:
            return state;
    }
};

export default RegisterReducer;
