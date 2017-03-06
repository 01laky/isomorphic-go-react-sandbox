import React from 'react';

import './preloader.less';

const Preloader = ({global}) => {
  if (global) {
    return (
      <div className="Preloader-global">
        <div className="Preloader" />
      </div>
    );
  }

  return (
    <div className="Preloader" />
  );
};

Preloader.propTypes = {
  global: React.PropTypes.bool,
};

export default Preloader;
