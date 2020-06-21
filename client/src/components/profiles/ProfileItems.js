import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItems = ({ profile }) => {
  return (
    <Fragment>
      <div className="profiles">
        <div className="profile bg-light">
          <img
            className="round-img"
            src={profile.user.avatar}
            alt="user profile"
          />
          <div>
            <h2>{profile.user.name}</h2>
            <p>Developer at {profile.company}</p>
            <p>{profile.location}</p>
            <Link
              to={`/profile/${profile.user._id}`}
              className="btn btn-primary"
            >
              View Profile
            </Link>
          </div>

          <ul>
            {profile.skills.map(skill => (
              <li className="text-primary" key={skill}>
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItems;
