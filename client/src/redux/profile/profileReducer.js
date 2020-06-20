import {
  GET_PROFILE,
  PROFILE_FAILURE,
  CLEAR_PROFILE,
  CREATE_PROFILE
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
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        profile: null
      };
    case CREATE_PROFILE:
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
