import React, { useState, useEffect } from 'react'
import { Row, Col, Popover } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Card } from '&/appComponents/Antd'
import Echarts from '&/baseUI/EChartsUI'

const Chart = ({ areaOptions, busOptions, tipsLabel }) => {
  const renderTitle = () => {
    const content = (
      <div style={{ marginBottom: 5, padding: 5 }}>
        <h6>以下是数据为零的行业：</h6>
        {tipsLabel?.map((label, index) => (
          <p>
            {++index}. {label}
          </p>
        ))}
      </div>
    )
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '16px',
          fontWeight: 500
        }}
      >
        区市24小时联网率
        {/* <Popover
          content={content}
          title="图表中只展示数据不为零的行业："
          placement="leftTop"
        >
          <ExclamationCircleOutlined
            style={{ cursor: 'pointer', fontSize: '16px' }}
          />
        </Popover> */}
      </div>
    )
  }
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card
          size="small"
          title="各区联网统计"
          bodyStyle={{ height: '300px' }}
        >
          <Echarts option={areaOptions} />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          size="small"
          title={renderTitle()}
          bodyStyle={{ height: '300px' }}
        >
          <Echarts option={busOptions} />
        </Card>
      </Col>
    </Row>
  )
}

export default Chart
