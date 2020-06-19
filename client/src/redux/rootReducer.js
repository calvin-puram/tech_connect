import { combineReducers } from 'redux';
import { auth } from './auth/authReducer';
import { alert } from './alert/alertReducer';
import { profile } from './profile/profileReducer';

export const rootReducer = combineReducers({
  auth,
  alert,
  profile
});
