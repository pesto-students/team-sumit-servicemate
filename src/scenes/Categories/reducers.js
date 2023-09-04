// reducers.js

import { actionTypes } from "./actions";

const initialState = {
    categories: null,
    allCategories: [],
    topCategories: []
};

const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case actionTypes.SET_ALL_CATEGORIES:
            return { ...state, allCategories: action.payload };
        case actionTypes.SET_TOP_CATEGORIES:
            return { ...state, topCategories: action.payload };
        default:
            return state;
    }
};

export default CategoriesReducer;
