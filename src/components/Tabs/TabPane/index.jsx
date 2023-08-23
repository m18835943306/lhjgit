import React, { useState, useEffect, useContext, useMemo } from 'react';
import classnames from 'classnames';
import { Spin } from 'antd';
import { TabsContext } from '..';

import './index.scss';

const showChild = (children, child) => {
  return React.Children.toArray(children).filter((c) => c.type === child);
};

export const TabList = ({ children }) => {
  const { setSelectedIndex, selectedIndex, onTabClick, render } =
    useContext(TabsContext);

  const onItmeClick = (index) => {
    setSelectedIndex(index);
    onTabClick && onTabClick(index);
  };
  const isString = (value) => typeof value === 'string';
  const c = showChild(children, TabPane);
  return (
    <div className="tablist" style={{ gap: '8px' }}>
      {React.Children.map(c, (child, index) => {
        const { tab } = child.props;
        if (render) {
          return isString(render)
            ? render
            : React.cloneElement(render, { tab, index });
        }
        return (
          <Tab
            onClick={() => onItmeClick(index)}
            isSelected={index === selectedIndex}
            tab={tab}
          />
        );
      })}
    </div>
  );
};

export const TabContent = ({ children }) => {
  const context = useContext(TabsContext);
  const c = showChild(children, TabPane);
  return (
    <div className="tab_content">
      {React.Children.map(
        c,
        (child, index) => index === context.selectedIndex && child
      )}
    </div>
  );
};

const Tab = ({ onClick, tab, isSelected }) => {
  const className = classnames('tab-list-item', {
    isSelected,
  });
  return (
    <div className={className} onClick={onClick} role="button" tabIndex={0}>
      <div>{tab}</div>
    </div>
  );
};

function TabPane(props) {
  const { contextValue } = useContext(TabsContext);
  const [loading, setLoading] = useState(true);
  return (
    <div className="tab_content__item">
      <Spin spinning={loading} tip="数据加载中...">
        {typeof props.children === 'string'
          ? props.children
          : React.cloneElement(props.children, { setLoading, contextValue })}
      </Spin>
    </div>
  );
}

export default TabPane;
