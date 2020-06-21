import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfiles } from '../../redux';
import Spinner from '../layouts/Spinner';
import ProfileItems from './ProfileItems';

const Profiles = () => {
  const { profiles, loading } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [getProfiles]);

  if (loading) {
    return <Spinner loading={loading} />;
  } else {
    return (
      <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop" /> Browse and connect with
          developers
        </p>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles.map(pro => <ProfileItems key={pro._id} profile={pro} />)
          ) : (
            <h4>No profiles found...</h4>
          )}
        </div>
      </Fragment>
    );
  }
};

export default Profiles;
