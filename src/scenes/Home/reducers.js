// reducers.js

const initialState = {
    // Define your initial state here
    someData: null,
    categories: null,
};

export const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SOME_ACTION':
            return { ...state, someData: action.payload };
        default:
            return state;
    }
};






export const CategoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return { ...state, categories: action.payload };
        default:
            return state;
    }
};

