import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';

import './index.scss';

const NumberInput = (props) => {
  return (
    <div className="InputNumber">
      <InputNumber {...props} />
    </div>
  );
};

export default NumberInput;
