import React, { useState, useEffect } from 'react';
import Table from './table';

const ListModal = ({ modalType }) => {
  return (
    <div className="ListModal">{modalType && <Table type={modalType} />}</div>
  );
};

export default ListModal;
