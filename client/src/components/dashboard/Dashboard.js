import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import Alert from '../layouts/Alert';
import DashboardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  profile: { profile, loading },
  auth: { user },
  getProfile
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return <Spinner loading={loading} />;
  } else {
    return (
      <Fragment>
        <Alert />
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        {!loading && profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience />
            <Education />
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  }
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

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
