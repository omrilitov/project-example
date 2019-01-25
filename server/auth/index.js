const {Router} = require('express');
const localRoute = require('./local');

const router = new Router();

router.use('/local', localRoute);

module.exports = router;
