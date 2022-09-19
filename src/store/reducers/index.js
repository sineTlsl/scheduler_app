import {combineReducers} from 'redux';
import User from './user_reducer';
import Cals from './cal_reducer';

const rootReducer = combineReducers({
  User,
  Cals,
});

export default rootReducer;
