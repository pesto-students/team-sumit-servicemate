// reducers.js
import { combineReducers } from 'redux';
import HomeReducer from '../scenes/Home/reducers';

const rootReducer = combineReducers({
    home: HomeReducer
});

export default rootReducer;
