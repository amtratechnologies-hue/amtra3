export function successResponse(message, data = null) {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(message, errors) {
  const body = {
    success: false,
    message,
  };

  if (Array.isArray(errors) && errors.length > 0) {
    body.errors = errors;
  }

  return body;
}
