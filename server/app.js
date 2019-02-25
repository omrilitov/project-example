require('dotenv-extended/config');
const logger = require('pino-context')();
const createApp = require('./config/express');
const connect = require('./config/mongoose');

const app = createApp();
const port = process.env.PORT;

const server = app.listen(port, () => {
  logger.info(`Express listening on port ${port}`);
});

connect();

module.exports = server;
