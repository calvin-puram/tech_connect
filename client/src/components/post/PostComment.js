import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const PostComment = ({
  comment: { _id, text, name, avatar, user, date },
  postId
}) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => dispatch(deleteComment(postId, _id))}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostComment;
