const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const createError = require('http-errors');
const User = require('../api/user/model');

const secret = process.env.SECRET;
const validateJwt = promisify(expressJwt({
  secret
}));

exports.isAuthenticated = () => {
  return [validateJwt, async req => {
    const user = await User.findById(req.user._id);

    if (!user) {
      return Promise.reject(createError(401));
    }

    req.user = user;
  }];
};

exports.signToken = (_id, expiresIn = '7d') => {
  return jwt.sign({_id}, secret, {expiresIn});
};
