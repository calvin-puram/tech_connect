import {
  CREATE_POST,
  POST_FAILURE,
  GET_POSTS,
  LIKE_POSTS,
  UNLIKE_POSTS,
  POST_LIKE_FAILURE,
  DELETE_POST
} from './postsTypes';

const initState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export const posts = (state = initState, action) => {
  switch (action.type) {
    case LIKE_POSTS:
    case UNLIKE_POSTS:
    case POST_LIKE_FAILURE:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        )
      };
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
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: action.payload
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
