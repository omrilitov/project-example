const express = require('express');
const helmet = require('helmet');
const {urlencoded, json} = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const jsonErrorHandler = require('express-json-error-handler').default;
const httpContext = require('express-http-context');
const uuidv4 = require('uuid/v4');
const logger = require('../../common/logger');
const routes = require('./routes');

module.exports = () => {
  const app = express();

  app.use(helmet());
  app.use(urlencoded({extended: false}));
  app.use(json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(compression());
  app.use(httpContext.middleware);
  app.use((req, res, next) => {
    const uuid = uuidv4();

    res.setHeader('X-Request-Id', uuid);
    logger.addMeta('requestId', uuid);
    logger.addMeta('requestUrl', req.url);
    next();
  });

  routes(app);

  app.use(jsonErrorHandler({
    log ({err}) {
      logger.error(err);
    }
  }));

  return app;
};
