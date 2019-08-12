import React from 'react';
import {observer, inject} from 'mobx-react';
import Exterior from '../components/Exterior';

const Login = props => {
  const {
    auth: {
      localLogin,
      error
    }
  } = props;

  const login = () => localLogin({email: 'omrilitov@gmail.com', password: '123'});

  return (
    <Exterior>
      <span>This is a login page</span>
      {error && <span>{JSON.stringify(error)}</span>}
      <br />
      <button type="button" onClick={login}>login</button>
    </Exterior>
  );
};

export default inject('auth')(observer(Login));
