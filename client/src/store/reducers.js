// reducers.js
import { combineReducers } from 'redux';
import HomeReducer from '../scenes/Home/reducers';
import RegisterReducer from '../scenes/Register/reducers';
import LoginReducer from '../scenes/Login/reducers';

const rootReducer = combineReducers({
    home: HomeReducer,
    register: RegisterReducer,
    loggedInUser: LoginReducer
});

export default rootReducer;
