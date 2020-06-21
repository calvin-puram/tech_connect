import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import PropTypes from 'prop-types';

const ProfileExperience = ({ exp }) => {
  return (
    <div>
      <h3 className="text-dark">{exp.company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {!exp.to ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {exp.title}
      </p>
      <p>
        <strong>Description: </strong>
        {exp.description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  exp: PropTypes.object.isRequired
};
export default ProfileExperience;
