// reducers.js
import { combineReducers } from 'redux';
import { HomeReducer } from '../scenes/Home/reducers';
import UserReducer from '../scenes/Login/reducers';
import CollectiveDataReducer from '../scenes/Services/reducers';
import EmployeeReducer from '../scenes/Dashboard2/Employees/reducers';
import LocationReducer from '../hooks/Location/reducers';
import CategoriesReducer2 from '../scenes/Categories/reducers';

const rootReducer = combineReducers({
    home: HomeReducer,
    categories: CategoriesReducer2,
    collectiveData: CollectiveDataReducer,
    employees: EmployeeReducer,
    location: LocationReducer,
    user: UserReducer,
    category2: CategoriesReducer2
});

export default rootReducer;
