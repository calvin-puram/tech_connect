import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostItems = ({ post }) => {
  const auth = useSelector(state => state.auth);

  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img class="round-img" src={post.avatar} alt="user profile" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{post.text}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{moment.utc(post.date)}</Moment>
        </p>

        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>{' '}
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </button>

        {post.likes.length > 0 && (
          <button type="button" class="btn btn-light">
            <i class="fas fa-thumbs-down"></i>
          </button>
        )}

        <Link to={`post/${post._id}`} class="btn btn-primary">
          Discussion
          {post.comments.length > 0 && (
            <span class="comment-count">{post.comments.length}</span>
          )}
        </Link>

        {!auth.loading && auth.isAuthenticated && auth.user._id === post.user && (
          <button type="button" class="btn btn-danger">
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItems.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItems;
