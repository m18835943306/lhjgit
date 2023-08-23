import { useState, useContext, useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import sourceImg from '&/assets/images/imgs'
import { ContentlayersContext } from '@ysrd/ol5-react-ts/context'
import { getHomeStatistics } from '&/api/electricity'
import './index.scss'

const Legend = () => {
  const { setModalVisible, setModalType, user } =
    useContext(ContentlayersContext)
  const [visible, setVisible] = useState(true)
  const [data, setData] = useState({})
  const handleClickOpen = () => {
    if (visible == true) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const handleClick = (value) => {
    setModalType(value)
    setModalVisible(true)
  }

  const getHomeStatisticsNumber = async () => {
    const result = await getHomeStatistics({ project_id: user.project_id })
    setData(result)
  }
  useEffect(() => {
    if (user?.project_id) {
      getHomeStatisticsNumber()
    }
  }, [user?.project_id])

  return (
    <div className="legend">
      {/* {<div className="container-time"></div>} */}
      {
        <div className="container-tuli">
          <div className="tuli-explain">
            <div className="explain-left">图例说明</div>
            <div
              className="explain-right"
              onClick={handleClickOpen}
              role="button"
              tabIndex={0}
            >
              {visible == true ? (
                <DownOutlined style={{ color: '#bbbbbb' }} />
              ) : (
                <UpOutlined style={{ color: '#bbbbbb' }} />
              )}
            </div>
          </div>

          <div
            className="tuli-num"
            style={visible == true ? { display: 'block' } : { display: 'none' }}
          >
            <div className="tuli-example">
              <div className="example-img">
                <img src={sourceImg.dian3} alt="" style={{ width: '50%' }} />
              </div>
              <div className="example-text">正常生产</div>
            </div>
            <div className="tuli-example">
              <div className="example-img">
                <img src={sourceImg.dian1} alt="" style={{ width: '50%' }} />
              </div>
              <div className="example-text">应急报警</div>
            </div>
            <div className="tuli-example">
              <div className="example-img">
                <img src={sourceImg.dian2} alt="" style={{ width: '50%' }} />
              </div>
              <div className="example-text">日常报警</div>
            </div>
            <div className="tuli-example">
              <div className="example-img">
                <img src={sourceImg.dian4} alt="" style={{ width: '50%' }} />
              </div>
              <div className="example-text">企业停产</div>
            </div>
          </div>
        </div>
      }
      {
        <div className="container-number">
          <div
            className="number-callpolice"
            role="button"
            tabIndex={0}
            onClick={() => {
              handleClick('police')
            }}
          >
            <div className="number-text">总报警数</div>
            <div className="number-num">{data.warn_number}</div>
          </div>
          <div
            className="number-callpolice"
            role="button"
            tabIndex={0}
            onClick={() => {
              handleClick('enterprise')
            }}
          >
            <div className="number-text">总企业数</div>
            <div className="number-num">{data.ent_number}</div>
          </div>
          <div
            className="number-callpolice"
            role="button"
            tabIndex={0}
            onClick={() => {
              handleClick('equipment')
            }}
          >
            <div className="number-text">总设备数</div>
            <div className="number-num">{data.dev_number}</div>
          </div>
        </div>
      }
    </div>
  )
}
export default Legend
