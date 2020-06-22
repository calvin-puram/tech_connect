const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Post = require('../models/Post');
const User = require('../models/User');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
exports.createPosts = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id
  });

  const post = await newPost.save();

  res.status(200).json({
    success: true,
    data: post
  });
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  res.status(200).json({
    success: true,
    data: posts
  });
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
exports.getSinglePosts = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: post
  });
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse('Post not found', 404));
  }

  // Check user
  if (post.user.toString() !== req.user.id) {
    return next(new ErrorResponse('User not authorized', 401));
  }

  await post.remove();
  const posts = await Post.find();
  res.status(200).json({
    success: true,
    data: posts
  });
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
exports.updateLikes = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // Check if the post has already been liked
  if (post.likes.some(like => like.user.toString() === req.user.id)) {
    return next(new ErrorResponse('Post already liked', 400));
  }

  post.likes.unshift({ user: req.user.id });

  await post.save();

  res.status(200).json({
    success: true,
    data: post.likes
  });
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
exports.unlikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // Check if the post has not yet been liked
  if (!post.likes.some(like => like.user.toString() === req.user.id)) {
    return next(new ErrorResponse('Post has not yet been liked', 400));
  }

  // remove the like
  post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);

  await post.save();

  res.status(200).json({
    success: true,
    data: post.likes
  });
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
exports.createComment = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const post = await Post.findById(req.params.id);

  const newComment = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id
  };

  post.comments.unshift(newComment);

  await post.save();

  res.status(200).json({
    success: true,
    data: post
  });
});

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // Pull out comment
  const commented = post.comments.find(
    comment => comment.id === req.params.comment_id
  );
  // Make sure comment exists
  if (!commented) {
    return next(new ErrorResponse('Comment does not exist', 404));
  }
  // Check user
  if (commented.user.toString() !== req.user.id) {
    return next(new ErrorResponse('User not authorized', 401));
  }

  post.comments = post.comments.filter(
    ({ id }) => id !== req.params.comment_id
  );

  await post.save();
  const newPost = await Post.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: newPost
  });
});
