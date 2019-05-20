import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
/*
export default connect(() => ({}), {localLogin})(({localLogin}) => {
  let devTools = null;

  localLogin({email: 'omrilitov@gmail.com', password: '123'});

  if (process.env.NODE_ENV !== 'production' && !window.devToolsExtension) {
    const DevTools = require('../components/DevTools').default;

    devTools = <DevTools />;
  }

  return (
    <div>
      <span>Hello World</span>
      {devTools}
    </div>
  );
});
*/

@inject("auth")
@observer
export default class App extends Component {
  render() {
    const {
      auth: {
        token,
        localLogin,
        logout
      }
    } = this.props;

    const login = () => localLogin({email: 'omrilitov@gmail.com', password: '123'});

    return (
      <div>
        <span>Hello World {token}</span>
        <br/>
        <button onClick={login}>login</button>
        <button onClick={logout}>logout</button>
      </div>
    )
  }
}
