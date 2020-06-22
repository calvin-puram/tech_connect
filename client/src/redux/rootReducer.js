import { combineReducers } from 'redux';
import { auth } from './auth/authReducer';
import { alert } from './alert/alertReducer';
import { profile } from './profile/profileReducer';
import { posts } from './posts/postsReducer';

export const rootReducer = combineReducers({
  auth,
  alert,
  profile,
  posts
});
