const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const path = require('path');
const Media = require('../models/media');
const Bug = require('../models/bug');

// @desc    Crate new media
// @route   POST /api/v1/media
// @access  Private
exports.createMedia = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse('Select a file', 400));
  }

  const file = req.files.file;

  // Check if is photo or video
  if (
    !file.mimetype.startsWith('image') &&
    !file.mimetype.startsWith('video')
  ) {
    return next(new ErrorResponse('Select an image or video', 400));
  }

  // Check size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`Size limit is ${process.env.MAX_FILE_UPLOAD}`, 400)
    );
  }

  const ext = path.parse(file.name).ext.substring(1);

  const media = await Media.query().insert({
    bug_id: req.params.bug_id,
    type: ext,
  });

  // Create custum filename
  file.name = `${media.id}.${ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }
  });

  res.status(200).json({
    success: true,
    data: file.name,
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

// @desc    Upload media
// @route   GET /api/v1/bugs/:id/upload
// @access  Private

exports.mediaUpload = asyncHandler(async (req, res, next) => {
  bug = await Bug.query().findById(req.params.id);

  if (!bug) {
    return next(
      new ErrorResponse(`Bug not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('Select a file', 400));
  }

  res.status(200).json({ success: true, data: {} });
});
