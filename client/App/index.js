import React from 'react';
import {connect} from 'react-redux'
import {localLogin} from '../reducers/auth';

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
