import React, { useState, useEffect } from 'react';

import './index.scss';

const Item = ({ label, value }) => {
  return (
    <div className="Item">
      <span className="Item_label">{label}：</span>
      <span class="Item_value">{value}</span>
    </div>
  );
};

export default Item;
