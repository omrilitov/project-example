const createError = require('http-errors');

const userRoute = require('../../api/user');
const authRoute = require('../../auth');

module.exports = app => {
  app.use('/api/users', userRoute);

  app.use('/auth', authRoute);

  app.use((req, res, next) => {
    next(createError(404));
  });
};
