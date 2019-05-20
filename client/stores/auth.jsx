import {observable, action, computed, runInAction, decorate} from "mobx";

export default class AuthStore {
  user;
  rest;

  constructor(rest) {
    this.rest = rest;
  }

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action.bound
  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }

  @action.bound
  async localLogin({email, password}) {
    try {
      const {data} = await this.rest.auth.post('/local', {
        email,
        password
      });

      localStorage.setItem('token', data.token);

      return this.loadUser();
    } catch (e) {
      this.logout();
    }
  }

  async loadUser() {
    try {
      const {data} = await this.rest.client.get('/users/me');

      runInAction(() => {
        this.user = data;
      });
    } catch (e) {
      this.logout();
    }
  }
}

decorate(AuthStore, {
  user: observable
});
