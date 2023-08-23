import React, { useState, useEffect } from 'react';
import Echarts from '&/baseUI/EChartsUI';
import './index.scss';

const ChartItem = (props) => {
  const { label, color, option, height = '150px', labelStyle = {} } = props;
  // console.log(option,"optionoptionoption");
  return (
    <div className="chart_item" style={{ height }}>
      <div className="chart_item__label" style={labelStyle}>
        {label}
      </div>
      <div
        className="chart_item__box"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <Echarts option={option} group="charItem" />
      </div>
    </div>
  );
};

export default ChartItem;
