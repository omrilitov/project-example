import React from 'react';
import {observer, inject} from 'mobx-react';
import Exterior from '../components/Exterior';

const Login = (props) => {
  const {
    auth: {
      localLogin
    }
  } = props;

  const login = () => localLogin({email: 'omrilitov@gmail.com', password: '123'});

  return (
    <Exterior>
      <span>This is a login page</span>
      <br/>
      <button onClick={login}>login</button>
    </Exterior>
  );
}
export default inject('auth')(observer(Login));
