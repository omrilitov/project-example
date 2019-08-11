import {observable, action, computed, runInAction, decorate} from "mobx";

export default class AuthStore {
  user;
  loggingIn;
  rest;

  constructor(rest) {
    this.rest = rest;

    if (localStorage.getItem('token')){
      this.loadUser();
    }
  }

  @action.bound
  logout() {
    localStorage.removeItem('token');
    this.loggingIn = false;
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
      this.loggingIn = true;
      const {data} = await this.rest.client.get('/users/me');

      runInAction(() => {
        this.loggingIn = false;
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
