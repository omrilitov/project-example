const onHeaders = require('on-headers');
const _ = require('lodash');
const logger = require('../../common/logger');

module.exports = (getOptions = _.noop) => (req, res, next) => {
  const {excludes = []} = getOptions(req) || {};
  const ip = req.ips.length ? req.ips[0] : req.ip;
  const data = {
    pid: process.pid,
    ip,
    method: req.method,
    url: req.url,
    headers: _.omit(req.headers, ['authorization'])
  };

  if (['POST', 'PUT'].includes(req.method)) {
    data.body = req.body;
  }

  logger.info(_.omit(data, excludes), 'incoming request');

  onHeaders(res, () => {
    logger.info({
      duration: req.responseTime,
      status: res.statusCode,
      headers: res.getHeaders()
    }, 'outgoing response');
  });

  next();
};
