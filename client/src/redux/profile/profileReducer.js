import {
  GET_PROFILE,
  PROFILE_FAILURE,
  GET_SINGLE_PROFILE,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  GITHUB_PROFILE,
  GET_PROFILES,
  GITHUB_FAILURE
} from './profileTypes';

const initState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: null
};

export const profile = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        profile: null
      };
    case GITHUB_FAILURE:
      return {
        ...state,
        loading: false,
        repos: [],
        error: action.payload
      };

    case CREATE_PROFILE:
    case CREATE_EXPERIENCE:
    case CREATE_EDUCATION:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
    case GET_SINGLE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case GITHUB_PROFILE:
      return {
        ...state,
        loading: false,
        repos: action.payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        error: null,
        profile: null,
        profiles: [],
        repos: []
      };
    default:
      return state;
  }
};
