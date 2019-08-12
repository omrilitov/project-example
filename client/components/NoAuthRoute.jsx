import React from 'react';
import {observer, inject} from 'mobx-react';
import {Route, Redirect} from 'react-router-dom';

const NoAuthRoute = props => {
  const {
    children,
    routing,
    auth,
    ...restProps
  } = props;

  if (!auth.user && !auth.inProgress) {
    return <Route {...restProps} />;
  }

  return <Redirect to="/" />;
};

export default inject('auth')(observer(NoAuthRoute));
