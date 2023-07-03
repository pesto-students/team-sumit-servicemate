// reducers.js

const initialState = {
    // Define your initial state here
    someData: null,
};

const HomeReducer = (state = initialState.someData, action) => {
    switch (action.type) {
        case 'SOME_ACTION':
            return { ...initialState, someData: action.payload };
        default:
            return state;
    }
};


export default HomeReducer;
