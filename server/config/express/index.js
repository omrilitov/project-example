const express = require('express');
const helmet = require('helmet');
const {urlencoded, json} = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const jsonErrorHandler = require('express-json-error-handler').default;
const routes = require('./routes');

module.exports = () => {
  const app = express();

  app.use(helmet());
  app.use(urlencoded({extended: false}));
  app.use(json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(compression());

  routes(app);

  app.use(jsonErrorHandler({
    log ({err}) {
      console.error(err);
    }
  }));

  return app;
};
