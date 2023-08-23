import React, { useState, useEffect } from 'react';

import './index.scss';

const Chunk = ({ title, children }) => {
  return (
    <div className="chunk">
      <div className="chunk_title">{title}</div>
      <div className="chunk_content">{children}</div>
    </div>
  );
};

export default Chunk;
