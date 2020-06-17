const express = require('express');

const router = express.Router();

const {
  createPosts,
  getAllPosts,
  getSinglePosts,
  deletePost,
  updateLikes,
  unlikePost,
  createComment,
  deleteComment
} = require('../controllers/posts');
const { protect } = require('../middleware/protect');

router.use(protect);
router.post('/', createPosts);
router.get('/', getAllPosts);
router.get('/:id', getSinglePosts);
router.delete('/:id', deletePost);
router.put('/like/:id', updateLikes);
router.put('/unlike/:id', unlikePost);
router.post('/comment/:id', createComment);
router.delete('/comment/:id/:comment_id', deleteComment);

module.exports = router;
