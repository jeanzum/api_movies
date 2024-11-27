import config  from "../../config/index.js";
import boom from "@hapi/boom";


export function withErrorStack(error, stack) {
  if (config.dev == 'development') {
    return { ...error, stack };
  }

  return error;
}

export function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

export function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

export function errorHandler(err, req, res, next) { 
  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}
