const ErrorResponse = require('../utils/ErrorResponse');

const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  // Copy query
  const reqQuery = { ...req.query };

  // Exclude fields
  const removeFields = ['from', 'to', 'select', 'orderBy', 'page', 'limit'];

  removeFields.forEach((param) => {
    delete reqQuery[param];
  });

  query = model.query().where(reqQuery);

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
    query = query.select(select);
  }

  // Order
  if (req.query.orderBy) query = query.orderBy(req.query.orderBy.split(','));

  // Populate
  if (populate) {
    query = query.withGraphFetched(populate);
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;

  query = query.page(page - 1, limit);

  // Run query
  const results = await query;
  console.log(results);

  // Pagination result
  const pagination = {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  console.log(endIndex, results.results.total);

  if (endIndex < results.total) {
    pagination.next = { page: page + 1, limit };
  }

  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  if (!results.results.length) {
    return next(new ErrorResponse(`Bugs not found at page ${page}`, 404));
  }

  res.advancedResult = {
    success: true,
    count: results.results.length,
    pagination: pagination,
    data: results.results,
  };

  next();
};

module.exports = advancedResults;
