import React, { useState, useEffect, useRef } from 'react'
import { Radio } from 'antd';
import Container from '@/appComponents/Container'
import EmergentMeausere from "@/views/EmergentMeausere"
import PlanLaunch from "@/views/PlanLaunch"
const NewPlanLaunch = () => {
    const [value, setValue] = useState('1');
    const onChange = ({ target: { value } }) => {
        // console.log('radio4 checked', value);
        setValue(value);
    };
    const optionsWithDisabled = [
        {
            label: '预案启动',
            value: '1',
        },
        {
            label: '应急措施',
            value: '2',
        },
    ];
    return (
        <Container>
            <Container.ContainerQuery>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Radio.Group
                        options={optionsWithDisabled}
                        onChange={onChange}
                        value={value}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </div>
            </Container.ContainerQuery>

            <Container.ContainerContent>
                {value == "2" ? <EmergentMeausere></EmergentMeausere> : <PlanLaunch></PlanLaunch>}
            </Container.ContainerContent>
        </Container>
    )
}
export default NewPlanLaunch