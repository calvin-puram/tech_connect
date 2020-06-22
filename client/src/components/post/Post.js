import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../redux';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostComment from './PostComment';

const Post = ({ getPost, posts: { post, loading } }) => {
  useEffect(() => {
    getPost();
  }, [getPost]);

  if (loading) {
    return <Spinner loading={loading} />;
  } else {
    return (
      <Fragment>
        <Link to="/posts" className="btn">
          Back To Posts
        </Link>
        {/* item */}
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${post.user}`}>
              <img className="round-img" src={post.avatar} alt="user profile" />
              <h4>{post.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{post.text}</p>
          </div>
        </div>
        <PostForm postId={post._id} />

        <div className="comments">
          {post.comments &&
            post.comments.length > 0 &&
            post.comments.map(comment => (
              <PostComment
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
        </div>
      </Fragment>
    );
  }
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: () => dispatch(getPost(ownProps.match.params.id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
