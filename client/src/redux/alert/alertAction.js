import { SET_ALERT, REMOVE_ALERT } from './alertTypes';

export const setAlert = (msg, alertClass, timeOut = 5000) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertClass }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT
      }),
    timeOut
  );
};
