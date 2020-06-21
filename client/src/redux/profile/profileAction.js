import {
  GET_PROFILE,
  GET_PROFILES,
  GET_SINGLE_PROFILE,
  PROFILE_FAILURE,
  CREATE_PROFILE,
  CREATE_EXPERIENCE,
  CLEAR_PROFILE,
  CREATE_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_ACCOUNT,
  GITHUB_PROFILE
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
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

// get profiles
export const getProfiles = () => async dispatch => {
  try {
    const res = await api.get('/profile/');

    if (res && res.data.success) {
      dispatch({
        type: GET_PROFILES,
        payload: res.data.data
      });
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

// get single user profile
export const getSingleUserProfile = userId => async dispatch => {
  try {
    const res = await api.get(`/profile/user/${userId}`);

    if (res && res.data.success) {
      dispatch({
        type: GET_SINGLE_PROFILE,
        payload: res.data.data
      });
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

// get  profile github
export const getProfileGithub = userName => async dispatch => {
  try {
    const res = await api.get(`/profile/github/${userName}`);

    if (res && res.data.success) {
      dispatch({
        type: GITHUB_PROFILE,
        payload: res.data.data
      });
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
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
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
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
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

// delete experience
export const deleteExperince = expId => async dispatch => {
  try {
    const res = await api.delete(`/profile/experience/${expId}`);

    if (res && res.data.success) {
      dispatch({
        type: DELETE_EXPERIENCE,
        payload: res.data.data
      });

      dispatch(setAlert('profile experience remove successfully!', 'success'));
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

// add education
export const addEducation = (data, history) => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await api.put('/profile/education', body);

    if (res && res.data.success) {
      dispatch({
        type: CREATE_EDUCATION,
        payload: res.data.data
      });

      dispatch(setAlert('profile education added successfully!', 'success'));
    }
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

// delete education
export const deleteEducation = eduId => async dispatch => {
  try {
    const res = await api.delete(`/profile/education/${eduId}`);

    if (res && res.data.success) {
      dispatch({
        type: DELETE_EDUCATION,
        payload: res.data.data
      });

      dispatch(setAlert('profile education removed successfully!', 'success'));
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: PROFILE_FAILURE,
      payload: errors
    });
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }
  }
};

// delete account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('are you sure you want to perform this action?')) {
    try {
      const res = await api.delete(`/profile`);

      if (res && res.data.success) {
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: DELETE_ACCOUNT });

        dispatch(setAlert('your account is deleted successfully!', 'success'));
      }
    } catch (err) {
      const errors = err.response.data.error;
      dispatch({
        type: PROFILE_FAILURE,
        payload: errors
      });
      if (errors) {
        dispatch(setAlert(errors, 'danger'));
      }
    }
  }
};
