import { RouterStore } from 'mobx-react-router';
import AuthStore from './auth';
import RestStore from './rest';

export const createStore = () => {
  const rest = new RestStore();

  return {
    auth: new AuthStore(rest),
    rest,
    routing: new RouterStore()
  }
};
