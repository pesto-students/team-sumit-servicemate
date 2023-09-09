// reducers.js

import { actionTypes } from "./actions";

const initialState = {
    categoriesExcludeAll: [],
    allCategories: [],
    topCategories: []
};

const CategoriesReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CATEGORIES:
            return { ...state, categoriesExcludeAll: action.payload };
        case actionTypes.SET_ALL_CATEGORIES:
            return { ...state, allCategories: action.payload };
        case actionTypes.SET_TOP_CATEGORIES:
            return { ...state, topCategories: action.payload };
        default:
            return state;
    }
};

export default CategoriesReducer2;
