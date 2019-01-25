const {AsyncRouter} = require('express-async-router');
const {isAuthenticated} = require('../../auth/auth.service');
const controller = require('./controller');

const router = new AsyncRouter();

router.get('/', controller.index);
router.get('/me', isAuthenticated(), controller.me);

module.exports = router;