// reducers.js
import { combineReducers } from 'redux';
import { HomeReducer, CategoriesReducer } from '../scenes/Home/reducers';
import UserReducer from '../scenes/Login/reducers';
import CollectiveDataReducer from '../scenes/Services/reducers';
import EmployeeReducer from '../scenes/Dashboard2/Employees/reducers';
import LocationReducer from '../hooks/Location/reducers';

const rootReducer = combineReducers({
    home: HomeReducer,
    categories: CategoriesReducer,
    collectiveData: CollectiveDataReducer,
    employees: EmployeeReducer,
    location: LocationReducer,
    user: UserReducer
});

export default rootReducer;
