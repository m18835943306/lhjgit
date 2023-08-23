import React, { useState, useEffect } from 'react'
import Modal from '@/views/EquStatus/Model'
import { getEnterpriseDevice, getEnterpriseMonitor } from '&/api/electricity'
import './index.scss'

const Production = (props) => {
  const {
    setLoading,
    contextValue: { ent_id }
  } = props
  const [id, setId] = useState(false)
  const [visible, setVisible] = useState(false)
  const [drawData, setDrawData] = useState({})
  const [dataListData, setDataListData] = useState([]) //弹框表格数据
  const [paginationDraw, setPaginationDraw] = useState() //弹框分页
  const user = JSON.parse(localStorage.getItem('user')) || {}
  // 企业设备数据详情接口
  const getEnterpriseMonitorData = (param) => {
    getEnterpriseMonitor(param).then((res) => {
      // console.log(res, 'resresresresresres');

      const newArr = res?.data.map((item, index) => {
        return {
          key: index + 1,
          project: item.name,
          equipmentno: item.dev_code,
          data: item.data_value,
          time: item.data_time
        }
      })
      setDataListData(newArr)
      const paginationDraw = {
        current: res.page_info.page,
        pageSize: res.page_info.page_size,
        // pageSize: 5,
        total: res.page_info.total_number,
        showQuickJumper: true,
        showSizeChanger: true,
        hideOnSinglePage: false,
        position: ['bottomCenter'],
        onChange(page, pageSize) {
          // console.log(param,"paramparamparamparamparam");
          // console.log(page, pageSize, 'page pageSize');
          const newObj = {
            dev_code: param.dev_code,
            page: page,
            page_size: pageSize
          }
          getEnterpriseMonitorData(newObj)
        },
        showTotal: (total, range) => `共${total}条数据`
      }
      setPaginationDraw(paginationDraw)
    })
  }
  useEffect(() => {
    setLoading(false)
    window.addEventListener('message', function (res) {
      const { type, param__id } = res.data
      // alert('当前点击的id:' + param__id);
      // if (type === '1') {
      //   // 电表
      //   const obj = {
      //     dev_code: param__id,
      //     page: 1,
      //     page_size: 10,
      //   };
      //   setVisible(true);

      //   getEnterpriseMonitorData(obj);
      // }
    })
  }, [])
  useEffect(() => {
    if (ent_id || ent_id === 0) {
      setId(ent_id)
    } else {
      setId(false)
    }
  }, [ent_id])
  return (
    <>
      <div className="EnterpriseDetail-Production">
        {/* {(id || id === 0) && (
          <iframe
            title="用电"
            src={
              'http://localhost:8802/jtopo_topology/network_view.html?ent_id=' +
              id+ '&project_id=' + user?.project_id
            }
            frameBorder="0"
          ></iframe>
        )} */}
        {(id || id === 0) && (
          <iframe
            title="用电"
            src={
              'https://react-olympic-pre.airqualitychina.cn/jtopo_topology/network_view.html?ent_id=' +
              id +
              '&project_id=' +
              user?.project_id +
              '&time=' +
              new Date().getTime()
            }
            frameBorder="0"
          ></iframe>
        )}
      </div>
      <Modal
        visible={visible}
        setVisible={setVisible}
        dataList={drawData && drawData}
        dataListNewData={dataListData}
        paginationModal={paginationDraw}
      />
    </>
  )
}

export default Production
