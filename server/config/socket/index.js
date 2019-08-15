const socketio = require('socket.io');
const socketioJwt = require('socketio-jwt');
const als = require('async-local-storage');
const {addContext} = require('pino-context');
const uuidv4 = require('uuid/v4');
const logger = require('pino-context')();

module.exports = server => {
  const io = socketio(server, {
    serveClient: false,
    path: '/ws'
  });

  io.on('connection', socketioJwt.authorize({
    secret: process.env.SECRET
  }));

  io.on('connection', socket => {
    socket.use((packet, next) => {
      als.scope();
      addContext('socketId', socket.id);
      addContext('messageId', uuidv4());
      next();
    });
  });

  io.on('authenticated', socket => {
    logger.info(`new socket connected from user: ${socket.decoded_token._id}`);
  });
};
