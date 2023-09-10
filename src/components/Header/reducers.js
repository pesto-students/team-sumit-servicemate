import { actionTypes } from "./actions";

const initialState = {
    allCategories: []
}

const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_CATEGORIES:
            return { ...state, allCategories: action.payload }
        default:
            return state
    }
}

export default CategoriesReducer