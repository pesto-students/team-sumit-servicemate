// reducers.js

const initialState = {
    // Define your initial state here
    someData: null,
};

const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SOME_ACTION':
            return { ...state, someData: action.payload };
        default:
            return state;
    }
};


export default HomeReducer;
