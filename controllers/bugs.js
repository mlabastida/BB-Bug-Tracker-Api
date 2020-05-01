const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const Bug = require('../models/Bug');

// @desc    Get all bugs
// @route   GET /api/v1/bugs
// @access  Private
exports.getBugs = asyncHandler(async (req, res, next) => {
  let query;
  // Copy query
  const reqQuery = { ...req.query };

  // Exclude fields
  const removeFields = ['from', 'to', 'select', 'orderBy', 'page', 'limit'];

  removeFields.forEach((param) => {
    delete reqQuery[param];
  });

  query = Bug.query().where(reqQuery);

  // Getting dates range
  const from_date = req.query.from
    ? new Date(req.query.from).toISOString()
    : '2020-01-01T00:00:00Z';

  const to_date = req.query.to
    ? new Date(
        new Date(req.query.to).getTime() + 24 * 60 * 60 * 1000 - 1
      ).toISOString()
    : new Date().toISOString();

  query = query.whereBetween('created', [from_date, to_date]);

  // Getting fields to show
  if (req.query.select) {
    const select = req.query.select.split(',');
    select.unshift('id');
    query = query.select(select, Bug.relatedQuery('media').as('media'));
  }

  // Order
  if (req.query.orderBy) query = query.orderBy(req.query.orderBy.split(','));

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;

  query = query.page(page - 1, limit);

  // Run query
  const bugs = await query.withGraphFetched('Media');
  console.log(bugs);

  // Pagination result
  const pagination = {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit + bugs.results.length;

  if (endIndex < bugs.total) {
    pagination.next = { page: page + 1, limit };
  }

  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  if (!bugs.results.length) {
    return next(new ErrorResponse(`Bugs not found at page ${page}`, 404));
  }

  res.status(200).json({
    success: true,
    count: bugs.results.length,
    pagination: pagination,
    data: bugs.results,
  });
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

  //  const bug = await Bug.query().findById(id).patch(req.body)
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
