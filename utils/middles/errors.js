import boom from "@hapi/boom";
import isRequestAjaxOrApi from "./ajaxorapi";


function withErrorStack(err, stack) {
    return {
        ...err,
        stack
    }
}

function logErrors(err, req, res, next) {
    // Sentry.captureException(err);
    console.log(err.stack)
    next(err)
}

function wrapErros(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err))
    }

    next(err)
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: {
            statusCode,
            payload
        }
    } = err

    if (isRequestAjaxOrApi(req) || res.headersSent) {
        res
            .status(statusCode)
            .json(withErrorStack(payload, err.stack))
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    const {
        output: {
            statusCode,
            payload
        }
    } = err

    res.status(statusCode)
    res.render("error", withErrorStack(payload, err.stack))

}

module.exports = {
    logErrors,
    wrapErros,
    clientErrorHandler,
    errorHandler
}
