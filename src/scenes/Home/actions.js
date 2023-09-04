// actions.js
export const someAction = () => {
    return {
        type: 'SOME_ACTION',
        payload: 'some data',
    };
};
// actions.js
export const setCategories = (payload) => {
    return {
        type: 'SET_CATEGORY',
        payload :payload,
    };
};

