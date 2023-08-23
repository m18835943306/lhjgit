import React, { useEffect, useState, useRef } from 'react';
import { Table, TreeSelect, Space, Popover, Modal,  message, } from 'antd';
import _ from 'lodash';
import { changePanesAction, changeRecordAction } from '&/store/actions';
import { connect } from 'react-redux';
import Echarts from '&/baseUI/EChartsUI'
import { getColumns1 } from './index-data';
import { getList1 } from './index-query';
import Filter from '&/components/Filter';
import { dataURLtoFile, FiletoDataURL, } from '&/utils/file.help'
import { filterOptions1 } from './filterOptions';
import ModerOther from './ModerOther';
import Container from '@/appComponents/Container'
import { postClueSubmit } from '&/api/electricity'
import ShareValue from './ShareValue'
import './index.scss';
import { QuestionCircleOutlined } from '@ant-design/icons'
const mapStateToProps = (state) => {
  return {
    getFiveViewReducer: state.getFiveViewReducer,
    getPanesReducer: state.getPanesReducer,
    getRecordReducer: state.getRecordReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePanesAction: (...args) => dispatch(changePanesAction(...args)),
    changeRecordAction: (...args) => dispatch(changeRecordAction(...args)),
  };
};

const EnterpriseElectricityMonitorList = () => {
  const [list1, setList1] = useState([]);
  const [tableHeight, setTableHeight] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  });
  const [visible, setVisible] = useState(false);
  const value = JSON.parse(localStorage.getItem('user'))
  const [list1Loading, setList1Loading] = useState(false);
  const [height, setHeight] = useState(null);
  const filterRef = useRef();
  const contentRef = useRef();
  const [getList, setGetList] = useState([])
  const [records, setRecords] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hareValue, setHareValue] = useState()
  const goDetail = (record) => {
    setRecords(record);
    setVisible(true);
  };
  const DownData = (value) => {
    setIsModalOpen(true)
    const warnArr=[
      {
        warn_code: value.warn_code,
        ent_name: value.ent_name
      }
    ]
    setGetList(warnArr)
  }
  const columns1 = getColumns1(goDetail,DownData);
  const onClick = (value) => {
    // console.log(filterRef.current.filterParams,"filterRef.current.filterParams");
    if (value) {
      getList1(
        setList1,
        setList1Loading,
        setPageInfo
      )(filterRef.current.filterParams);
    }
  };
  const handleShare=(values)=>{
    setHareValue(values)
  }
  const handleOk = () => {
    if (hareValue && getList.length > 0) {
      // console.log(hareValue,"hareValue--");
      // setLoading(true)
      let formData = new FormData()
      formData.append('userid', value?.userid)
      formData.append('role_level', value?.role_level)
      formData.append('adm_id', value?.adm_id)
      formData.append('warn_info', JSON.stringify(getList))
      formData.append('assign_to', hareValue)
      setIsModalOpen(false)
      setList1Loading(true)
      postClueSubmit(formData)
        .then((res) => {
          if(res){
            setList1Loading(false)
            message.info(res.data.result)
            setIsModalOpen(false)
            setGetList([])
          }
        })
        .catch((r) => {
          message.info(r.data.result)
        })
    }
  }
  const renderContainerTitle = () => {
    const content = (
      <div style={{ marginBottom: 5, padding: 5 }}>
        <p>
          1.
          额定电度计算：每个设备的单点电度值，过滤0值（0.2以下的），然后求平均值以上数据的众数，视为设备额定电度，作为负荷判断和报警的基础数据。暂定滑动60天的数据
        </p>
        <p>
          2.日常产治污不同步计算规则：针对生产中的企业（暂定产污设备电度数据大于等于0.2），产污设备单点电度值大于等于额定电度*0.2，同时治污设备单点电度值小于额定电度*0.1
        </p>
      </div>
    )
    return (
      <Space>
        查询结果
        <Popover
          content={content}
          title="产治污不同步的规则说明："
          placement="rightTop"
        >
          <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
        </Popover>
      </Space>
    )
  }
  return (
    <Container>
      <Container.ContainerQuery title="查询条件" >
        <Filter
          ref={filterRef}
          loading={list1Loading}
          showDownloadButton={true}
          downloadConfig={{
            name: '报警列表',
            data: list1,
            columns: columns1,
          }}
          options={filterOptions1}
          hasMarginBottom={false}
          filterItem={
            <div className="Filter-item">
              <span>区域选择</span>
              <TreeSelect
                style={{
                  width: '100%',
                }}
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: 'auto',
                }}
                onChange={(v) => {
                  const p = {
                    [v < 1000 ? 'county_id' : 'town_id']: v,
                  };
                  if (v < 1000) {
                    p.town_id = false;
                  } else {
                    p.county_id = false;
                  }
                  filterRef.current.setParams(p);
                }}
                placeholder="请选择区域"
                treeData={filterOptions1.__dict.area}
              />
            </div>
          }
          hasBorder={false}
          search={getList1(setList1, setList1Loading, setPageInfo)}
        ></Filter>
      </Container.ContainerQuery>
      <Container.ContainerContent
        title={renderContainerTitle()}
      >
        <Table
          bordered
          size="small"
          loading={list1Loading}
          dataSource={list1}
          columns={columns1}
          pagination={{
            pageSize: 50,
            position: ['bottomCenter']
          }}
          scroll={{
            x: 'max-content',
            y: '62vh'
          }}
          rowKey={(row) => {
            return JSON.stringify(row);
          }}
        />
        <ModerOther
          visible={visible}
          setVisible={setVisible}
          records={records}
          click={onClick}
        />
        <Modal
          title="线索下发"
          destroyOnClose={true}
          open={isModalOpen}
          centered={true}
          width={400}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        >
          <ShareValue
            handleShare={handleShare}
          ></ShareValue>
        </Modal>
      </Container.ContainerContent>
    </Container>
    // <div className="EnterpriseElectricityMonitorList-wrap" ref={contentRef}>

    // </div>
  );
};

const EnterpriseElectricityMonitorListConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    forwardRef: true,
  }
)(EnterpriseElectricityMonitorList);
export default EnterpriseElectricityMonitorListConnect;
