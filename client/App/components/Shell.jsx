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
    <div>
      {auth.loggingIn && (<span>Logging in</span>)}
      {auth.user && <div style={{backgroundColor: 'yellow'}}>
        {children}
      </div>}
    </div>
  );
};

export default inject('auth', 'routing')(observer(Shell));
