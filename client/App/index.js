import React from 'react';

export default () => {
  let devTools = null;

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
};