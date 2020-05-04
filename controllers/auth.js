const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// @desc        Register User
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.query().insert(req.body);

  // Create token
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
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
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});
