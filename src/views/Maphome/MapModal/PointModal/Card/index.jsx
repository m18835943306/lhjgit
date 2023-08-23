import React, { useState, useEffect } from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="Card">
      <h1
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {title}
      </h1>
      {children}
    </div>
  );
};

export default Card;
