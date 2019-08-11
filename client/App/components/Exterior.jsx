import React from 'react';
import {observer, inject} from 'mobx-react';

const Exterior = props => {
  const {
    children,
    routing,
    auth
  } = props;

  if (auth.user || auth.loggingIn) {
    routing.push('/');
    return (<div />);
  }

  return (
    <div style={{backgroundColor: 'grey'}}>
      {children}
    </div>
  );
};

export default inject('auth', 'routing')(observer(Exterior));
