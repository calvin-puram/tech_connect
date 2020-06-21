import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../redux';
import Spinner from '../layouts/Spinner';
import ProfileItems from './ProfileItems';
import PropTypes from 'prop-types';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (loading && profiles.length === 0) {
    return <Spinner loading={loading} />;
  } else {
    return (
      !loading &&
      profiles.length > 0 && (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {!loading && profiles.length > 0 ? (
              profiles.map(pro => <ProfileItems key={pro._id} profile={pro} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )
    );
  }
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfiles: () => dispatch(getProfiles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
