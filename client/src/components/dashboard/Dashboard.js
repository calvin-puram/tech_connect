import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../redux';

const Dashboard = ({
  profile,
  auth: { isAuthenticated, loading, user },
  getProfile
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
