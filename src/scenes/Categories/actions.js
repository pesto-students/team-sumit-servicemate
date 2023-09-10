// actions.js
export const setCategories = (payload) => {
    return {
        type: 'SET_CATEGORIES',
        payload,
    };
};

export const setAllCategories = (payload) => {
    return {
        type: 'SET_ALL_CATEGORIES',
        payload,
    };
};

export const setTopCategories = (payload) => {
    return {
        type: 'SET_TOP_CATEGORIES',
        payload,
    };
};

export const actionTypes = {
    SET_CATEGORIES: "SET_CATEGORIES",
    SET_ALL_CATEGORIES: "SET_ALL_CATEGORIES",
    SET_TOP_CATEGORIES: "SET_TOP_CATEGORIES"
}