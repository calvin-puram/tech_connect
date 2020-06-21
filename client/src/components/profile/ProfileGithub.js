import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileGithub } from '../../redux';
import PropTypes from 'prop-types';

const ProfileGithub = ({ userName, profileGithub, repos }) => {
  useEffect(() => {
    profileGithub();
  }, [userName, profileGithub]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.map(repo => (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
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
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  userName: PropTypes.string.isRequired,
  profileGithub: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    repos: state.profile.repos
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    profileGithub: () => dispatch(getProfileGithub(ownProps.userName))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
