import { SET_ALERT, REMOVE_ALERT } from './alertTypes';

const initState = {
  error: null
};

export const alert = (state = initState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        error: action.payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
