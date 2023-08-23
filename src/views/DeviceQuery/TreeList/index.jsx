import { useState, useEffect, useCallback, useRef } from 'react'
import { Tree, Spin, Input } from 'antd'
import sourceImg from '&/images/images/imgs'
import { getDeviceListNew, getIndustryList } from '&/api/electricity'
import query from '&/api/electricity/query'
import { Card } from '&/appComponents/Antd'
import _ from 'lodash'
import { Context } from '../context'
import './index.scss'
import { useContext } from 'react'

const Image = () => {
  return (
    <div>
      <img src={sourceImg.zhengchang} />
    </div>
  )
}
const ImageBaoJing = () => {
  return (
    <div>
      <img src={sourceImg.baojing} />
    </div>
  )
}
const ImageLiXian = () => {
  return (
    <div>
      <img src={sourceImg.lixian} />
    </div>
  )
}

const List = (props) => {
  const { setDevData, setEntId, value, setDevTypes } = useContext(Context)
  const [tap, setTap] = useState(1)
  // 原始企业列表
  const [entList, setEntList] = useState([])
  // 过滤使用的企业列表
  const [filterEntList, setFilterEntList] = useState([])
  const [entName, setEntName] = useState('')
  const [expandedKeys, setExpandedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [treedata1, setTreedata1] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const treeRef = useRef(null)
  const [treeHeight, setTreeHeight] = useState(0)

  const getIndustry = useCallback(async () => {
    if (filterEntList.length) {
      const industryList = await getIndustryList()
      const treeData = industryList.reduce((cur, pre) => {
        const children = generateTreeChildren(
          pre,
          filterEntList,
          'industry_type_id'
        )
        cur.push({
          title: pre.industry_type,
          key: pre.industry_type_id,
          industry_type_id: pre.industry_type_id,
          selectable: false,
          children: children,
          disabled: !children.length
        })
        return cur
      }, [])
      setTreeDataChore(treeData)
    } else {
      setTreedata1([])
    }
  }, [filterEntList])

  const getAdmList = useCallback(async () => {
    if (filterEntList.length) {
      const admList = await query(
        `/v1/adm-list?json={"adm_level":3,"project_id":${value?.project_id}}`
      )
      const treeData = admList.reduce((cur, pre) => {
        const children = generateTreeChildren(pre, filterEntList, 'county_id')
        cur.push({
          title: pre.county_name,
          key: pre.county_id,
          county_id: pre.county_id,
          selectable: false,
          children: children,
          disabled: !children.length
        })
        return cur
      }, [])
      setTreeDataChore(treeData)
    } else {
      setTreedata1([])
    }
  }, [filterEntList])

  useEffect(() => {
    if (filterEntList?.length) {
      if (tap === 1) {
        getAdmList()
      } else {
        getIndustry()
      }
    }
  }, [tap, filterEntList])

  useEffect(() => {
    getDeviceList()
  }, [])

  const getDeviceList = async (v) => {
    const entList = localStorage.getItem('entList')
    if (!entList) setIsLoading(true) // 没有本地缓存，显示加载状态
    else {
      // 存在，设置tree结构
      // 继续调用接口
      // 下面判断如果接口返回数据与本地数据不一致，设置接口返回数据
      // setTreeData(admList, JSON.parse(entList), str)
      console.log('一致，使用本地缓存数据')
      setEntList(JSON.parse(entList))
      setFilterEntList(JSON.parse(entList))
      // console.log(entList, '-entList')
    }
    const res = await getDeviceListNew({ ent_name: v })

    if (entList !== JSON.stringify(res)) {
      console.log('不一致，使用接口返回数据')
      setEntList(res)
      setFilterEntList(res)
      localStorage.setItem('entList', JSON.stringify(res))
    }
    setIsLoading(false)
  }

  const setTreeDataChore = (treeData) => {
    if (filterEntList.length) {
      const devData = []
      filterEntList[0].dev_data?.map((item) => {
        devData.push(item.dev_code)
      })

      props.clickDevCode(devData)
      const { devCodes, expandedKeys } = getDefaultCheckKeys(treeData, 0)
      setSelectedKeys([treeData[0].children[0]?.key])
      setExpandedKeys(expandedKeys)
      props.click(devCodes)
      const existTreeData =
        treeData.find((item) => item.children && item.children.length) || {}
      setEntId(existTreeData.children[0]?.key)
      setDevTypes(existTreeData.children[0]?.dev_type_data)
      console.log(existTreeData)
      setTreedata1(treeData)
    }
  }

  // 生成树结构
  const generateTreeChildren = (pre, data, key) => {
    const v = data
      .filter((d) => d[key] == pre[key])
      .map((item) => {
        return {
          title: `${item.ent_name}  （${item.dev_number}）`,
          key: item.ent_id,
          isCompany: true,
          parentKey: pre[key],
          ent_id: item.ent_id,
          children: item.group_data.map((it) => {
            return {
              title: it.group_name == '' ? '未分组' : it.group_name,
              key: `${item.ent_id}_${it.group_id}`,
              parentKey: `${item.ent_id}`,
              children: it.dev_data.map((dev) => {
                return {
                  ...dev,
                  title: dev.dev_name,
                  key: `${item.ent_id}_${it.group_id}_${dev.dev_id}`,
                  isDev: true,
                  icon:
                    it.if_alarm == 1 ? (
                      <ImageBaoJing />
                    ) : it.if_online == 1 ? (
                      <Image />
                    ) : (
                      <ImageLiXian />
                    )
                }
              }),
              isGroup: true,
              ent_id: item.ent_id
            }
          }),
          dev_type_data: item.dev_type_data
        }
      })
    return v
  }

  const getDefaultCheckKeys = (treeData, count) => {
    const checkKeys = []
    const expandedKeys = []
    const devCodes = []
    const getKeys = (data, index) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length) {
          ++index
          getKeys(data[i].children, index)
          if (index <= 2) {
            break
          }
        } else {
          if (data[i].dev_code) {
            devCodes.push(data[i].dev_code)
            checkKeys.push(data[i].key)
          }
        }
      }
    }
    getKeys(treeData, count)
    const existTreeData =
      treeData.find((item) => item.children && item.children.length) || {}
    expandedKeys.push(
      existTreeData.children[0]?.key,
      existTreeData.children[0]?.parentKey || []
    )
    return {
      devCodes,
      expandedKeys,
      checkKeys
    }
  }
  const onExpand = (expandedKeysValue, e) => {
    setExpandedKeys(expandedKeysValue)
    // setAutoExpandParent(!autoExpandParent); //先别删
  }

  const onSelect = (selectedKeysValue, e) => {
    console.log(e, '-e')
    setSelectedKeys([e.node.key])
    let devObj = {}
    if (e.node.isCompany) {
      setExpandedKeys([e.node.parentKey, e.node.key])
      const { devCodes } = getDefaultCheckKeys(e.node.children, 2)
      props.click(devCodes)
      setEntId(e.node.ent_id)
      setDevData({})
      setDevTypes(e.node.dev_type_data)
      return
    }
    if (e.node.isGroup) {
      // 添加点击类型，方便确认是哪里点击
      const nodes = e.node.children.map((item) => ({
        ...item,
        clickType: 'group'
      }))
      devObj = _.groupBy(nodes, 'dev_type')
    }
    if (e.node.isDev) {
      const nodes = [e.node].map((item) => ({
        ...item,
        clickType: 'dev'
      }))
      devObj = _.groupBy(nodes, 'dev_type')
    }
    setDevData(devObj)
  }
  const onInputChange = async (e) => {
    setEntName(e.target.value)
    debounceSearch(e)
  }
  const debounceSearch = _.debounce(async (e) => {
    setIsLoading(true)
    if (e.target.value == '') {
      setFilterEntList(entList)
    } else {
      setFilterEntList(
        entList.filter((item) => item.ent_name.includes(e.target.value))
      )
    }

    setIsLoading(false)
  }, 700)

  useEffect(() => {
    if (treeRef.current) {
      setTreeHeight(treeRef.current.clientHeight)
    }
  }, [treeRef])

  const handleTab = (v) => {
    setTap(v)
  }

  return (
    <Card
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ flex: 1, overflow: 'auto' }}
      size="small"
      title="企业设备列表"
    >
      <div className="DeviceQuery-list">
        <div className="DeviceQuery-list-search">
          <div className="DeviceQuery-list-search__input">
            <div style={{ display: 'flex' }}>
              {/* <Select project_id={value.project_id} /> */}
              <Input
                value={entName}
                placeholder="请输入公司名称"
                onChange={onInputChange}
                allowClear
              />
            </div>
          </div>
        </div>
        <div className="list-taps">
          <div
            className={`list-taps-item ${tap === 1 ? 'active' : ''}`}
            onClick={() => handleTab(1)}
          >
            地区
          </div>
          <div
            className={`list-taps-item ${tap === 2 ? 'active' : ''}`}
            onClick={() => handleTab(2)}
          >
            行业
          </div>
        </div>
        <div className="DeviceQuery-list-tree" ref={treeRef}>
          <Spin tip="Loading......" spinning={isLoading}>
            <div className="list-bottom">
              {treedata1 && treedata1.length ? (
                <Tree
                  showLine
                  onExpand={onExpand}
                  expandedKeys={expandedKeys} //（受控）展开指定的树节点s
                  selectedKeys={selectedKeys}
                  onSelect={onSelect}
                  treeData={treedata1}
                  showIcon={true}
                  defaultExpandAll
                  height={treeHeight}
                  // defaultExpandedKeys={defaultKeys} //默认展开指定的树节点
                />
              ) : entName ? (
                <div>没有找到相关企业。。。</div>
              ) : null}
            </div>
          </Spin>
        </div>
      </div>
    </Card>
  )
}
export default List
