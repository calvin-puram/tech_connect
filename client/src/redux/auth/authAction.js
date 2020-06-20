import api from '../../utils/api';
import { setAlert } from '../alert/alertAction';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from './authTypes';

import { CLEAR_PROFILE } from '../profile/profileTypes';

export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth/me');
    if (res && res.data.success) {
      dispatch({
        type: USER_LOADED,
        payload: res.data.data
      });
    }
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      // set alrt
      dispatch(setAlert(errors, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = data => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await api.post('/auth/register', body);
    if (res.data && res.data.success) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token
      });

      //load user
      dispatch(loadUser());
    }
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      // set alert
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

export const login = data => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await api.post('/auth/login', body);
    if (res && res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token
      });

      dispatch(loadUser());
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch(setAlert(errors, 'danger'));
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });

  dispatch({
    type: LOGOUT
  });
};
