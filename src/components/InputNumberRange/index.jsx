import React, { useState, useEffect } from 'react';
import { InputNumber } from '../index';

import './index.scss';

const InputNumberRange = ({ separator = '-', attr, params, ...props }) => {
  return (
    <div className="InputNumberRange">
      <InputNumber
        placeholder="用电指数下线"
        defaultValue={params[attr[0]]}
        onChange={(e) => (params[attr[0]] = e)}
        {...props}
      />
      <span className="InputNumberRange_separator">{separator}</span>
      <InputNumber
        placeholder="用电指数上线"
        defaultValue={params[attr[1]]}
        onChange={(e) => (params[attr[1]] = e)}
        {...props}
      />
    </div>
  );
};

export default InputNumberRange;
