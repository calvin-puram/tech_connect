const asyncHandler = require('../middleware/async');

//@desc       Get Posts
//@route      POST api/v1/posts
//@access     private
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'test'
  });
});
