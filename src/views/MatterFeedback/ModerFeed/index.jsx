import React, { useState, useEffect } from 'react'
import {
    Modal,
    Table
} from 'antd'
import {
    getFeedbackRecords
} from '&/api/electricity'
import './index.scss'
const ModerFeed = (props) => {
    const { visible, setVisible, records } = props
    // console.log(records,"records--");
    const value = JSON.parse(localStorage.getItem('user')) || {}
    const [data,setData]=useState([])
    useEffect(() => {
        if (records) {
            getRecordsRequest({
                adm_id: value?.adm_id,
                userid: value?.userid,
                clue_code: records.clue_code,
                page_type: "2"
            })
        }
    }, [records])
    const getRecordsRequest = async (json) => {
        const res = await getFeedbackRecords(json)
        // console.log(res,"res----");
        setData(res)

    }
    const columns = [
        {
            title: '反馈时间',
            dataIndex: 'feedback_time',
            key: 'feedback_time',
            width:80
        },
        {
            title: '反馈人员',
            dataIndex: 'feedback_person',
            key: 'feedback_person',
            width:80
        },
        {
            title: '反馈信息',
            dataIndex: 'feedback_content',
            key: 'feedback_content',
            width:80
        },
        {
            title: '线索',
            dataIndex: 'clue_code',
            key: 'clue_code',
            width:80
        },
        {
            title: '线索内容',
            dataIndex: 'clue_content',
            key: 'clue_content',
            width:300
        },
        {
            title: '线索生成人员',
            dataIndex: 'created_from',
            key: 'created_from',
            width:80
        },
        {
            title: '线索下发人员',
            dataIndex: 'assign_from',
            key: 'assign_from',
            width:80
        },
        {
            title: '线索接收人员',
            dataIndex: 'assign_to',
            key: 'assign_to',
            width:80
        },
        {
            title: '线索下发时间',
            dataIndex: 'assign_start_from',
            key: 'assign_start_from',
            width:80
        },
    ];
    return (
        <Modal
            className="ListModal"
            title={"详情数据"}
            centered
            open={visible}
            footer={null}
            width={1000}
            onCancel={() => {
                setVisible(false)
            }}
        >
            <Table columns={columns} dataSource={data&&data} pagination={false}/>
        </Modal>
    )
}
export default ModerFeed