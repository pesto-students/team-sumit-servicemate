// reducers.js

const initialState = {
    fulldata: [],
};

const CollectiveDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_DATA':
            return { ...state, fulldata: action.payload };
        default:
            return state;
    }
};

export default CollectiveDataReducer;
