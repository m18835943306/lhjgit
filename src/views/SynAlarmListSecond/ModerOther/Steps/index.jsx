import React, { useState, useEffect } from 'react';
import Item from './Item';

const Steps = ({ journal }) => {
  // console.log(journal,"journaljournaljournal");

  const step = journal?.map((item) => {
    return {
      label: item[0],
      title: item[1],
      description: item[2],
    };
  });
  return (
    <div className="Steps">
      {step.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </div>
  );
};

export default Steps;
