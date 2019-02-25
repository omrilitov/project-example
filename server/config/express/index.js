const express = require('express');
const helmet = require('helmet');
const {urlencoded, json} = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const passport = require('passport');
const jsonErrorHandler = require('express-json-error-handler').default;
const als = require('async-local-storage');
const addRequestId = require('express-request-id');
const responseTime = require('response-time');
const {addContext} = require('pino-context');
const logger = require('pino-context')();
const requestLogger = require('./request-logger');
const routes = require('./routes');

als.enable();
module.exports = () => {
  const app = express();

  app.use(helmet());
  app.use(urlencoded({extended: false}));
  app.use(json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(compression());
  app.use(passport.initialize());
  app.use(addRequestId());
  app.use((req, res, next) => {
    als.scope();
    addContext('requestId', req.id);
    addContext('requestUrl', req.url);
    next();
  });
  app.use(requestLogger());
  app.use(responseTime((req, res, time) => {
    req.responseTime = time;
  }));

  routes(app);

  app.use(jsonErrorHandler({
    log ({err}) {
      logger.error(err);
    }
  }));

  return app;
};
