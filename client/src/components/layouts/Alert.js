import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alert = useSelector(state => state.alert.error);

  return (
    alert && (
      <div className={`alert alert-${alert.alertClass}`}>{alert.msg}</div>
    )
  );
};

export default Alert;
