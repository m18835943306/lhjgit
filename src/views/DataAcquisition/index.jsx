import React, { useState, useEffect, useMemo } from 'react'
import { Table, Button, Popover, Space, Tooltip } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import Filter from './Filter'
import { useTableData } from '&/hooks'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { getDeviceList, getCollection } from '&/api/electricity'
import { downloadExcel } from '&/commonjs/util'
import Container from '@/appComponents/Container'
import './index.scss'

const format = 'YYYY-MM-DD 00:00:00'
const DataAcquisition = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const [paramsData, setParamsData] = useState({
        start_time: dayjs().subtract(1, 'day').format(format),
        end_time: dayjs().format(format),
        county_id: -1, //区
        ent_name: ''
    })
    const staticColumns = [
        {
            title: '序号',
            width: 50,
            render: (_, __, index) => `${index + 1}`,
            align: 'center',
            fixed: 'left'
        },
        {
            title: '区',
            dataIndex: 'county_name',
            key: 'county_name',
            align: 'center',
            width: 150,
            fixed: 'left'
        },
        {
            title: '企业名称',
            dataIndex: 'ent_name',
            key: 'ent_name',
            align: 'center',
            width: 150,
            fixed: 'left',
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
            title: '点位名称',
            dataIndex: 'monitoring_object',
            key: 'monitoring_object',
            align: 'center',
            width: 100,
            fixed: 'left',
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
            title: '点位代码',
            dataIndex: 'code_in_ent',
            key: 'code_in_ent',
            align: 'center',
            width: 100,
            fixed: 'left'
        },
    ]
    const [columns, setColumns] = useState(staticColumns)
    const [downLoading, setDownLoading] = useState(false)

    const formatData = (data) => {
        // console.log(data, "data---");
        const newData = data.map((item) => {
            const {
                ent_name,
                dev_name,
                ent_id,
                dev_code,
                county_name,
                code_in_ent,
                monitoring_object,
                ...args
            } = item
            const times = getTimes(args)
            const obj = {
                ent_name,
                dev_name,
                ent_id,
                dev_code,
                county_name,
                code_in_ent,
                monitoring_object,
            }
            times.forEach((time, index) => {
                obj[time] =
                    Object.values(args)[index] === -99 ? '--' : Object.values(args)[index]
            })

            return obj
        })
        return newData
    }
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
        useTableData(getCollection, {
            params: getParams(),
            formatcb: (data) => formatData(data)
        })

    const getTimes = (data) => {
        return Object.keys(data).map((time) => dayjs(time).format('MM-DD HH:mm'))
    }
    const getBgc = (num) => {
        let str = 'transparent';
        if (num == "--") {
            str = 'gray';
        } else if (num == 1) {
            str = 'green';
        } else if (num == 2) {
            str = 'yellow';
        } else if (num == 3) {
            str = 'orange';
        }
        else if (num == 4) {
            str = 'red';
        }
        else if (num == 5) {
            str = '#890000';
        }
        return str;
    };
    useEffect(() => {
        if (tableData.length) {
            const {
                ent_name,
                dev_name,
                ent_id,
                dev_code,
                county_name,
                code_in_ent,
                monitoring_object,
                ...args
            } = tableData[0]

            const times = Object.keys(args)
            if (times && times.length) {
                const timeColumns = []
                times.forEach((time, i) => {
                    timeColumns.push({
                        title: time,
                        dataIndex: `${time}`,
                        key: `${time}`,
                        align: 'center',
                        width: 60,
                        // onCell: (record) => {
                        //     // console.log(record, "record--");
                        //     return {
                        //         style: {
                        //             background: getBgc(record[time]),
                        //             // color: 'transparent',
                        //         },
                        //     };
                        // },
                        render: (text, record) => {
                            return (
                                <div style={{height:"30px",width:"30px",background:getBgc(record[time]),borderRadius:"50%",margin:"auto",opacity:"0.5"}}></div>
                            );
                        },
                    })
                })
                const mergeColumns = staticColumns.concat(timeColumns)
                setColumns(mergeColumns)
            }
        }
    }, [tableData])

    const download = async () => {
        setDownLoading(true)
        const { data } = await loadDataAll()
        // console.log(data, "data--");
        const excelData = formatData(data)
        downloadExcel(excelData, columns, '设备数据列表')
        setDownLoading(false)
    }
    const renderContainerTitle = () => {
        const content = (
            <div >
                <p>
                    级别1:数据时间与接收时间相差小于等于1小时,颜色为:<span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "green", marginLeft: "10px" }}></span>
                </p>
                <p>
                    级别2:数据时间与接收时间相差大于1小时，小于等于2小时,颜色为:<span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "yellow", marginLeft: "10px" }}></span>
                </p>
                <p>
                    级别3:数据时间与接收时间相差大于2小时，小于等于6小时,颜色为:<span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "orange", marginLeft: "10px" }}></span>
                </p>
                <p>
                    级别4:数据时间与接收时间相差大于6小时，小于24小时,颜色为:<span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "red", marginLeft: "10px" }}></span>
                </p>
                <p>
                    级别5:数据时间与接收时间相差大于等于24小时,颜色为:<span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "#890000", marginLeft: "10px" }}></span>
                </p>
                <p>
                    无数据颜色为:<span style={{ display: "inline-block", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "gray", marginLeft: "10px" }}></span>
                </p>
            </div>
        )
        return (
            <Space>
                查询结果
                <Popover
                    content={content}
                    title="数据采集状态级别说明："
                    placement="rightTop"
                >
                    <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
                </Popover>
            </Space>
        )
    }
    return (
        <Container>
            <Container.ContainerQuery title="查询条件">
                <Filter
                    onQuery={onQuery}
                    paramsData={paramsData}
                    setParamsData={setParamsData}
                />
            </Container.ContainerQuery>
            <Container.ContainerContent
                title={renderContainerTitle()}
            // extra={
            //     <Button
            //         type="primary"
            //         icon={<DownloadOutlined />}
            //         loading={downLoading}
            //         disabled={!tableData.length}
            //         onClick={async () => {
            //             setDownLoading(true)
            //             await download()
            //             setDownLoading(false)
            //         }}
            //     >
            //         导出
            //     </Button>
            // }
            >
                <Table
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={tableData}
                    size="small"
                    pagination={pagination}
                    scroll={{ y: '65vh' }}
                />
            </Container.ContainerContent>
        </Container>
    )
}

export default DataAcquisition
