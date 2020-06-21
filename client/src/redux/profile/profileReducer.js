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
  GET_PROFILES
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
    case CREATE_PROFILE:
    case CREATE_EXPERIENCE:
    case CREATE_EDUCATION:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
    case GET_SINGLE_PROFILE:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload
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
