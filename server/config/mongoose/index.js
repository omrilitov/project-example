const mongoose = require('mongoose');
const logger = require('../../common/logger');

const timeoutP = mili => new Promise(resolve => setTimeout(resolve, mili));
const handleError = err => {
  logger.error({err});
};

const connect = () => {
  return mongoose.connect(process.env.MONGO_URI, {
    reconnectTries: Number.MAX_VALUE,
    connectTimeoutMS: 30000,
    keepAlive: true,
    useNewUrlParser: true,
    bufferMaxEntries: 0
  }).catch(() => timeoutP(5000, connect));
};

module.exports = () => {
  mongoose.Promise = Promise;
  mongoose.set('bufferCommands', false);

  mongoose.connection.once('open', () => {
    logger.info('Connected to database');
  });

  mongoose.connection.on('reconnect', () => {
    logger.info('Reconnected to database');
  });

  mongoose.connection.on('error', handleError);
  mongoose.connection.on('disconnect', handleError);
  mongoose.connection.on('reconnectedFailed', handleError);
  mongoose.connection.on('timeout', handleError);
  mongoose.connection.on('close', handleError);

  return connect();
};
