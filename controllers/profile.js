const axios = require('axios');
const normalize = require('normalize-url');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.user.id
  }).populate('user', ['name', 'avatar']);

  if (!profile) {
    return next(new ErrorResponse('There is no profile for this user', 400));
  }

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook
  } = req.body;

  const profileFields = {
    user: req.user.id,
    company,
    location,
    website:
      website && website !== '' ? normalize(website, { forceHttps: true }) : '',
    bio,
    skills: Array.isArray(skills)
      ? skills
      : skills.split(',').map(skill => ` ${skill.trim()}`),
    status,
    githubusername
  };

  // Build social object and add to profileFields
  const socialfields = { youtube, twitter, instagram, linkedin, facebook };

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(socialfields)) {
    if (value && value.length > 0)
      socialfields[key] = normalize(value, { forceHttps: true });
  }
  profileFields.social = socialfields;

  // Using upsert option (creates new doc if no match is found):
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, upsert: true }
  );

  res.status(201).json({
    success: true,
    data: profile
  });
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate('user', ['name', 'avatar']);
  res.status(200).json({
    success: true,
    data: profiles
  });
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
exports.getSingleProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.user_id
  }).populate('user', ['name', 'avatar']);

  if (!profile) return next(new ErrorResponse('Profile not found', 400));

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  // Remove user posts
  await Post.deleteMany({ user: req.user.id });
  // Remove profile
  await Profile.findOneAndRemove({ user: req.user.id });
  // Remove user
  await User.findOneAndRemove({ _id: req.user.id });

  res.status(200).json({
    success: true,
    msg: 'User deleted'
  });
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
exports.updateExperience = asyncHandler(async (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  const profile = await Profile.findOne({ user: req.user.id });

  profile.experience.unshift(newExp);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const foundProfile = await Profile.findOne({ user: req.user.id });

  foundProfile.experience = foundProfile.experience.filter(
    exp => exp._id.toString() !== req.params.exp_id
  );

  await foundProfile.save();

  res.status(200).json({
    success: true,
    data: foundProfile
  });
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
exports.updateEducation = asyncHandler(async (req, res, next) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  const profile = await Profile.findOne({ user: req.user.id });

  profile.education.unshift(newEdu);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const foundProfile = await Profile.findOne({ user: req.user.id });
  foundProfile.education = foundProfile.education.filter(
    edu => edu._id.toString() !== req.params.edu_id
  );
  await foundProfile.save();

  res.status(200).json({
    success: true,
    data: foundProfile
  });
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
exports.githubProfile = asyncHandler(async (req, res, next) => {
  const uri = encodeURI(
    `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
  );
  const headers = {
    'user-agent': 'node.js',
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  };

  const gitHubResponse = await axios.get(uri, { headers });

  res.status(200).json({
    success: true,
    data: gitHubResponse.data
  });
});
