import React, { Fragment, useEffect } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { getPosts } from '../../redux';
import PropTypes from 'prop-types';
import PostItems from './PostItems';

const Posts = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      <div className="posts">
        {posts.posts.map(post => (
          <PostItems key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => dispatch(getPosts())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
