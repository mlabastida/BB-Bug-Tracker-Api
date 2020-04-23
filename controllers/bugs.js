const Bug = require('../models/Bug');

// @desc    Get all bugs
// @route   GET /api/v1/bugs
// @access  Private
exports.getBugs = (req, res, next) => {
  Bug.query().then((bugs) => {
    res.json(bugs);
  });
  //res.status(200).json({ success: true, msg: 'json' });
};

// @desc    Get single bugs
// @route   GET /api/v1/bugs/:id
// @access  Private
exports.getBug = (req, res, next) => {
  const id = parseInt(req.params.id);
  Bug.query()
    .findById(id)
    .then((bugs) => {
      res.json(bugs);
    });
};

// @desc    Crate new bug
// @route   POST /api/v1/bugs/:id
// @access  Private
exports.createBug = async (req, res, next) => {
  const bug = await Bug.query().insert(req.body);

  res.status(201).json({
    success: true,
    data: bug,
  });
};

// @desc    Update bug
// @route   PUT /api/v1/bugs/:id
// @access  Private
exports.updateBug = (req, res, next) => {
  const id = parseInt(req.params.id);

  //  const bug = await Bug.query().findById(id).patch(req.body)

  console.log(req.body);
  Bug.query()
    .findById(id)
    .patch(req.body)
    .returning('*')
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
    .then((updatedRecord) => {
      res.status(200).json(updatedRecord);
    });
};

// @desc    Delete bug
// @route   DELETE /api/v1/bugs/:id
// @access  Private
exports.deleteBug = (req, res, next) => {
  const id = parseInt(req.params.id);
  Bug.query()
    .deleteById(id)
    .then(() => {
      res.status(200).json({ success: true, id: req.params.id });
    });
};
