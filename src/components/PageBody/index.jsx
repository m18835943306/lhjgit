import React, { useState, useEffect } from 'react';

import './index.scss';

const PageBody = ({ children }) => {
  return (
    <div className="PageBody">
      {children}
    </div>
  );
};

export default PageBody;