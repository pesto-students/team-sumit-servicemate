// reducers.js
import { combineReducers } from 'redux';
import HomeReducer from '../scenes/Home/reducers';
import RegisterReducer from '../scenes/Register/reducers';

const rootReducer = combineReducers({
    home: HomeReducer,
    register: RegisterReducer
});

export default rootReducer;
