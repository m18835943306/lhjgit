import { Radio } from 'antd'
import './index.scss'

const Tabs = ({ value, onChange, delit, tap }) => {
  return (
    <div className="DayElectroList-Tabs">
      <Radio.Group
        options={[
          { label: '日用电', value: 1 },
          { label: '小时用电', value: 2, disabled: delit.has_hour !== 1 }
        ]}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />

      <div className="DayElectroList-Tabs_tips">
        近30天线索推荐次数：
        <span style={{ color: 'red' }}>{delit?.clue_num}</span>次
      </div>
    </div>
  )
}

export default Tabs
