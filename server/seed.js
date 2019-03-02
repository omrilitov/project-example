require('dotenv-extended/config');
const mongoose = require('mongoose');
const logger = require('pino-context')();
const connect = require('./config/mongoose');
const User = require('./api/user/model');

const seedUsers = async () => {
  await User.deleteMany({});
  await User.create({
    email: 'omrilitov@gmail.com',
    name: {first: 'Omri', last: 'Litov'},
    password: '123'
  });
};

connect()
  .then(async () => {
    await seedUsers();
    mongoose.connection.close();
    logger.info('Seed is successful');
    process.exit(0);
  })
  .catch(error => {
    logger.error({error});
    mongoose.connection.close();
    process.exit(1);
  });
