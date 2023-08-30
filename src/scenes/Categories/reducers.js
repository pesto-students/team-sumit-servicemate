// reducers.js

const initialState = {
    categories: null,
};

const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        default:
            return state;
    }
};

export default CategoriesReducer;
