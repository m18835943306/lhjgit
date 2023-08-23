import React, { useState, useEffect, useMemo } from 'react';
import TabPane, { TabList, TabContent } from './TabPane';

export const TabsContext = React.createContext();

const Tabs = ({ children, defaultIndex, onTabClick, render, contextValue }) => {
  const [selectedIndex, setSelectedIndex] = useState(
    typeof defaultIndex === 'number' ? defaultIndex : 0
  );
  const context = useMemo(
    () => ({
      selectedIndex,
      setSelectedIndex,
      onTabClick,
      render,
      contextValue,
    }),
    [selectedIndex, setSelectedIndex, onTabClick, contextValue]
  );

  return (
    <div className="tabs">
      <TabsContext.Provider value={context}>
        <TabList>{children}</TabList>
        <TabContent>{children}</TabContent>
      </TabsContext.Provider>
    </div>
  );
};

Tabs.TabPane = TabPane;
export default Tabs;
