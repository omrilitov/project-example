const logger = require('../../common/logger');

exports.index = () => {
  logger.info('Called index things');

  return Promise.resolve([{name: 'Eden'}, {name: 'Omri'}]);
};
