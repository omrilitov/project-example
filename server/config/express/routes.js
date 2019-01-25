const {join} = require('path');
const createError = require('http-errors');

const userRoute = require('../../api/user');

module.exports = app => {
  app.use('/api/users', userRoute);

  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });

  app.route('/*')
    .get((req, res) => res.sendFile(join(__dirname, '..', '..', '..', 'client', 'index.html')));
};
