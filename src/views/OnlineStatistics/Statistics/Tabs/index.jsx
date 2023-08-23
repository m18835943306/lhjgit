import { Tabs as AntdTabs } from 'antd'
import { BarChartOutlined, BarsOutlined } from '@ant-design/icons'
const Tabs = ({ tabIndex, setTabIndex }) => {
  const items = [
    {
      key: '1',
      label: (
        <span>
          <BarChartOutlined />图
        </span>
      )
    },
    {
      key: '2',
      label: (
        <span>
          <BarsOutlined />表
        </span>
      )
    }
  ]
  return (
    <AntdTabs
      size="small"
      defaultActiveKey={tabIndex}
      items={items}
      onChange={setTabIndex}
    />
  )
}

export default Tabs
