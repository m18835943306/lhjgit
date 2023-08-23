import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Badge,
    Descriptions
} from 'antd';
import { getEnterpriseDetail } from '&/api/electricity';
import _ from 'lodash';

const EndForm = (props) => {
    const {
        ent_id
    } = props;
    const value = JSON.parse(localStorage.getItem('user'));
    const [formData, setFormData] = useState({});

    const getData = async () => {
        // setLoading(true);
        const json = { ent_id, project_id: value.project_id };

        const data = await getEnterpriseDetail(json);
        data.if_discharge_permit = data.if_discharge_permit ? '是' : '否';
        setFormData(data);
    };

    useEffect(() => {
        if (ent_id) {
            getData()
        }
    }, [ent_id]);
    return (
        <div>
            <Descriptions  bordered>
                <Descriptions.Item label="企业名称" >
                    {formData?.ent_name}
                </Descriptions.Item>
                <Descriptions.Item label="所属区" span={2}>
                {formData?.county_name}
                </Descriptions.Item>
                <Descriptions.Item label="所属街乡" span={3}>
                {formData?.town_name}
                </Descriptions.Item>
                <Descriptions.Item label="详细地址" span={4}>
                {formData?.address}
                </Descriptions.Item>
                <Descriptions.Item label="所属行业类型" span={5}>
                {formData?.industry_type}
                </Descriptions.Item>
                <Descriptions.Item label="主要产品" span={6}>
                    {formData?.main_product}
                </Descriptions.Item>
                <Descriptions.Item label="生产线数量" span={7}>
                {formData?.line_count}
                </Descriptions.Item>
                <Descriptions.Item label="年产量" span={8}>
                {formData?.annual_output}
                </Descriptions.Item>
                <Descriptions.Item label="年用电量" span={9}>
                {formData?.annual_electricity_consumption}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default EndForm