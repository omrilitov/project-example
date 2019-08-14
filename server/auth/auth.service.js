const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const createError = require('http-errors');
const User = require('../api/user/model');

const secret = process.env.SECRET;

const validateJwt = promisify(expressJwt({
  secret
}));

exports.authenticate = () => {
  return [validateJwt, async req => {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw createError(401);
    }

    req.user = user; // eslint-disable-line require-atomic-updates
  }];
};

exports.signToken = (_id, expiresIn = '7d') => {
  return jwt.sign({_id}, secret, {expiresIn});
};
