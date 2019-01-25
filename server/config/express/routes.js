const {join} = require('path');
const createError = require('http-errors');

module.exports = app => {
  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });

  app.route('/*')
    .get((req, res) => res.sendFile(join(__dirname, '..', '..', '..', 'client', 'index.html')));
};
