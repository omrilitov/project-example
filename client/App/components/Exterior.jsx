import React from 'react';
import {observer} from 'mobx-react';

const Exterior = props => {
  const {
    children
  } = props;

  return (
    <div className="stretch">
      {children}
    </div>
  );
};

export default (observer(Exterior));
