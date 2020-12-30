/* eslint-disable linebreak-style */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞  ' : error.stack,
  });
};
module.exports = {
  notFound,
  errorHandler,
};
