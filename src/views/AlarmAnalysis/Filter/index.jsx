import React, { useState, useEffect } from 'react';
import { Select, Button, DatePicker, Form, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'dayjs';

const Filter = ({
  onQuery,
  paramsData,
  setParamsData,
}) => {
  const values = JSON.parse(localStorage.getItem('user'));
  const [dateFormatsData, setDateFormatsData] = useState("YYYY-MM-DD");
  const [pickers, setPickers] = useState("week")
  const onQueryChange = (v, t) => {
    if (t === 'time') {
      // const st = moment(v[0]).format(dateFormatsData)
      const et = moment(v).format(dateFormatsData)
      setParamsData((state) => {
        // state.start_time = st
        state.data_time = et
        return {
          ...state
        }
      })
    }
    if (t === 'statues') {
      setParamsData((state) => {
        const newState = onTimeTypeChange(v, state)
        return {
          ...newState
        }
      })
    }
  }
  const onTimeTypeChange = (v, state) => {
    // console.log(state,"state--");
    state.time_type = v
    if (v === '1') {
      // setPickers("week")
      // state.start_time = moment(state.start_time).format("YYYY-MM-DD")
      state.data_time = moment(state.data_time).format("YYYY-MM-DD")
      // setDateFormatsData('YYYY-MM-DD')
    } else if (v === '2') {
      // setPickers("month")
      // state.start_time = moment(state.start_time).format("YYYY-MM")
      state.data_time = moment(state.data_time).format("YYYY-MM-DD")
      // setDateFormatsData('YYYY-MM')
    } else {
      // setPickers("year")
      // state.start_time = moment(state.start_time).format("YYYY")
      state.data_time = moment(state.data_time).format("YYYY-MM-DD")
      // setDateFormatsData('YYYY')
    }
    return state
  }

  const click = () => {
    onQuery && onQuery(paramsData);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Form>
        <Form layout='inline'>
          <Form.Item label="时间">
            <DatePicker
              // showNow
              // picker={pickers}
              defaultValue={moment(paramsData.data_time)}
              value={moment(paramsData.data_time)}
              // format={dateFormatsData}
              onChange={(v) => {
                onQueryChange(v, 'time')
              }}
            />
          </Form.Item>
          <Form.Item label="时间粒度">
            <Select
              allowClear
              placeholder={`请选择`}
              defaultValue={paramsData.time_type}
              onChange={(v) => onQueryChange(v, 'statues')}
            >
              <Select.Option value={'1'} key={'1'}>
                周
              </Select.Option>
              <Select.Option value={'2'} key={'2'}>
                月
              </Select.Option>
              <Select.Option value={'3'} key={'3'}>
                年
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={click} icon={<SearchOutlined></SearchOutlined>}>
              查询
            </Button>
          </Form.Item>
        </Form>
      </Form>
    </div>

  );
};

export default Filter;
