const {Router} = require('express');
const passport = require('passport');
const {signToken} = require('../auth.service');
const User = require('../../api/user/model');

passport.use(User.createStrategy());

const router = new Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      return next(err);
    }

    if (info) {
      info.status = status || 401; // eslint-disable-line no-param-reassign

      return next(info);
    }

    return res.json({token: signToken(user._id)});
  })(req, res, next);
});

module.exports = router;
