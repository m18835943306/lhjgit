import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker, Button, Space, message } from 'antd'
import dayjs from 'dayjs'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { saveWarnPlan } from '&/api/electricity'

const Info = ({ formData, modalRef, modalType, project_id, onReload }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(formData)
  }, [formData])
  const onCancel = () => {
    modalRef.current.hideModelRef()
  }
  const onSave = async () => {
    const data = form.getFieldsValue()
    data.start_time = dayjs(data.start_time).format('YYYY-MM-DD HH:mm:ss')
    data.end_time = dayjs(data.end_time).format('YYYY-MM-DD HH:mm:ss')
    if (user) {
      data.userid = user.userid
      let typeText = ''
      if (modalType === 'edit') {
        data.plan_id = formData.plan_id
        typeText = '编辑'
      } else {
        typeText = '添加'
      }
      try {
        await saveWarnPlan(data)
        modalRef.current.hideModelRef()
        message.success(`${typeText}成功！`)
        onReload && onReload()
      } catch (error) {
        message.error(`${typeText}失败！`)
      }
    }
  }
  return (
    <div className="Info">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        form={form}
        initialValues={formData}
      >
        {/* <Form.Item label="预案类型：" name="plan_type">
          <Select>
            {planTypes.map((type) => (
              <Select.Option value={type.value}>{type.name}</Select.Option>
            ))}
          </Select>
        </Form.Item> */}
        <Form.Item label="预案名称：" name="plan_name">
          <Input
            placeholder="请输入预案名称"
            disabled={formData?.plan_type === '重污染应急预案'}
          />
        </Form.Item>
        <Form.Item label="开始时间：" name="start_time">
          <DatePicker
            showTime
            style={{ width: '100%' }}
            format={'YYYY-MM-DD HH:mm:ss'}
            disabledDate={(current) => {
              const disabledTime = dayjs()
              const hour = dayjs(disabledTime).hour()
              return current && hour < 23
                ? current < dayjs(disabledTime).subtract(1, 'd')
                : current < dayjs(disabledTime)
            }}
            disabledTime={(now, partial) => {
              if (now) {
                const disabledTime = dayjs()
                const disabledDay = dayjs(disabledTime).date()
                const nowDay = dayjs(now).date()
                if (disabledDay === nowDay) {
                  return {
                    disabledHours: () => {
                      let hours = []
                      let time = dayjs()
                      let hour = dayjs(time).hour()
                      for (let i = 0; i < hour + 1; i++) {
                        hours.push(i)
                      }
                      return hours
                    }
                  }
                }
              }
              return {}
            }}
          />
        </Form.Item>
        <Form.Item label="结束时间：" name="end_time">
          <DatePicker
            style={{ width: '100%' }}
            showTime
            format={'YYYY-MM-DD HH:mm:ss'}
            disabledDate={(current) => {
              const disabledTime = dayjs()
              const hour = dayjs(disabledTime).hour()
              return current && hour < 23
                ? current < dayjs(disabledTime).subtract(1, 'd')
                : current < dayjs(disabledTime)
            }}
            disabledTime={(now, partial) => {
              if (now) {
                const disabledTime = dayjs()
                const disabledDay = dayjs(disabledTime).date()
                const nowDay = dayjs(now).date()
                if (disabledDay === nowDay) {
                  return {
                    disabledHours: () => {
                      let hours = []
                      let time = dayjs()
                      let hour = dayjs(time).hour()
                      for (let i = 0; i < hour + 1; i++) {
                        hours.push(i)
                      }
                      return hours
                    }
                  }
                }
              }
              return {}
            }}
          />
        </Form.Item>

        <div
          style={{
            borderTop: '1px solid #ccc',
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Space>
            <Button onClick={onCancel} icon={<CloseCircleOutlined />}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={onSave}
              icon={<CheckCircleOutlined />}
            >
              保存
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}

export default Info
