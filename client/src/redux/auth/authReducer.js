import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from './authTypes';

const initState = {
  user: null,
  loading: true,
  isAuthenticated: null,
  token: localStorage.getItem('token')
};

export const auth = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
        isAuthenticated: true
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: null,
        user: null,
        token: null
      };
    default:
      return state;
  }
};
