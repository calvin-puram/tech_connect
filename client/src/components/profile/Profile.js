import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getSingleUserProfile } from '../../redux';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import PropTypes from 'prop-types';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  profile: { profile, loading },
  auth,
  getSingleUserProfile
}) => {
  useEffect(() => {
    getSingleUserProfile();
  }, [getSingleUserProfile, loading]);

  if (loading && profile === null) {
    return <Spinner loading={loading} />;
  } else {
    return (
      profile !== null &&
      !loading && (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {!auth.loading &&
            auth.isAuthenticated &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {/* Experience  */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile !== null && profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(exp => {
                    return <ProfileExperience key={exp._id} exp={exp} />;
                  })}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            {/* Education  */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile !== null && profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(edu => {
                    return <ProfileEducation key={edu._id} edu={edu} />;
                  })}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub userName={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )
    );
  }
};

Profile.propTypes = {
  getSingleUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSingleUserProfile: () =>
      dispatch(getSingleUserProfile(ownProps.match.params.id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
