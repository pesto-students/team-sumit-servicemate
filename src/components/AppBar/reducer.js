const initialCategoriesState = {};
const initialLoggedInUserState = { user: {} };
const initialRegisterState = { registerUser: null };

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'RESET_STORE':
      return {
        categories: { ...initialCategoriesState },
        loggedInUser: { ...initialLoggedInUserState },
        register: { ...initialRegisterState },
        
      };
      
    default:
      return state;
  }
  
};

export default rootReducer;