// @desc    Get all bugs
// @route   GET /api/v1/bugs
// @access  Private
exports.getBugs = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Get all bugs' });
};

// @desc    Get single bugs
// @route   GET /api/v1/bugs/:id
// @access  Private
exports.getBug = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Get bug ${req.params.id}` });
};

// @desc    Crate new bug
// @route   POST /api/v1/bugs/:id
// @access  Private
exports.createBug = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new bug' });
};

// @desc    Update bug
// @route   PUT /api/v1/bugs/:id
// @access  Private
exports.updateBug = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update bug ${req.params.id}` });
};

// @desc    Delete bug
// @route   DELETE /api/v1/bugs/:id
// @access  Private
exports.deleteBug = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete bug ${req.params.id}` });
};
