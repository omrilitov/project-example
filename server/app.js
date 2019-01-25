require('dotenv-extended/config');
const createApp = require('./config/express');

const app = createApp();
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

module.exports = server;
