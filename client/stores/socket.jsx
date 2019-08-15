import io from 'socket.io-client';

export default class SocketStore {
  io = null;

  constructor() {
    this.connect();
  }

  connect() {
    this.io = io({
      path: '/ws'
    });
  }

  async login(token) {
    return new Promise((resolve, reject) => {
      this.io
        .once('authenticated', () => resolve())
        .once('unauthorized', msg => reject(msg))
        .emit('authenticate', {token});
    });
  }
}
