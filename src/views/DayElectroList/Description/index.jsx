import { Descriptions } from 'antd'

const Desc = ({ data }) => {
  return (
    <Descriptions
      bordered
      size="small"
      column={{ xxl: 5, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="企业名称：">{data.ent_name}</Descriptions.Item>
      <Descriptions.Item label="所属区：">{data.county_name}</Descriptions.Item>
      <Descriptions.Item label="所属街道：">{data.town_name}</Descriptions.Item>
      <Descriptions.Item label="管控类型：">
        {data.control_type}
      </Descriptions.Item>
      <Descriptions.Item label="详细地址：">{data.address}</Descriptions.Item>
    </Descriptions>
  )
}

export default Desc
