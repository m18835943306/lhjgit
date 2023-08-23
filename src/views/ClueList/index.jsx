import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, message } from 'antd'
import { getColumns1 } from './index-data'
// import Filter from '&/components/Filter'
import { downloadExcel } from '&/commonjs/util'
import { postClueMacroSubmitFin, postClueMacroDelete } from '&/api/electricity'
import dayjs from 'dayjs'
import { useTableData } from '&/hooks'
import { getClueMacroMidList } from '&/api/electricity'
import Filter from './Filter'
import Container from '@/appComponents/Container'
import { DownloadOutlined } from '@ant-design/icons'
import './index.scss'
const format = 'YYYY-MM-DD'
const ClueList = () => {
  const value = JSON.parse(localStorage.getItem('user')) || {}
  const [paramsData, setParamsData] = useState({
    county_name: '',
    industry: '',
    level: '',
    clue_date: dayjs().subtract(1, 'days').format(format),
    project_id: value?.project_id
  })
  const [tableData, , loading, onQuery, onReload] = useTableData(
    getClueMacroMidList,
    {
      params: paramsData,
      disabledPage: true
    }
  )
  const [downLoading, setDownLoading] = useState(false)

  const onClick = (_record) => {
    const listArr = []
    listArr.push(_record.id)
    const json = { clue_id: listArr, project_id: value?.project_id }
    postClueMacroSubmitFin(json).then((res) => {
      message.info(res)
      onReload()
    })
  }
  const onClickDelet = (_record) => {
    const result = confirm('确定要删除吗？')
    if (result == true) {
      let formData = new FormData()
      formData.append('clue_id', _record.id)
      formData.append('project_id', value?.project_id)
      postClueMacroDelete(formData).then(() => {
        message.info('删除成功')
      })
      onReload()
    }
  }
  const columns1 = getColumns1(onClick, onClickDelet)
  const allClick = (list1) => {
    const listBrr = []
    list1.filter((item) => {
      listBrr.push(item.id)
    })
    const jsonParams = { clue_id: listBrr, project_id: value?.project_id }
    postClueMacroSubmitFin(jsonParams).then((res) => {
      message.info(res)
      onReload()
    })
  }

  return (
    <Container>
      <Container.ContainerQuery title="查询条件">
        <Filter
          handleQuery={onQuery}
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
            loading={downLoading}
            disabled={!tableData.length}
            onClick={async () => {
              setDownLoading(true)
              await downloadExcel(tableData, columns1, '线索列表')
              setDownLoading(false)
            }}
          >
            导出
          </Button>
        }
      >
        <Table
          size="small"
          bordered
          loading={loading}
          dataSource={tableData}
          columns={columns1}
          pagination={false}
          scroll={{
            y: '62vh'
          }}
          rowKey={(row) => JSON.stringify(row)}
        />
        <div>
          <div
            style={{
              marginTop: '10px'
            }}
          >
            <Button
              type="primary"
              size="small"
              disabled={!tableData.length}
              onClick={() => {
                allClick(tableData)
              }}
            >
              全部通过
            </Button>
          </div>
        </div>
      </Container.ContainerContent>
    </Container>
  )
}

export default ClueList
