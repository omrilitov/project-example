import React from 'react';
import {observer, inject} from 'mobx-react';
import {Route, Redirect} from 'react-router-dom';

const AuthenticatedRoute = props => {
  const {
    children,
    routing,
    auth,
    ...restProps
  } = props;

  if (auth.inProgress) {
    return <span>Logging in</span>;
  }

  if (auth.user) {
    return <Route {...restProps} />;
  }

  return <Redirect to="/login" />;
};

export default inject('auth')(observer(AuthenticatedRoute));
