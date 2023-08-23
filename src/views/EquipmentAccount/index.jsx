import React, { useState, useContext, useEffect, useRef } from 'react'
import { Table, Button, Image, Tooltip, Form, Input, message } from 'antd'
import Filter from './Filter'
import { useTableData } from '&/hooks'
import { downloadExcel } from '&/commonjs/util'
import { DownloadOutlined } from '@ant-design/icons'
import { getDeviceAccount, setEnterpriseAccount } from '&/api/electricity'
import Container from '@/appComponents/Container'

import './index.scss'
const EquipmentAccount = () => {
  const EditableContext = React.createContext(null)
  const value = JSON.parse(localStorage.getItem('user'))
  const [downLoading, setDownloading] = useState(false)
  const [tableHeight, setTableHeight] = useState(0)
  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    county_id: -1, //区
    industry_type_id: -1, //行业
    dev_type: -1, //点位类型
    point_attribute: '-1', //点位属性
    ent_name: '',
    who_construct: -1
  })
  const getParams = () => {
    let newParamsData = {}
    for (let key in paramsData) {
      if (paramsData[key] != (-1 || '-1')) {
        newParamsData[key] = paramsData[key]
      }
    }
    return newParamsData
  }
  const [tableData, pagination, loading, onQuery, , , loadDataAll] =
    useTableData(getDeviceAccount, {
      params: getParams()
      // formatcb: (data) => formatData(data),
    })
  const defaultColumns = [
    {
      title: '序号',
      width: 50,
      render: (_, __, index) => `${index + 1}`,
      align: 'center'
    },
    {
      width: 80,
      title: '区',
      dataIndex: 'county_name',
      key: 'county_name',
      align: 'left'
    },
    {
      title: '行业',
      dataIndex: 'industry_type',
      key: 'industry_type',
      align: 'left',
      width: 100
    },
    {
      width: 160,
      title: '企业名称',
      dataIndex: 'ent_name',
      key: 'ent_name',
      align: 'left',
      ellipsis: {
        showTitle: false
      },
      render: (text) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )
      }
    },
    {
      title: '区域/位置',
      dataIndex: 'area',
      key: 'area',
      align: 'left',
      width: 100
    },
    {
      title: '管控对象',
      dataIndex: 'mornitoring_facility',
      key: 'mornitoring_facility',
      align: 'left',
      width: 100
    },
    {
      title: '监测对象',
      dataIndex: 'monitoring_object',
      key: 'monitoring_object',
      align: 'left',
      ellipsis: {
        showTitle: false
      },
      width: 150,
      render: (text) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )
      }
    },
    {
      title: '设施编号',
      dataIndex: 'code_in_ent',
      key: 'code_in_ent',
      align: 'left',
      width: 100
    },
    {
      title: '安装位置',
      dataIndex: 'installation_location',
      key: 'installation_location',
      align: 'left',
      width: 100
    },
    {
      title: '安装方式',
      dataIndex: 'installation_method',
      key: 'installation_method',
      align: 'left',
      width: 100
    },
    {
      title: '点位属性',
      dataIndex: 'point_attribute',
      key: 'point_attribute',
      align: 'left',
      width: 100
    },
    {
      title: '点位类型',
      dataIndex: 'dev_type_name',
      key: 'dev_type_name',
      align: 'left',
      width: 100
    },
    {
      title: '数据来源',
      dataIndex: 'who_construct',
      key: 'who_construct',
      align: 'left',
      width: 100
    },
    {
      title: '设备编号',
      dataIndex: 'dev_code',
      key: 'dev_code',
      align: 'left',
      ellipsis: {
        showTitle: false
      },
      width: 100,
      render: (text) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )
      }
    },
    {
      title: '断路器（A）',
      dataIndex: 'circuit_breaker',
      key: 'circuit_breaker',
      align: 'left',
      width: 100
    },
    {
      title: '安装设备型号',
      dataIndex: 'equipment_model',
      key: 'equipment_model',
      align: 'left',
      width: 100
    },
    {
      title: '设备入网日期',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'left',
      width: 100
    },
    {
      title: '设备阈值',
      dataIndex: 'hand_rated_power',
      key: 'hand_rated_power',
      align: 'left',
      width: 100,
      editable: true
    },
    {
      title: '安装对象照片',
      dataIndex: 'monitoring_object_img',
      key: 'monitoring_object_img',
      align: 'left',
      with: 120,
      render: (value, row, index) => {
        return (
          <span>
            <Image.PreviewGroup items={value}>
              <Image width={60} height={80} src={value[0]} />
            </Image.PreviewGroup>
          </span>
        )
      }
    },
    {
      title: '安装位置照片',
      dataIndex: 'installation_location_img',
      key: 'installation_location_img',
      align: 'left',
      with: 120,
      render: (value, row, index) => {
        return (
          <span>
            <Image.PreviewGroup items={value}>
              <Image width={60} height={80} src={value[0]} />
            </Image.PreviewGroup>
          </span>
        )
      }
    }
  ]
  const download = async () => {
    setDownloading(true)
    const { data } = await loadDataAll()
    // const excelData = formatData(data);
    downloadExcel(data, columns, '设备台账列表')
    setDownloading(false)
  }
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    )
  }
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
      if (editing) {
        inputRef.current.focus()
      }
    }, [editing])
    const toggleEdit = () => {
      setEditing(!editing)
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      })
    }
    const save = async () => {
      try {
        const values = await form.validateFields()
        toggleEdit()
        handleSave({
          ...record,
          ...values
        })
      } catch (errInfo) {
        console.log('Save failed:', errInfo)
      }
    }
    let childNode = children
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      )
    }
    return <td {...restProps}>{childNode}</td>
  }
  // const [dataSource, setDataSource] = useState(tableData&&tableData);
  const handleSave = async (row) => {
    // console.log(row,"row---");
    const formData = new FormData()
    formData.append('dev_id', row.dev_id)
    formData.append('rated_power', row.hand_rated_power)
    const res = await setEnterpriseAccount(formData)
    if (res == true) {
      message.success(`修改成功`)
    } else {
      message.error(`修改失败`)
    }
    onQuery(getParams())
  }
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  return (
    <div className="EquipmentAccount">
      <Container>
        <Container.ContainerQuery title="查询条件">
          <Filter
            onQuery={onQuery}
            paramsData={paramsData}
            setParamsData={setParamsData}
            downConfig={{
              loading: loading,
              downEvent: download,
              disabled: !tableData.length
            }}
          />
        </Container.ContainerQuery>

        <Container.ContainerContent
          title="查询结果"
          style={{height:"80%"}}
          extra={
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              loading={downLoading}
              disabled={!tableData.length}
              onClick={download}
            >
              导出
            </Button>
          }
        >
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            loading={loading}
            columns={columns}
            dataSource={tableData}
            bordered
            size="middle"
            pagination={pagination}
            scroll={{
              x: 2000,
              y: 'calc(100vh - 400px)'
            }}
          />
        </Container.ContainerContent>
      </Container>
    </div>
  )
}
export default EquipmentAccount
