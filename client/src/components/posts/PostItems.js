import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { addLikes, unLikePost, deletePost } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';

const PostItems = ({ post }) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className="round-img" src={post.avatar} alt="user profile" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">
            Posted on{' '}
            <Moment format="YYYY/MM/DD">{moment.utc(post.date)}</Moment>
          </p>

          <button
            type="button"
            className="btn btn-light"
            onClick={() => dispatch(addLikes(post._id))}
          >
            <i className="fas fa-thumbs-up"></i>{' '}
            {post.likes.length > 0 && <span>{post.likes.length}</span>}
          </button>

          {post.likes.length > 0 && (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => dispatch(unLikePost(post._id))}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
          )}

          <Link to={`post/${post._id}`} className="btn btn-primary">
            Discussion{' '}
            {post.comments.length > 0 && (
              <span className="comment-count">{post.comments.length}</span>
            )}
          </Link>

          {!auth.loading &&
            auth.isAuthenticated &&
            auth.user._id === post.user && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => dispatch(deletePost(post._id))}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
        </div>
      </div>
    </Fragment>
  );
};

PostItems.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItems;
