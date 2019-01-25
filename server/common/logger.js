const pino = require('pino');
const httpContext = require('express-http-context');
const createWrapper = require('./logger.wrapper');

// Override the default logger to add the http-context of logger
const logMethodHandler = target => (...args) => {
  const meta = httpContext.get('logger') || {};
  const [firstArg, ...rest] = args;
  let finalArgList;

  if (typeof firstArg === 'string') {
    // Log was called only with message, no local context
    finalArgList = [{meta}, firstArg, ...rest];
  }
  else {
    // Log was called local context, so we merge it into clsContext
    finalArgList = [{meta, ...firstArg}, ...rest];
  }

  return target(...finalArgList);
};

module.exports = createWrapper(pino(), logMethodHandler);
