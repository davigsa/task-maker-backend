const errorHandler = (
  error,
  request,
  response,
  next
) => {
  const status = error.statusCode || 500

  response.status(status).send(error)
}

module.exports = errorHandler