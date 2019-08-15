require('dotenv-extended/config');
const logger = require('pino-context')();
const createApp = require('./config/express');
const configSocket = require('./config/socket');
const connect = require('./config/mongoose');

const port = process.env.PORT;
const app = createApp();

const mongoStarted = connect();
const expressStarted = new Promise(resolve => {
  const server = app.listen(port, () => {
    logger.info(`Express listening on port ${port}`);
    resolve();
  });

  configSocket(server);
});

module.exports = {
  app,
  started: Promise.all([mongoStarted, expressStarted])
};
