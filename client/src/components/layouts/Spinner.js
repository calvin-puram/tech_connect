import React, { Fragment } from 'react';
import spinner from './spinner.gif';
import PropTypes from 'prop-types'



const Spinner = ({loading}) => {
  return (
    loading && (
      <Fragment>
        <img
          src={spinner}
          style={{ width: '200px', margin: 'auto', display: 'block' }}
          alt="Loading..."
        />
      </Fragment>
    )
  );
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default Spinner;
