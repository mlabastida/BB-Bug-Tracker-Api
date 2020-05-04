const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const Bug = require('../models/Bug');

// @desc    Get all bugs
// @route   GET /api/v1/bugs
// @access  Private
exports.getBugs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult);
});

// @desc    Get single bugs
// @route   GET /api/v1/bugs/:id
// @access  Private
exports.getBug = asyncHandler(async (req, res, next) => {
  bug = await Bug.query().findById(req.params.id);

  if (!bug) {
    return next(
      new ErrorResponse(`Bug not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bug });
});

// @desc    Crate new bug
// @route   POST /api/v1/bugs/:id
// @access  Private
exports.createBug = asyncHandler(async (req, res, next) => {
  const bug = await Bug.query().insert(req.body);

  res.status(200).json({
    success: true,
    data: bug,
  });
});

// @desc    Update bug
// @route   PUT /api/v1/bugs/:id
// @access  Private
exports.updateBug = asyncHandler(async (req, res, next) => {
  const bug = await Bug.query()
    .findById(req.params.id)
    .patch(req.body)
    .returning('*');

  if (!bug) {
    return next(
      new ErrorResponse(`Bug not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bug,
  });
});

// @desc    Delete bug
// @route   DELETE /api/v1/bugs/:id
// @access  Private
exports.deleteBug = asyncHandler(async (req, res, next) => {
  const bug = await Bug.query().deleteById(req.params.id);

  if (!bug) {
    return next(
      new ErrorResponse(`Bug not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
