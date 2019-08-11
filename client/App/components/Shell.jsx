import React from 'react';
import {observer, inject} from 'mobx-react';

const Shell = props => {
  const {
    children,
    routing,
    auth
  } = props;

  if (!auth.user && !auth.loggingIn) {
    routing.push('/login');
    return (<div />);
  }

  return (
    <div className="stretch">
      {auth.loggingIn && (<span>Logging in</span>)}
      {auth.user && children}
    </div>
  );
};

export default inject('auth', 'routing')(observer(Shell));
