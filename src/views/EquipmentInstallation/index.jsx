import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Table, Radio, Button } from 'antd'
import { useTableData } from '&//hooks'
import { DownloadOutlined } from '@ant-design/icons'
import { Modal } from '&/appComponents/Antd'
import Filter from './Filter'
import {
  getDeviceIndustryDistribution,
  getDeviceRegionalDistribution,
  getDeviceDownload
} from '&/api/electricity'
import Container from '@/appComponents/Container'
import { CloseOutlined } from '@ant-design/icons'
import Info from './Info'
import './index.scss'
const EquipmentInstallation = () => {
  const [tabs] = useState([
    { label: '区域分布', value: '1' },
    { label: '行业分布', value: '2' }
  ])

  const [record, setRecord] = useState({})

  const modalRef = useRef(null)

  const user = JSON.parse(localStorage.getItem('user'))
  const [tabIndex, setTabIndex] = useState('1')
  const [tableData, setTableData] = useState([])
  const [paramsData, setParamsData] = useState({
    project_id: user.project_id,
    who_construct: '-1'
  })
  const getListTask = useMemo(() => {
    return paramsData && tabIndex === '1'
      ? getDeviceRegionalDistribution
      : getDeviceIndustryDistribution
  }, [tabIndex, paramsData])
  const handleparams = (paramsData) => {
    // console.log(paramsData,"paramsData--");
    let obj = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        obj[key] = paramsData[key]
      }
    }
    return obj
  }
  const [, , loading, onQuery, , originData] = useTableData(
    getListTask,
    {
      params: handleparams(paramsData),
      disabledPage: true
    },
    [getListTask]
  )

  useEffect(() => {
    if (tabIndex == '2') {
      setTableData(originData)
    } else {
      if (Object.keys(originData).length) {
        let newObj = { ...originData.city_data }
        ;(newObj.type = true), (newObj.county_name = newObj.city_name)
        originData.county_data.unshift(newObj)
        setTableData(originData.county_data)
      }
    }
  }, [originData])

  const onCellClick = (record) => {
    modalRef.current.showModelRef()
    setRecord(record)
  }
  const getTitle = useMemo(
    () => tabs.find((tab) => tab.value === tabIndex)?.label,
    [tabIndex, tabs]
  )
  const getTableItemKey = useMemo(() => {
    return tabIndex === '1' ? 'county_name' : 'industry_type_name'
  }, [tabIndex])
  const handleDown = async () => {
    const obj = { data_type: tabIndex }
    const res = await getDeviceDownload(obj)
    // console.log(res, 'res----')
    if (res) {
      urlDownload(res)
    }
  }
  const urlDownload = (url, fileName = '下载文件') => {
    // 创建隐藏的可下载链接
    let eleLink = document.createElement('a')
    eleLink.download = fileName // 若不知道fileName直接用url即可
    eleLink.style.display = 'none'
    eleLink.href = url
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
  }
  const columns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      title: getTitle,
      dataIndex: getTableItemKey,
      key: getTableItemKey,
      align: 'center'
    },
    {
      title: '监控企业数',
      dataIndex: 'ent_number',
      key: 'ent_number',
      align: 'center',
      render: (text, record, index) => {
        return (
          <a
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {text}
          </a>
        )
      },
      onCell: (record) => ({
        onClick: () => onCellClick(record)
      })
    },
    {
      title: '设备安装情况',
      align: 'center',
      children: [
        {
          title: '总安装设备数',
          dataIndex: 'all_dev_number',
          key: 'all_dev_number',
          align: 'center'
        },
        {
          title: '企业总电安装数',
          dataIndex: 'total_dev_num',
          key: 'total_dev_num',
          align: 'center'
        },
        {
          title: '产污设施安装数',
          dataIndex: 'yield_dev_num',
          key: 'yield_dev_num',
          align: 'center'
        },
        {
          title: '治污设施安装数',
          dataIndex: 'treat_dev_num',
          key: 'treat_dev_num',
          align: 'center'
        },
        {
          title: '产治一体安装数',
          dataIndex: 'unify_dev_num',
          key: 'unify_dev_num',
          align: 'center'
        }
      ]
    }
  ]

  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          onQuery={onQuery}
          paramsData={paramsData}
          setParamsData={setParamsData}
        />
      </Container.ContainerQuery>
      <Container.ContainerContent
        title="查询结果"
        extra={
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDown}
            // loading={downLoading}
            // disabled={!tableData.length}
            // onClick={download}
          >
            导出
          </Button>
        }
      >
        <div className="EquipmentInstallation">
          <div className="RadioGroup">
            <Radio.Group
              options={tabs}
              onChange={(e) => setTabIndex(e.target.value)}
              value={tabIndex}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          <Table
            loading={loading}
            columns={columns}
            dataSource={tableData}
            bordered
            pagination={false}
            size="small"
            scroll={{
              y: '62vh'
            }}
          />
        </div>
        <Modal
          title={`${record[getTableItemKey]}企业分布`}
          ref={modalRef}
          footer={false}
          style={{ top: 80 }}
          centered={false}
        >
          <Info record={record} tabIndex={tabIndex} />
        </Modal>
      </Container.ContainerContent>
    </Container>
  )
}
export default EquipmentInstallation
