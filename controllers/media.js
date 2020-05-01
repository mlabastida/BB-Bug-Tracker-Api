const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const Media = require('../models/media');

// @desc    Crate new media
// @route   POST /api/v1/media
// @access  Private
exports.createMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.query().insert(req.body);

  res.status(200).json({
    success: true,
    data: media,
  });
});

// @desc    Delete media
// @route   DELETE /api/v1/media/:id
// @access  Private
exports.deleteMedia = asyncHandler(async (req, res, next) => {
  const media = await Media.query().deleteById(req.params.id);

  if (!media) {
    return next(
      new ErrorResponse(`Media not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
