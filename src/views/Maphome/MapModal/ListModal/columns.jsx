import React from 'react';
import { Tooltip } from 'antd';

// 设备状态
export const devColumns = [
  {
    title: '序号',
    width: 50,
    render: (_, __, index) => `${index + 1}`,
    align: 'center',
  },
  {
    title: '所属区',
    dataIndex: 'county_name',
    key: 'county_name',
    align: 'center',
  },
  {
    title: '所属行业',
    dataIndex: 'industy_type_name',
    key: 'industy_type_name',
    align: 'center',
  },
  {
    title: '企业名称',
    dataIndex: 'ent_name',
    key: 'ent_name',
    align: 'center',
  },
  {
    title: '点位名称',
    dataIndex: 'dev_name',
    key: 'dev_name',
    align: 'center',
  },
  {
    title: '点位类型',
    dataIndex: 'dev_type_name',
    key: 'dev_type_name',
    align: 'center',
  },
  {
    title: '设备编号',
    dataIndex: 'dev_code',
    key: 'dev_code',
    align: 'center',
  },
  {
    title: '设备实时状态',
    dataIndex: 'if_online',
    key: 'if_online',
    align: 'center',
    render: (_, record) => {
      const style = {
        color: record.if_online === 1 ? 'green' : 'red',
      };
      return (
        <span style={style}>{record.if_online === 1 ? '在线' : '离线'}</span>
      );
    },
  },
  {
    title: '最后上传时间',
    dataIndex: 'data_time',
    key: 'data_time',
    align: 'center',
  },
];

export const entColumns = [
  {
    title: '序号',
    width: 50,
    align: 'center',
    render: (text, item, index) => {
      return index + 1;
    },
  },
  {
    title: '企业名称',
    width: 150,
    dataIndex: 'ent_name',
    align: 'center',
  },
  {
    width: 150,
    title: '区名称',
    dataIndex: 'county_name',
    align: 'center',
  },
  {
    title: '所属街乡',
    width: 150,
    dataIndex: 'town_name',
    align: 'center',
  },
  {
    width: 150,
    title: '行业类型',
    dataIndex: 'industry_type',
    align: 'center',
  },
  {
    width: 150,
    title: '建设单位',
    dataIndex: 'construction_unit',
    align: 'center',
  },
  {
    title: '管控类型',
    width: 150,
    dataIndex: 'control_type',
    align: 'center',
  },
  {
    title: '联系人',
    dataIndex: 'contacts',
    width: 150,
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 100,
    align: 'center',
  },
];

export const alermColums = [
  {
    title: '序号',
    width: 50,
    align: 'center',
    render: (text, item, index) => {
      return index + 1;
    },
  },
  {
    title: '企业名称',
    width: 100,
    dataIndex: 'ent_name',
    align: 'center',
    ellipsis: true,
    render: (text, record, index) => {
      return (
        <Tooltip placement="top" title={text}>
          <div
            style={{
              width: 180,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <a>{text}</a>
          </div>
        </Tooltip>
      );
    },
  },
  {
    width: 100,
    title: '触发点位',
    dataIndex: 'dev_name',
    align: 'center',
  },
  {
    title: '点位类型',
    width: 100,
    dataIndex: 'dev_type_name',
    align: 'center',
  },
  {
    width: 100,
    title: '报警类型',
    dataIndex: 'warn_type_name',
    align: 'center',
  },
  {
    title: '报警级别',
    dataIndex: 'warn_level_value',
    width: 100,
    align: 'center',
  },
  {
    title: '报警时间',
    dataIndex: 'warn_time',
    width: 100,
    align: 'center',
  },
  {
    title: '持续时长',
    width: 100,
    dataIndex: 'duration',
    align: 'center',
  },
  {
    title: '所属区',
    width: 100,
    dataIndex: 'county_name',
    align: 'center',
  },
  {
    title: '所属街乡',
    dataIndex: 'town_name',
    align: 'center',
    width: 100,
  },
  {
    title: '行业类型',
    dataIndex: 'industry_type_name',
    width: 100,
    align: 'center',
  },
  {
    title: '报警状态',
    dataIndex: 'release_status_value',
    width: 100,
    align: 'center',
  },
  {
    title: '处理状态',
    dataIndex: 'process_status_value',
    width: 100,
    align: 'center',
  },
];
