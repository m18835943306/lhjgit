import React, { useState, useEffect } from 'react';
import _ from "lodash"
import './index.scss';

const PageHeader = ({ text, checkdata, params, setParams,onQuery }) => {
  const onChangetypedata=(typedatas)=>{
    const b = _.cloneDeep(params);
    b.typedata = typedatas;
    setParams(b);
    onQuery && onQuery(b);
  }
  return (
    <div className="PageHeader">
      <div className='PageHeader-text'>{text}</div>
      {
        checkdata?
        <div className='PageHeader-check'>
        <div
          className={params?.typedata === '1' ? 'Activelileft' : 'OutActiveli'}
          onClick={() => onChangetypedata('1')}
        >实时</div>
        <div
          className={params?.typedata === '2' ? 'Activeliright' : 'OutActiveli'}
          onClick={() => onChangetypedata('2')}
        >概况</div>
      </div>:null
      }
  </div>
  );
};

export default PageHeader;