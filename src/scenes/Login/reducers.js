// reducers.js

const initialState = {
    authUser: null,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return { ...state, authUser: action.payload };
        case "SET_LOGOUT_USER":
            return { ...state, authUser: null };
        default:
            return state;
    }
};

export default UserReducer;
