import {
  CREATE_POST,
  POST_FAILURE,
  GET_POSTS,
  LIKE_POSTS,
  POST_LIKE_FAILURE,
  UNLIKE_POSTS,
  DELETE_POST,
  GET_POST,
  POST_COMMENT,
  DELETE_COMMENT
} from './postsTypes';
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

// get post
export const getPost = postId => async dispatch => {
  try {
    const res = await api.get(`/posts/${postId}`);

    if (res && res.data.success) {
      dispatch({
        type: GET_POST,
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

//  post comment
export const postComment = (postId, text) => async dispatch => {
  const body = JSON.stringify(text);
  try {
    const res = await api.post(`/posts/comment/${postId}`, body);

    if (res && res.data.success) {
      dispatch({
        type: POST_COMMENT,
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

//  delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await api.delete(`/posts/comment/${postId}/${commentId}`);

    if (res && res.data.success) {
      dispatch({
        type: DELETE_COMMENT,
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

// like post
export const addLikes = postId => async dispatch => {
  const res = await api.put(`/posts/like/${postId}`);

  if (res && res.data.success) {
    dispatch({
      type: LIKE_POSTS,
      payload: { postId, likes: res.data.data }
    });
  }

  if (res && res.data.success === false) {
    dispatch({
      type: POST_LIKE_FAILURE,
      payload: { postId, likes: res.data.data }
    });
    dispatch(setAlert('Post Already Liked', 'success'));
  }
};

// unlike post
export const unLikePost = postId => async dispatch => {
  const res = await api.put(`/posts/unlike/${postId}`);

  if (res && res.data.success) {
    dispatch({
      type: UNLIKE_POSTS,
      payload: { postId, likes: res.data.data }
    });
  }

  if (res && res.data.success === false) {
    dispatch({
      type: POST_LIKE_FAILURE,
      payload: { postId, likes: res.data.data }
    });
    dispatch(setAlert('Post Already unLiked', 'success'));
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

// delete post
export const deletePost = postId => async dispatch => {
  try {
    const res = await api.delete(`/posts/${postId}`);

    if (res && res.data.success) {
      dispatch({
        type: DELETE_POST,
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
