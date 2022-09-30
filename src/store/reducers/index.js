import {combineReducers} from 'redux';
import User from './user_reducer';
import Cals from './cal_reducer';
import Todos from './todo_reducer';

const rootReducer = combineReducers({
  User,
  Cals,
  Todos,
});

export default rootReducer;
