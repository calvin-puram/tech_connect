import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = () => {
  const alert = useSelector(state => state.alert.error);

  return (
    alert && (
      <div className={`alert alert-${alert.alertClass}`}>{alert.msg}</div>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired
};
export default Alert;
