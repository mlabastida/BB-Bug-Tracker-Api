const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// @desc        Register User
// @route       POST /api/v1/auth/register
// @access      Private
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.query().insert(req.body);

  // Create token
  sendTokenResponse(user, 200, res);
});

// @desc        Login User
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password)
    return next(new ErrorResponse('Please provide an email and password', 400));

  // Check for user
  const user = await User.query().findOne({ email: email });
  if (!user) return next(new ErrorResponse('Invalid credentials', 401));

  // Match passwords
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

  // Create token
  sendTokenResponse(user, 200, res);
});

// @desc        Get current logged in user
// @route       POST /api/v1/auth/me
// @access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.query().findById(req.user.id);
  delete user.password;
  res.status(200).json({
    success: true,
    data: user,
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };

  if (process.env_NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
