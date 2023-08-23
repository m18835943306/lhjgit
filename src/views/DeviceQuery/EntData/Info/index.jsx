import { useState, useEffect } from 'react'
import { Descriptions } from 'antd'
import { getEnterpriseDetail } from '&/api/electricity'

const EndForm = (props) => {
  const { ent_id } = props
  const value = JSON.parse(localStorage.getItem('user'))
  const [formData, setFormData] = useState({})

  const getData = async () => {
    // setLoading(true);
    const json = { ent_id, project_id: value.project_id }

    const data = await getEnterpriseDetail(json)
    data.if_discharge_permit = data.if_discharge_permit ? '是' : '否'
    setFormData(data)
  }

  useEffect(() => {
    if (ent_id) {
      getData()
    }
  }, [ent_id])
  return (
    <div>
      <Descriptions bordered>
        <Descriptions.Item label="企业名称">
          {formData?.ent_name}
        </Descriptions.Item>
        <Descriptions.Item label="所属区">
          {formData?.county_name}
        </Descriptions.Item>
        <Descriptions.Item label="所属街乡">
          {formData?.town_name}
        </Descriptions.Item>
        <Descriptions.Item label="详细地址">
          {formData?.address}
        </Descriptions.Item>
        <Descriptions.Item label="所属行业类型">
          {formData?.industry_type}
        </Descriptions.Item>
        <Descriptions.Item label="主要产品">
          {formData?.main_product}
        </Descriptions.Item>
        <Descriptions.Item label="生产线数量">
          {formData?.line_count}
        </Descriptions.Item>
        <Descriptions.Item label="年产量">
          {formData?.annual_output}
        </Descriptions.Item>
        <Descriptions.Item label="年用电量">
          {formData?.annual_electricity_consumption}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}
export default EndForm
