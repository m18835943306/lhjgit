import React, { useState, useEffect } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

import './index.scss';

const Item = ({ label, title, description, resule }) => {
  return (
    <div className="item">
      <div className="item_legend">
        <div className="item_line"></div>
        <div className="item_icon"></div>
        <div className="item_label">{label}</div>
      </div>
      <div className="item_content">
        <div className="item_content_right">
          <div className="item_title">{title}</div>
          {/* <div className={resule==="已解决"?"item_a":"item_title"}>({resule})</div> */}
        </div>
        <div className="item_time">{description}</div>
      </div>
    </div>
  );
};

export default Item;
