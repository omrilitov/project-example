const {AsyncRouter} = require('express-async-router');
const {authenticate} = require('../../auth/auth.service');
const controller = require('./controller');

const router = new AsyncRouter();

router.get('/', controller.index);
router.get('/me', authenticate(), controller.me);

module.exports = router;