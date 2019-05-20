import { RouterStore } from 'mobx-react-router';
import AuthStore from './auth';

export const createStore = () => ({
  auth: new AuthStore(),
  routing: new RouterStore()
});
