const {join} = require('path');
const createError = require('http-errors');

const userRoute = require('../../api/user');

const authRoute = require('../../auth');

module.exports = app => {
  app.use('/api/users', userRoute);

  app.use('/auth', authRoute);

  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });

  app.route('/*')
    .get((req, res) => res.sendFile(join(__dirname, '..', '..', '..', 'client', 'index.html')));
};
