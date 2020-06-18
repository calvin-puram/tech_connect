import { combineReducers } from 'redux';
import { auth } from './auth/authReducer';
import { alert } from './alert/alertReducer';

export const rootReducer = combineReducers({
  auth,
  alert
});
