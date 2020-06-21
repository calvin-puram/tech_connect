import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile }) => {
  return (
    profile !== null && (
      <Fragment>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">
            {profile.user.name.split(' ')[0]}'s Bio
          </h2>
          <p>{profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.skills.map(skill => {
              return (
                <div className="p-1" key={skill}>
                  <i className="fa fa-check"></i> {skill}
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    )
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
