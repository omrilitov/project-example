const User = require('./model');

exports.index = () => {
  return User.find({});
};

exports.me = ({user}) => {
  return user;
};
