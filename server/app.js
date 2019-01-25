require('dotenv-extended/config');
const createApp = require('./config/express');
const connect = require('./config/mongoose');
const logger = require('./common/logger');

const app = createApp();
const port = process.env.PORT;

const server = app.listen(port, () => {
  logger.info(`Express listening on port ${port}`);
});

connect();

module.exports = server;
