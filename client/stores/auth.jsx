import {observable, action, computed} from "mobx";
import axios from "axios";

export default class AuthStore {
  @observable user;
  @observable token;

  @computed get isLoggedIn() {
    return this.token && this.user;
  }

  @action.bound
  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.user = null;
  }

  @action.bound
  async localLogin({email, password}) {
    return axios.post('/auth/local', {
      email,
      password
    })
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      this.token = data.token;

      return this.loadUser();
    })
    .catch(err => {
      this.logout();
    });
  }

  async loadUser() {
    return axios.get('/api/users/me')
    .then(({data}) => {
      this.user = data;
    })
    .catch(err => {
      this.logout();
    })
  }
}
