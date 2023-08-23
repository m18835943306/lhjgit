import React, { useState, useEffect } from 'react'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import sourceImg from '&/assets/images/imgs'
import { getPlanList } from '&/api/electricity'
import './index.scss'
const PlanAssessmentList = (props) => {
  const value = JSON.parse(localStorage.getItem('user'))
  const [ids, setIds] = useState()
  const [listArr, setListArr] = useState([])
  useEffect(() => {
    const paramJson = {
      project_id: value.project_id,
      start_time: dayjs().subtract(10, 'year').format('YYYY-MM-DD HH:mm:00'),
      end_time: dayjs().format('YYYY-MM-DD HH:mm:00')
    }
    getPlanListRequest(paramJson)
  }, [])
  //接口调用
  const getPlanListRequest = (json) => {
    getPlanList(json).then((res) => {
      // console.log(res.data,"resresresresresresres");
      setListArr(res.data)
      const Newobj = {
        text: res?.data[0]?.alert_name,
        starttime: res?.data[0]?.start_time,
        endtime: res?.data[0]?.end_time
      }
      props.click(Newobj)
      setIds(res?.data[0]?.plan_id)
    })
  }
  const handleClick = (id, text, start_time, end_time) => {
    const obj = {
      text: text,
      starttime: start_time,
      endtime: end_time
    }
    props.click(obj)
    setIds(Number(id))
  }
  return (
    <div className="PlanAssessmentList">
      <div className="PlanAssessmentList-time">
        <DatePicker.RangePicker
          disabled
          defaultValue={[dayjs().subtract(10, 'year'), dayjs()]}
        />
      </div>
      {listArr.length > 0 ? (
        <div className="PlanAssessmentList-text">
          {listArr.length > 0 &&
            listArr.map((item) => {
              return (
                <div
                  className={
                    ids == item.plan_id
                      ? 'PlanAssessmentList-text-list-check'
                      : 'PlanAssessmentList-text-list'
                  }
                  id={item.plan_id}
                  value={item.alert_name}
                  onClick={() =>
                    handleClick(
                      item.plan_id,
                      item.alert_name,
                      item.start_time,
                      item.end_time
                    )
                  }
                  style={
                    ids == item.plan_id
                      ? {
                          'background-image': 'url(' + sourceImg.check + ')',
                          'background-repeat': 'no-repeat',
                          'background-size': '100% 100%'
                        }
                      : {}
                  }
                >
                  <div
                    className={
                      ids == item.plan_id
                        ? 'PlanAssessmentList-text-list-time-check'
                        : 'PlanAssessmentList-text-list-time'
                    }
                  >
                    {item.created_at}
                  </div>
                  <div
                    className={
                      ids == item.plan_id
                        ? 'PlanAssessmentList-text-xian-check'
                        : 'PlanAssessmentList-text-xian'
                    }
                  ></div>
                  <div
                    className={
                      ids == item.plan_id
                        ? 'PlanAssessmentList-text-police-check'
                        : 'PlanAssessmentList-text-police'
                    }
                    style={
                      item.alert_name == '红色预案'
                        ? {
                            color: 'red',
                            'background-image': 'url(' + sourceImg.red + ')',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                          }
                        : item.alert_name == '橙色预案'
                        ? {
                            color: '#f2cbaa',
                            'background-image': 'url(' + sourceImg.oragin + ')',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                          }
                        : item.alert_name == '黄色预案'
                        ? {
                            color: 'yellow',
                            'background-image': 'url(' + sourceImg.yellow + ')',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                          }
                        : {
                            color: 'black',
                            'background-image': 'url(' + sourceImg.blue + ')',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                          }
                    }
                  >
                    {item.alert_name}
                  </div>
                </div>
              )
            })}
        </div>
      ) : (
        <div className="PlanAssessmentList-text-kong">暂无数据</div>
      )}
    </div>
  )
}

export default PlanAssessmentList
