import { CREATE_POST, POST_FAILURE, GET_POSTS } from './postsTypes';
import api from '../../utils/api';
import { setAlert } from '../alert/alertAction';

// get all post
export const getPosts = () => async dispatch => {
  try {
    const res = await api.get('/posts');

    if (res && res.data.success) {
      dispatch({
        type: GET_POSTS,
        payload: res.data.data
      });
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: POST_FAILURE,
      payload: errors
    });
  }
};
// create post
export const createPost = data => async dispatch => {
  const body = JSON.stringify(data);
  try {
    const res = await api.post('/posts', body);

    if (res && res.data.success) {
      dispatch({
        type: CREATE_POST,
        payload: res.data.data
      });

      dispatch(setAlert('post created successfully!', 'success'));
    }
  } catch (err) {
    const errors = err.response.data.error;
    dispatch({
      type: POST_FAILURE,
      payload: errors
    });
  }
};
