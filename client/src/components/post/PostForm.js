import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../redux';
import PropTypes from 'prop-types';

const PostForm = ({ postId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postComment(postId, { text }));
    setText('');
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment the post"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  postId: PropTypes.string.isRequired
};

export default PostForm;
