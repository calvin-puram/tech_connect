import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  profile: { profile, loading },
  auth: { user },
  getProfile,
  deleteAccount
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return <Spinner loading={loading} />;
  } else {
    return (
      !loading && (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
          {!loading && profile !== null ? (
            <Fragment>
              <DashboardActions />
              <Experience />
              <Education />
              <div className="my-2">
                <button className="btn btn-danger" onClick={deleteAccount}>
                  <i className="fas fa-user-minus"></i>
                  Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {profile === null && (
                <Fragment>
                  <p>You have not yet setup a profile, please add some info</p>
                  <Link to="/create-profile" className="btn btn-primary my-1">
                    Create Profile
                  </Link>
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )
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
    getProfile: () => dispatch(getProfile()),
    deleteAccount: () => dispatch(deleteAccount())
  };
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
