require('dotenv-extended/config');
const createApp = require('./config/express');
const logger = require('./common/logger');

const app = createApp();
const port = process.env.PORT;
const server = app.listen(port, () => {
  logger.info(`Express listening on port ${port}`);
});

module.exports = server;
