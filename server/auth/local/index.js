const {Router} = require('express');
const passport = require('passport');
const {signToken} = require('../auth.service');
const User = require('../../api/user/model');

passport.use(User.createStrategy());

const router = new Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;

    if (error) {
      const errMap = {
        'Missing credentials': 400,
        'Password or username is incorrect': 401
      };

      error.status = errMap[error.message];

      return next(error);
    }

    res.json({token: signToken(user._id)});
  })(req, res, next);
});

module.exports = router;
