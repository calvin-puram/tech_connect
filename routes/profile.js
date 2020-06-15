const express = require('express');

const router = express.Router();
const { protect } = require('../middleware/protect');
const {
  getProfile,
  createProfile,
  getProfiles,
  getSingleProfile,
  deleteProfile,
  updateExperience,
  deleteExperience,
  updateEducation,
  deleteEducation,
  githubProfile
} = require('../controllers/profile');

router.get('/', getProfiles);
router.get('/user/:user_id', getSingleProfile);
router.get('github/:username', githubProfile);

router.use(protect);
router.get('/me', getProfile);
router.post('/', createProfile);
router.delete('/', deleteProfile);
router.put('/experience', updateExperience);
router.delete('/experience/:exp_id', deleteExperience);
router.put('/education', updateEducation);
router.put('/education/:edu_id', deleteEducation);

module.exports = router;
