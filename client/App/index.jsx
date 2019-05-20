import React from 'react';
import {observer, inject} from 'mobx-react';

const App = (props) => {
  const {
    auth: {
      user,
      localLogin,
      logout
    }
  } = props;

  const login = () => localLogin({email: 'omrilitov@gmail.com', password: '123'});

  return (
    <div>
      <span>Hello World {JSON.stringify(user)}</span>
      <br/>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}
export default inject('auth')(observer(App));
