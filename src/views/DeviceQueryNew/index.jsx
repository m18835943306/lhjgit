import React, { useState, useEffect } from 'react';
import Filter from './Filter';
// import Filter from '../DeviceQuery/EntData/Filter';
import List from './List';
import EndForm from './EndForm';
import EchartsData from './EchartsData';
import CanvasImage from './CanvasImage';
import moment from 'dayjs';
import { getRealtimeMonitor } from '&/api/electricity';
import { Card } from '&/appComponents/Antd'
import './index.scss';
const DeviceQueryNew = ({ setLoading }) => {
  const value = JSON.parse(localStorage.getItem('user'));
  // const dateFormat = 'YYYY-MM-DD 00:00:00';
  const dateFormat = 'YYYY-MM-DD HH:mm:00';
  const time = moment().format(dateFormat);
  const timestr = time.slice(14, 16);
  const timenum = Number(timestr) % 15;
  const resultnum = Number(timestr) - timenum;
  const e =
    resultnum == 0 ? `YYYY-MM-DD HH:00:00` : `YYYY-MM-DD HH:${resultnum}:00`;
  const [mounted, setMounted] = useState(false);
  const [valueTable, setValueTable] = useState([]);
  const [paramsData, setParamsData] = useState({
    project_id: value.project_id,
    // project_id: 32,
    start_time: moment().subtract(1, 'day').format(e),
    end_time: moment().format(e),
    data_type_id: 8,
    time_type: '1',
    format_type: 1,
  });
  const [tableColumns, SetTableColumns] = useState([]);
  const [echartData, setEchartData] = useState([]);
  const [titleListLegend, setTitleListLegend] = useState([]); //echarts的legend
  const [devIdParamList, setDevIdParamList] = useState([]);
  const [endValue, setEndValue] = useState()
  const [devDataCode, setDevDataVode] = useState([])
  const [chartType, setChartType] = useState('0')
  // 折线图数据传参调接口
  const onQuery = async (params) => {
    await getRealtimeMonitorData(params);
  };
  //  折线图数据请求
  const getRealtimeMonitorData = (json) => {
    if (json.dev_id_list != undefined) {
      // console.log(json,"json--");
      json.get_warn=1
      getRealtimeMonitor(json).then((res) => {
        setEchartData(res);
      });
    }
  };
  const onClick = (value) => {
    if (Array.isArray(value)) {
      setMounted(false);
      setValueTable(value);
      return;
    } else {
      if (!value?.node?.parentKey) {
        const a = value?.node.children.map((v) => v.children).flat(Infinity);
        const b = value?.node.children;
        const c = value.node.group ? b : a;
        const checked2 = c.map((item) => {
          return item.parentKey;
        });
        const checked = value?.checkedNodes.filter((i) => {
          return !i.children && i.dev_code;
        });
        // console.log(checked,"checked--");
        const devIdParam = checked?.map((item) => {
          return item.dev_id;
        });
        
        setParamsData((state) => {
          state.dev_id_list = devIdParam?.toString();
          return {
            ...state,
          };
        });
        setDevIdParamList(devIdParam?.toString());
        const columns = [
          {
            title: '序号',
            width: 50,
            render: (_, __, index) => `${index + 1}`,
            align: 'center',
          },
          {
            title: '时间',
            dataIndex: 'data_time',
            key: 'data_time',
            align: 'center',
          },
        ];
        const as = checked?.map((item) => {
          const obj = {};
          obj.title = item.title;
          obj.dataIndex = item.title;
          obj.key = item.title;
          obj.align = 'center';
          columns.push(obj);
        });
        //生成ecahrts的legend
        const titleList = columns?.map((item) => {
          return item.title;
        });
        setTitleListLegend(titleList.slice(2));
        SetTableColumns(columns);
      } else {
        // 单选
        const checked = value?.checkedNodes.filter((i) => {
          return !i.children && i.parentKey === value.node.parentKey;
        });
        const devIdParamDan = checked?.map((item) => {
          return item.dev_id;
        });
        setParamsData((state) => {
          state.dev_id_list = devIdParamDan?.toString();
          return {
            ...state,
          };
        });
        setDevIdParamList(devIdParamDan?.toString());
        const columns = [
          {
            title: '序号',
            width: 50,
            render: (_, __, index) => `${index + 1}`,
            align: 'center',
          },
          {
            title: '时间',
            dataIndex: 'data_time',
            key: 'data_time',
            align: 'center',
          },
        ];
        const as = checked?.map((item) => {
          const obj = {};
          obj.title = item.title;
          obj.dataIndex = item.title;
          obj.key = item.title;
          obj.align = 'center';
          columns.push(obj);
        });
        //生成ecahrts的legend
        const titleList = columns?.map((item) => {
          return item.title;
        });
        setTitleListLegend(titleList.slice(2));
      }
    }
  };
  const onClickQuipment = (value) => {
    // setDevTypeData(value);
    setEndValue(value)
  };
  const onClickDevCode = (value) => {
    // console.log(value, "value--");
    setDevDataVode(value)
  }
  useEffect(() => {
    if (valueTable.length > 0 && valueTable && !mounted) {
      const titleList = valueTable?.map((item) => {
        return item.title;
      });
      setTitleListLegend(titleList);
      const devId = valueTable?.map((item) => {
        return item.dev_id;
      });
      setParamsData((state) => {
        state.dev_id_list = devId.toString();
        return {
          ...state,
        };
      });
      setDevIdParamList(devId.toString());
      setMounted(true);
    }
  }, [valueTable]);
  useEffect(() => {
    if (paramsData.dev_id_list != '') {
      getRealtimeMonitorData(paramsData);
    } else {
      setEchartData([]);
    }
  }, [paramsData]);
  return (
    <div className="DeviceQueryNew">
      <div className="DeviceQuery-left">
        <List click={onClick} clickequipment={onClickQuipment} clickDevCode={onClickDevCode} />
      </div>
      <div className="DeviceQuery-right">

        <div className='right-eacher'>
          <Card bodyStyle={{ height: '100%' }} size="small">
            <Filter
              onQuery={onQuery}
              paramsData={paramsData}
              setParamsData={setParamsData}
              devIds={devIdParamList}
              chartType={chartType}
              setChartType={setChartType}
            />
            <EchartsData
              data={echartData && echartData}
              titleLengnd={titleListLegend}
              chartType={chartType}
            />
          </Card>
        </div>



        <div className="DeviceQuery-center">
          <div className='center-baseform'>
            <Card bodyStyle={{ height: '650px' }} size="small" title="企业信息">
              <EndForm ent_id={endValue}></EndForm>
            </Card>
          </div>
          <div className='center-canvas'>
            <Card bodyStyle={{ height: '650px' }} size="small">
              <CanvasImage ent_id={endValue} devDataCode={devDataCode}></CanvasImage>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeviceQueryNew;
