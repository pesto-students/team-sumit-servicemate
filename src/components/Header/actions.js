export const actionTypes = { SET_ALL_CATEGORIES: "SET_ALL_CATEGORIES" }

export const setCategories = (payload) => {
    return {
        type: actionTypes.SET_ALL_CATEGORIES,
        payload
    }
}