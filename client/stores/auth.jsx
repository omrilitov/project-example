import {observable, action, runInAction, decorate} from 'mobx';

export default class AuthStore {
  user = null;
  inProgress = false;
  error = null;

  constructor(rest, socket) {
    this.rest = rest;
    this.socket = socket;

    if (localStorage.getItem('token')) {
      this.postLogin();
    }
  }

  postLogin() {
    this.socket.login(localStorage.getItem('token'));
    return this.loadUser();
  }

  logout() {
    localStorage.removeItem('token');
    this.inProgress = false;
    this.user = null;
  }

  async localLogin({email, password}) {
    try {
      this.inProgress = true;

      const {data} = await this.rest.auth.post('/local', {
        email,
        password
      });

      localStorage.setItem('token', data.token);

      return this.postLogin();
    } catch (e) {
      runInAction(() => {
        if (e.response && e.response.data && e.response.data.message) {
          this.error = e.response.data.message;
        } else {
          this.error = 'Unexpected error has occurred';
        }

        this.inProgress = false;
      });
    }
  }

  async loadUser() {
    try {
      this.inProgress = true;
      const {data} = await this.rest.client.get('/users/me');

      runInAction(() => {
        this.inProgress = false;
        this.error = null;
        this.user = data;
      });
    } catch (e) {
      this.logout();
      this.error = 'Your session has expired';
    }
  }
}

decorate(AuthStore, {
  user: observable,
  inProgress: observable,
  error: observable,
  logout: action.bound,
  localLogin: action.bound
});
