import { TreeSelect } from 'antd';
import useRegionData from '&/views/beijing-olympic-winter-coordination/ManageArea/hooks/useRegionData';
import React, { useState, useEffect } from 'react';
import query from '&/api/electricity/query';
import { getTownList } from '&/api/user';
const App = ({ change }) => {
  const [value, setValue] = useState();
  const [regionData, setRegionData] = useRegionData();
  const [treeData, setTreeData] = useState([]);

  const getStreet = ({ id }) => {
    return new Promise((resolve) => {
      let token = sessionStorage.getItem('tokenv2');
      getTownList({
        county_id: id,
      }).then((res) => {
        const street = [];
        res.map((o) => {
          street.push({
            id: o.id,
            pId: id,
            value: o.id,
            title: o.name,
            isLeaf: true,
          });
        });
        setTreeData(treeData.concat(street));
        resolve(undefined);
      });
    });
  };

  const onLoadData = ({ id }) => {
    return getStreet({ id });
  };

  const onChange = (newValue) => {
    const items = treeData.filter((item) => {
      return item.id === newValue;
    });
    const pitem = treeData.filter((o) => o.id === items[0].pId);
    const params = {
      county: '',
      town: '',
    };

    if (pitem && pitem.length > 0) {
      params.county = pitem[0].title;
      params.town = items[0].title;
    } else {
      params.county = items[0].title;
    }

    if (newValue === -1) {
      params.county = '';
      params.town = '';
    }
    change({
      ...params,
    });
    setValue(newValue);
  };

  useEffect(() => {
    if (regionData && regionData.length > 0) {
      const area = [
        {
          id: -1,
          pId: 0,
          value: -1,
          title: '全部',
          isLeaf: false,
        },
      ];
      regionData.map((o) => {
        area.push({
          id: o.id,
          pId: 0,
          value: o.id,
          title: o.name,
          isLeaf: false,
        });
      });
      setTreeData(area);
    } else {
      setTreeData([]);
    }
  }, [regionData]);
  return (
    <div className="Filter-item">
      <span>区域选择</span>
      <TreeSelect
        treeDataSimpleMode
        style={{
          width: '100%',
        }}
        value={value}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder="请选择区域"
        onChange={onChange}
        loadData={onLoadData}
        treeData={treeData}
      />
    </div>
  );
};

export default App;
