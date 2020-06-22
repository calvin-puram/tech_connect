import { CREATE_POST, POST_FAILURE, GET_POSTS } from './postsTypes';

const initState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export const posts = (state = initState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case CREATE_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts]
      };
    case POST_FAILURE:
      return {
        posts: [],
        post: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
