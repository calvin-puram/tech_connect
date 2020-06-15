const gravatar = require('gravatar');
const Users = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//send token via cookie and response body
const sendToken = async function(user, statusCode, res) {
  const token = await user.getJwtToken();

  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token
  });
};

//@desc       POST Create Users
//@route      POST api/v1/auth/register
//@access     public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, passwordConfirm } = req.body;

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  });

  const user = await Users.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
    avatar
  });

  sendToken(user, 200, res);
});

//@desc       POST login Users
//@route      POST api/v1/auth/login
//@access     public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse('email and password fields are required', 400)
    );
  }

  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(user.password, password))) {
    return next(
      new ErrorResponse(
        'Invalid Credencials or email not Registered on this platform',
        401
      )
    );
  }

  sendToken(user, 200, res);
});

//@desc       Get logged in Users
//@route      GET api/v1/auth/me
//@access     private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});
