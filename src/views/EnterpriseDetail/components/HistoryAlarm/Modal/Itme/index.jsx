import React, { useState, useEffect } from 'react';

import './index.scss';

const Item = ({ label, value }) => {
  return (
    <div className="Item">
      <span>{label}：</span>
      <span>{value}</span>
    </div>
  );
};

export default Item;
