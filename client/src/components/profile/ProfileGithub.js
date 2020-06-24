import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getProfileGithub } from '../../redux';
import PropTypes from 'prop-types';


const ProfileGithub = ({
  userName,
  profileGithub,
  profile: { repos, loading }
}) => {
  useEffect(() => {
    profileGithub();
  }, [userName, profileGithub, loading]);

  return (
    <Fragment>
      <h2 className="text-primary text-center my-1">Github Repos</h2>
      {!loading && repos.length > 0 ? (
        repos.map(repo => (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h4 className="text-center my-1">
          No Github Repo Found with this username
        </h4>
      )}
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  userName: PropTypes.string.isRequired,
  profileGithub: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    profileGithub: () => dispatch(getProfileGithub(ownProps.userName))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
