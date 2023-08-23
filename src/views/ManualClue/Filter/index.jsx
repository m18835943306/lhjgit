import { DatePicker, Select, Button, Radio, message } from 'antd'
import { InputNumberRange, InputNumber } from '&/components'
import dayjs from 'dayjs'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { controls } from '../config'

import './index.scss'
const dateFormat = 'YYYY-MM-DD'
const Filter = ({ paramsData, setParamsData, p, setP, handleQuery }) => {
  const click = (type) => {
    handleQuery && handleQuery()
  }
  const onQueryChange = (v, i, t) => {
    const p = _.cloneDeep(paramsData)
    if (t.includes('time') && Array.isArray(v)) {
      const st = v[0].format(dateFormat)
      const et = v[1].format(dateFormat)
      if (t === 'clue_time') {
        p[i]['start_time'] = st
        p[i]['end_time'] = et
      }
      if (t === 'than_time') {
        p[i]['t_start'] = st
        p[i]['t_end'] = et
      }
    } else {
      p[i][t] = v
    }

    setParamsData(p)
  }

  const addCondition = () => {
    const params = _.cloneDeep(paramsData)
    if (params.length > 1) {
      message.warning('查询条件最多2条！')
      return
    }
    params.push({
      start_time: '',
      end_time: '',
      floor: 1,
      upper: 10000,
      t_start: '',
      t_end: '',
      ratio: 30
    })
    setParamsData(params)
  }
  const getLable = (text, index) => text + (index ? index : '') + '：'
  return (
    <div className="ManualClue_filter">
      <div className="filter_query">
        <div className="filter_query__item">
          <div className="filter_query__item--label">模式选择：</div>
          <div className="filter_query__item--value">
            <Radio.Group
              defaultValue={p.pattern_mode}
              onChange={(v) => {
                setP((state) => {
                  return {
                    ...state,
                    ...{
                      pattern_mode: v.target.value
                    }
                  }
                })
              }}
            >
              <Radio value={1}>日常模式</Radio>
              <Radio value={2}>应急模式</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="filter_query__item">
          <div className="filter_query__item--label">管控类型：</div>
          <div className="filter_query__item--value">
            <Select
              allowClear
              placeholder="请选择"
              // defaultValue={p.level}
              onChange={(v) => {
                setP((state) => {
                  return {
                    ...state,
                    ...{
                      level: v
                    }
                  }
                })
              }}
            >
              {controls?.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="filter_query_box">
        <div className="filter_query__container">
          {paramsData?.length
            ? paramsData.map((item, i) => (
                <div className="filter_query">
                  <div className="filter_query__item">
                    <div className="filter_query__item--label">
                      {getLable('线索日期', i)}
                    </div>
                    <div className="filter_query__item--value">
                      <DatePicker.RangePicker
                        defaultValue={
                          item.start_time && item.end_time
                            ? [dayjs(item.start_time), dayjs(item.end_time)]
                            : []
                        }
                        format={dateFormat}
                        onChange={(v) => {
                          onQueryChange(v, i, 'clue_time')
                        }}
                        allowClear={false}
                      />
                    </div>
                  </div>
                  <div className="filter_query__item">
                    <div className="filter_query__item--label">
                      {getLable('线索范围', i)}
                    </div>
                    <div className="filter_query__item--value">
                      <InputNumberRange
                        attr={['floor', 'upper']}
                        params={item}
                      />
                    </div>
                  </div>
                  <div className="filter_query__item">
                    <div className="filter_query__item--label">
                      {getLable('比对日期', i)}
                    </div>
                    <div className="filter_query__item--value">
                      <DatePicker.RangePicker
                        defaultValue={
                          item.t_start && item.t_end
                            ? [dayjs(item.t_start), dayjs(item.t_end)]
                            : []
                        }
                        format={dateFormat}
                        onChange={(v) => {
                          onQueryChange(v, i, 'than_time')
                        }}
                        allowClear={false}
                      />
                    </div>
                  </div>
                  <div className="filter_query__item">
                    <div className="filter_query__item--label">
                      {getLable('增幅比例', i)}
                    </div>
                    <div className="filter_query__item--value">
                      <InputNumber
                        addonAfter="%"
                        defaultValue={item.ratio}
                        onChange={(v) => {
                          onQueryChange(v, i, 'ratio')
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="filter_button">
          <div
            tabIndex={0}
            role={'button'}
            onClick={addCondition}
            className="condition_add"
          >
            <span style={{ marginRight: '10px' }}>增加条件</span>
            <PlusCircleOutlined />
          </div>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => click('query')}
          >
            查询
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Filter
