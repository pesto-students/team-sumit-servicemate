// reducers.js
import { combineReducers } from 'redux';
import HomeReducer from '../scenes/Home/reducers';
import RegisterReducer from '../scenes/Register/reducers';
import LoginReducer from '../scenes/Login/reducers';
import CategoriesReducer from '../scenes/Categories/reducers';
import CollectiveDataReducer from '../scenes/Services/reducers';
import EmployeeReducer from '../scenes/Dashboard2/Employees/reducers';

const rootReducer = combineReducers({
    home: HomeReducer,
    register: RegisterReducer,
    loggedInUser: LoginReducer,
    categories: CategoriesReducer,
    collectiveData: CollectiveDataReducer,

    employees: EmployeeReducer
});

export default rootReducer;
