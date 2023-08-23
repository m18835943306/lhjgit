import React, { useEffect, useState, useRef } from 'react';
import { areasList } from './SelectAreaOptions';

export const SelectArea = ({ change = () => {} }) => {
  const [countyName, setCountyName] = useState(areasList);
  change(countyName);
  return (
    <>
      <span>区域选择</span>
      <Select
        allowClear
        value={countyName}
        mode="multiple"
        onChange={(v) => {
          const a = v.includes('全选') ? areasList : v;
          setCountyName(a);
          change(a);
        }}
        maxTagCount={1}
        placeholder="请选择"
      >
        <Select.Option value="全选">全选</Select.Option>
        {areasList.map((item) => (
          <Select.Option value={item} key={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default SelectArea;
