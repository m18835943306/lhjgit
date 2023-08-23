import React, { useState, useEffect } from 'react';
import HomeImg from '../../assets/maphomeimages/imgs'
import './index.scss';

const Pagelay = ({position, children }) => {
  return (
    <div className="Pagelay"
      style={position=="left"?{
        'background-image': 'url(' + HomeImg.background1 + ')',
        'background-repeat': 'no-repeat',
        'background-size': '100% 100%',
      }:{
        'background-image': 'url(' + HomeImg.background2 + ')',
        'background-repeat': 'no-repeat',
        'background-size': '100% 100%',
      }}
    >
      <div 
      className="Pagelay-content"
        style={{
          'background-image': 'url(' + HomeImg.background + ')',
          'background-repeat': 'no-repeat',
          'background-size': '100% 100%',
        }}
      >
        {children}
      </div>

    </div>
  );
};

export default Pagelay;