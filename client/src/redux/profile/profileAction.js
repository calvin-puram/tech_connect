import { GET_PROFILE, PROFILE_FAILURE } from './profileTypes';
import api from '../../utils/api';
import { setAlert } from '../alert/alertAction';

export const getProfile = () => async dispatch => {
  try {
    const res = await api.get('/profile/me');

    if (res && res.data.success) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data.data
      });
    }
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }

    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
  }
};
