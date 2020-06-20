import {
  GET_PROFILE,
  PROFILE_FAILURE,
  CREATE_PROFILE,
  CREATE_EXPERIENCE
} from './profileTypes';
import api from '../../utils/api';
import { setAlert } from '../alert/alertAction';

// get profile
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

// create profile
export const createProfile = (
  data,
  history,
  edit = false
) => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await api.post('/profile', body);

    if (res && res.data.success) {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data.data
      });

      dispatch(
        setAlert(edit ? 'profile updated' : 'profile created', 'success')
      );
    }
    history.push('/dashboard');
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

// add experience
export const addExperince = (data, history) => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await api.put('/profile/experience', body);

    if (res && res.data.success) {
      dispatch({
        type: CREATE_EXPERIENCE,
        payload: res.data.data
      });

      dispatch(setAlert('profile experince added successfully!', 'success'));
    }
    history.push('/dashboard');
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
