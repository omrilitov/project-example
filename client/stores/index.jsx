import {RouterStore} from 'mobx-react-router';
import AuthStore from './auth';
import RestStore from './rest';
import SocketStore from './socket';

export const createStore = () => {
  const rest = new RestStore();
  const socket = new SocketStore();

  return {
    socket,
    auth: new AuthStore(rest, socket),
    rest,
    routing: new RouterStore()
  };
};
